import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Pencil, Check } from 'lucide-react'
import { useWeatherQuery, getWeatherIconUrl } from '@/entities/weather'
import { parseLocation, formatDisplayAddress } from '@/entities/location'
import type { Favorite } from '@/features/favorites'

interface FavoriteCardProps {
  favorite: Favorite
  onRemove: (id: string) => void
  onUpdateName: (id: string, name: string) => void
}

export function FavoriteCard({ favorite, onRemove, onUpdateName }: FavoriteCardProps) {
  const navigate = useNavigate()
  const { data, isLoading } = useWeatherQuery({ lat: favorite.lat, lon: favorite.lon })
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(favorite.name)
  const inputRef = useRef<HTMLInputElement>(null)

  // 이름에 '-'가 있으면 포맷팅, 없으면 그대로 사용
  const displayName = favorite.name.includes('-')
    ? formatDisplayAddress(parseLocation(favorite.name))
    : favorite.name

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleClick = () => {
    if (isEditing) return
    const locationId = encodeURIComponent(favorite.name)
    navigate(`/detail/${locationId}?lat=${favorite.lat}&lon=${favorite.lon}`)
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onRemove(favorite.id)
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setEditName(displayName)
    setIsEditing(true)
  }

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (editName.trim()) {
      onUpdateName(favorite.id, editName.trim())
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (editName.trim()) {
        onUpdateName(favorite.id, editName.trim())
      }
      setIsEditing(false)
    } else if (e.key === 'Escape') {
      setIsEditing(false)
    }
  }

  if (isLoading) {
    return <FavoriteCardSkeleton />
  }

  const weather = data?.current
  const temp = weather?.main.temp
  const minTemp = weather?.main.temp_min
  const maxTemp = weather?.main.temp_max
  const weatherInfo = weather?.weather[0]

  return (
    <div
      onClick={handleClick}
      className="group relative min-w-[200px] p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl text-left hover:from-blue-100 hover:to-blue-200 transition-colors cursor-pointer"
    >
      {/* 삭제 버튼 */}
      <button
        type="button"
        onClick={handleRemove}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/50 transition-colors"
        aria-label="즐겨찾기 삭제"
      >
        <X className="w-4 h-4 text-gray-500" />
      </button>

      {/* 장소명 */}
      <div className="flex items-center gap-1 mb-2 pr-6">
        {isEditing ? (
          <>
            <input
              ref={inputRef}
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={handleKeyDown}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 text-sm font-medium text-gray-800 bg-white rounded px-1 py-0.5 outline-none border border-blue-300"
            />
            <button
              type="button"
              onClick={handleSave}
              className="p-1 rounded hover:bg-white/50"
              aria-label="저장"
            >
              <Check className="w-3 h-3 text-blue-600" />
            </button>
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-gray-800 truncate">
              {displayName}
            </p>
            <button
              type="button"
              onClick={handleEditClick}
              className="p-1 rounded hover:bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="별칭 수정"
            >
              <Pencil className="w-3 h-3 text-gray-500" />
            </button>
          </>
        )}
      </div>

      {/* 날씨 정보 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {weatherInfo && (
            <img
              src={getWeatherIconUrl(weatherInfo.icon)}
              alt={weatherInfo.description}
              className="w-10 h-10"
            />
          )}
          <span className="text-2xl font-bold text-gray-900">
            {temp !== undefined ? `${Math.round(temp)}°` : '--'}
          </span>
        </div>
        <div className="text-xs text-gray-500">
          <span className="text-blue-600">{minTemp !== undefined ? Math.round(minTemp) : '--'}°</span>
          {' / '}
          <span className="text-red-500">{maxTemp !== undefined ? Math.round(maxTemp) : '--'}°</span>
        </div>
      </div>
    </div>
  )
}

function FavoriteCardSkeleton() {
  return (
    <div className="min-w-[200px] p-4 bg-gray-100 rounded-xl animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
          <div className="h-8 bg-gray-200 rounded w-12" />
        </div>
        <div className="h-4 bg-gray-200 rounded w-16" />
      </div>
    </div>
  )
}
