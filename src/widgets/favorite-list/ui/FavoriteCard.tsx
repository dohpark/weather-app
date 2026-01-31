import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { useWeatherQuery, getWeatherIconUrl } from '@/entities/weather'
import type { Favorite } from '@/features/favorites'

interface FavoriteCardProps {
  favorite: Favorite
  onRemove: (id: string) => void
}

export function FavoriteCard({ favorite, onRemove }: FavoriteCardProps) {
  const navigate = useNavigate()
  const { data, isLoading } = useWeatherQuery({ lat: favorite.lat, lon: favorite.lon })

  const handleClick = () => {
    const locationId = encodeURIComponent(favorite.name)
    navigate(`/detail/${locationId}?lat=${favorite.lat}&lon=${favorite.lon}`)
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onRemove(favorite.id)
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
      className="relative w-full p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl text-left hover:from-blue-100 hover:to-blue-200 transition-colors cursor-pointer"
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
      <p className="text-sm font-medium text-gray-800 mb-2 pr-6 truncate">
        {favorite.name}
      </p>

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
    <div className="w-full p-4 bg-gray-100 rounded-xl animate-pulse">
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
