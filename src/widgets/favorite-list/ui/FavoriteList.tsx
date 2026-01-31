import { useFavorites } from '@/features/favorites'
import { FavoriteCard } from './FavoriteCard'

/**
 * 즐겨찾기 카드 목록
 * - 최대 6개 카드 그리드 레이아웃
 * - 각 카드에 장소명, 날씨, 기온 표시
 */
export function FavoriteList() {
  const { favorites, removeFavorite } = useFavorites()

  return (
    <section className="px-4 py-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">즐겨찾기</h2>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {favorites.map((favorite) => (
            <FavoriteCard
              key={favorite.id}
              favorite={favorite}
              onRemove={removeFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-32 bg-gray-50 rounded-xl text-gray-400 text-sm">
          즐겨찾기한 장소가 없습니다
        </div>
      )}
    </section>
  )
}
