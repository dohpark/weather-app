import { FavoriteCard } from './FavoriteCard'
import type { Favorite } from '@/entities/favorite'
import type { WeatherData } from '@/entities/weather'

interface FavoriteListProps {
  favorites: Favorite[]
  weatherMap: Record<string, { data: WeatherData | undefined; isLoading: boolean }>
  onRemove: (id: string) => void
  onUpdateName: (id: string, name: string) => void
}

/**
 * 즐겨찾기 카드 목록 (순수 UI 컴포넌트)
 * - 최대 6개 카드 그리드 레이아웃
 * - 각 카드에 장소명, 날씨, 기온 표시
 */
export function FavoriteList({
  favorites,
  weatherMap,
  onRemove,
  onUpdateName,
}: FavoriteListProps) {
  return (
    <section className="px-4 py-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">즐겨찾기</h2>

      {favorites.length > 0 ? (
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-3 w-fit min-w-max">
            {favorites.map((favorite) => (
              <FavoriteCard
                key={favorite.id}
                favorite={favorite}
                weather={weatherMap[favorite.id]?.data}
                isLoading={weatherMap[favorite.id]?.isLoading ?? true}
                onRemove={onRemove}
                onUpdateName={onUpdateName}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-32 bg-gray-50 rounded-xl text-gray-400 text-sm">
          즐겨찾기한 장소가 없습니다
        </div>
      )}
    </section>
  )
}
