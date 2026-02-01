import { useQueries } from '@tanstack/react-query'
import { useFavorites } from '@/features/favorites'
import { FavoriteList } from './FavoriteList'
import { getWeather } from '@/entities/weather'

/**
 * 즐겨찾기 목록 컨테이너
 * - 데이터 fetching 및 상태 관리 담당
 * - UI는 FavoriteList에 위임
 */
export function FavoriteListContainer() {
  const { favorites, removeFavorite, updateFavoriteName } = useFavorites()

  // 모든 즐겨찾기 위치의 날씨 데이터를 병렬로 가져옴
  const weatherQueries = useQueries({
    queries: favorites.map((favorite) => ({
      queryKey: ['weather', favorite.lat, favorite.lon],
      queryFn: () => getWeather({ lat: favorite.lat, lon: favorite.lon }),
      staleTime: 1000 * 60 * 5,
    })),
  })

  // 날씨 데이터를 favorite id 기준으로 매핑
  const weatherMap = favorites.reduce(
    (acc, favorite, index) => {
      acc[favorite.id] = {
        data: weatherQueries[index].data,
        isLoading: weatherQueries[index].isLoading,
      }
      return acc
    },
    {} as Record<string, { data: Awaited<ReturnType<typeof getWeather>> | undefined; isLoading: boolean }>
  )

  return (
    <FavoriteList
      favorites={favorites}
      weatherMap={weatherMap}
      onRemove={removeFavorite}
      onUpdateName={updateFavoriteName}
    />
  )
}
