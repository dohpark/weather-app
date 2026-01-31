/**
 * 즐겨찾기 카드 목록
 * - 상세 구현은 REAL-15에서 진행
 */
export function FavoriteList() {
  return (
    <section className="px-4 py-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">즐겨찾기</h2>

      {/* 빈 상태 */}
      <div className="flex items-center justify-center h-32 bg-gray-50 rounded-xl text-gray-400 text-sm">
        즐겨찾기한 장소가 없습니다
      </div>

      {/* 카드 그리드 - REAL-15에서 구현
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {favorites.map((fav) => (
          <FavoriteCard key={fav.id} {...fav} />
        ))}
      </div>
      */}
    </section>
  )
}
