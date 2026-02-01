import { Search, MapPin } from 'lucide-react'

interface MainHeaderProps {
  onSearchClick?: () => void
  onLocationClick?: () => void
}

/**
 * 메인 페이지 헤더
 * - 검색 아이콘: 클릭 시 검색 모달 열림
 * - 현재 위치 버튼: 클릭 시 현재 위치로 이동
 */
export function MainHeader({ onSearchClick, onLocationClick }: MainHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3">
      <button
        type="button"
        onClick={onSearchClick}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="장소 검색"
      >
        <Search className="w-5 h-5 text-gray-700" />
      </button>

      <button
        type="button"
        onClick={onLocationClick}
        className="flex items-center gap-1 px-3 py-2 text-sm text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
      >
        <MapPin className="w-4 h-4" />
        <span>현재위치</span>
      </button>
    </header>
  )
}
