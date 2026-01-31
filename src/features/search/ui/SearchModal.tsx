import { useEffect, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'
import { useGeocode, formatDisplayAddress, searchLocations } from '@/entities/location'
import type { Location } from '@/entities/location'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (location: Location, coordinates: { lat: number; lon: number }) => void
}

/**
 * 장소 검색 모달
 * - 검색어 입력 시 실시간 매칭 (초성 검색 지원)
 * - 키보드 ↑/↓ 선택, Enter 확정, Esc 닫기
 */
export function SearchModal({ isOpen, onClose, onSelect }: SearchModalProps) {
  if (!isOpen) return null
  return <SearchModalContent onClose={onClose} onSelect={onSelect} />
}

function SearchModalContent({
  onClose,
  onSelect,
}: Omit<SearchModalProps, 'isOpen'>) {
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const isComposingRef = useRef(false)

  const [query, setQuery] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const { mutateAsync: geocode, isPending } = useGeocode()
  const results = query.length > 0 ? searchLocations(query) : []

  // 마운트 시 포커스
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // 선택 항목으로 스크롤
  useEffect(() => {
    if (selectedIndex < 0 || !listRef.current || !scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const item = listRef.current.children[selectedIndex] as HTMLElement
    if (!item) return

    const itemTop = item.offsetTop
    const itemBottom = itemTop + item.offsetHeight
    const containerTop = container.scrollTop
    const containerBottom = containerTop + container.clientHeight

    if (itemTop < containerTop) {
      container.scrollTop = itemTop
    } else if (itemBottom > containerBottom) {
      container.scrollTop = itemBottom - container.clientHeight
    }
  }, [selectedIndex])

  // IME 조합 종료 후 입력값 변경 (blur → set → focus)
  const setInputWithIMEClear = (value: string) => {
    inputRef.current?.blur()
    setInputValue(value)
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  const selectLocation = async (location: Location) => {
    setInputValue(formatDisplayAddress(location))
    try {
      const { lat, lon } = await geocode(location.fullAddress)
      onClose()
      onSelect(location, { lat, lon })
    } catch (error) {
      console.error('좌표 조회 실패:', error)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isPending || isComposingRef.current) return
    if (results.length === 0 && e.key !== 'Escape') return

    const handlers: Record<string, () => void> = {
      ArrowDown: () => {
        const next = selectedIndex < results.length - 1 ? selectedIndex + 1 : 0
        setSelectedIndex(next)
        setInputWithIMEClear(formatDisplayAddress(results[next]))
      },
      ArrowUp: () => {
        const prev = selectedIndex > 0 ? selectedIndex - 1 : results.length - 1
        setSelectedIndex(prev)
        setInputWithIMEClear(formatDisplayAddress(results[prev]))
      },
      Enter: () => {
        if (selectedIndex >= 0) selectLocation(results[selectedIndex])
      },
      Escape: onClose,
    }

    if (handlers[e.key]) {
      e.preventDefault()
      handlers[e.key]()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    setQuery(value)
    setSelectedIndex(-1)
  }

  const handleClear = () => {
    setInputValue('')
    setQuery('')
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        {/* 검색 입력 */}
        <div className="flex items-center gap-3 px-4 py-3 border-b">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => { isComposingRef.current = true }}
            onCompositionEnd={() => { isComposingRef.current = false }}
            placeholder="장소 검색 (예: 서울, 종로구, ㅅㅇ)"
            className="flex-1 text-base outline-none placeholder:text-gray-400"
            disabled={isPending}
          />
          {inputValue && !isPending && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        {/* 검색 결과 */}
        <div ref={scrollContainerRef} className="max-h-80 overflow-y-auto">
          {isPending ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full" />
            </div>
          ) : results.length > 0 ? (
            <ul ref={listRef}>
              {results.map((location, index) => (
                <li key={location.fullAddress}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedIndex(index)
                      selectLocation(location)
                    }}
                    className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                      index === selectedIndex
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-gray-50 text-gray-900'
                    }`}
                  >
                    {formatDisplayAddress(location)}
                  </button>
                </li>
              ))}
            </ul>
          ) : query ? (
            <p className="py-8 text-center text-sm text-gray-500">
              검색 결과가 없습니다
            </p>
          ) : (
            <p className="py-8 text-center text-sm text-gray-400">
              검색어를 입력하세요
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
