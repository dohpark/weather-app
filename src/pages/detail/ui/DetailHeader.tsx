import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Star } from 'lucide-react'

/**
 * 상세 페이지 헤더
 * - 뒤로가기 버튼
 * - 즐겨찾기 버튼 (REAL-18에서 기능 구현 예정)
 */
export function DetailHeader() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  const handleFavoriteClick = () => {
    // REAL-18에서 구현 예정
  }

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {/* 뒤로가기 버튼 */}
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="뒤로가기"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        {/* 즐겨찾기 버튼 */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="즐겨찾기"
        >
          <Star className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </header>
  )
}
