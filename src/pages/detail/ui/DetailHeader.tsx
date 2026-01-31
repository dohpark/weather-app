import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Star } from 'lucide-react'

interface DetailHeaderProps {
  locationName: string
}

/**
 * 상세 페이지 헤더
 * - 뒤로가기 버튼
 * - 장소명
 * - 즐겨찾기 버튼 (REAL-18에서 기능 구현 예정)
 */
export function DetailHeader({ locationName }: DetailHeaderProps) {
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
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="뒤로가기"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        {/* 장소명 */}
        <h1 className="absolute left-1/2 -translate-x-1/2 text-base font-semibold text-gray-800 truncate max-w-[60%]">
          {locationName}
        </h1>

        {/* 즐겨찾기 버튼 */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          className="p-2 -mr-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="즐겨찾기"
        >
          <Star className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </header>
  )
}
