import { useFavorites } from '@/features/favorites'
import { FavoriteCard } from './FavoriteCard'

/**
 * 즐겨찾기 카드 목록
 * - 최대 6개 카드 그리드 레이아웃
 * - 각 카드에 장소명, 날씨, 기온 표시
 */
export function FavoriteList() {
  const { favorites, removeFavorite, updateFavoriteName } = useFavorites()

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
                onRemove={removeFavorite}
                onUpdateName={updateFavoriteName}
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
