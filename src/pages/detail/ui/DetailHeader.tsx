import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Star } from 'lucide-react'

interface DetailHeaderProps {
  isFavorite: boolean
  isFull: boolean
  onToggleFavorite: () => void
}

/**
 * 상세 페이지 헤더
 * - 뒤로가기 버튼
 * - 즐겨찾기 추가/삭제 버튼
 */
export function DetailHeader({ isFavorite, isFull, onToggleFavorite }: DetailHeaderProps) {
  const navigate = useNavigate()
  const [showFullMessage, setShowFullMessage] = useState(false)

  const handleBack = () => {
    navigate(-1)
  }

  const handleFavoriteClick = () => {
    if (!isFavorite && isFull) {
      setShowFullMessage(true)
      setTimeout(() => setShowFullMessage(false), 4000)
      return
    }
    onToggleFavorite()
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
        <div className="relative">
          <button
            type="button"
            onClick={handleFavoriteClick}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={isFavorite ? '즐겨찾기 삭제' : '즐겨찾기 추가'}
          >
            <Star
              className={`w-5 h-5 transition-colors ${
                isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
              }`}
            />
          </button>

          {/* 최대 6개 안내 메시지 */}
          {showFullMessage && (
            <div className="absolute right-0 top-full mt-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap">
              즐겨찾기는 최대 6개까지 가능합니다
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
