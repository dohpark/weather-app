import { getWeatherIconUrl } from '@/entities/weather'
import type { WeatherCondition } from '@/entities/weather'

interface DetailHeroProps {
  temperature?: number
  minTemp?: number
  maxTemp?: number
  weather?: WeatherCondition
  isLoading?: boolean
  error?: Error | null
}

/**
 * 상세 페이지 히어로 섹션
 * - 3D 배경은 REAL-22~25에서 구현 예정
 * - 현재 기온, 날씨 상태, 최저/최고 기온 표시
 */
export function DetailHero({
  temperature,
  minTemp,
  maxTemp,
  weather,
  isLoading,
  error,
}: DetailHeroProps) {
  if (isLoading) {
    return (
      <section className="flex flex-col items-center justify-center h-64 bg-gradient-to-b from-blue-400 to-blue-600 text-white rounded-2xl mx-4">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-16 w-24 bg-white/30 rounded mb-2" />
          <div className="h-5 w-16 bg-white/30 rounded mb-2" />
          <div className="h-4 w-32 bg-white/30 rounded" />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="flex flex-col items-center justify-center h-64 bg-gradient-to-b from-gray-400 to-gray-600 text-white rounded-2xl mx-4">
        <p className="text-lg mb-2">날씨 정보를 불러올 수 없습니다</p>
        <p className="text-sm opacity-70">{error.message}</p>
      </section>
    )
  }

  return (
    <section className="flex flex-col items-center justify-center h-64 bg-gradient-to-b from-blue-400 to-blue-600 text-white rounded-2xl mx-4">
      {/* 현재 기온 */}
      <p className="text-7xl font-light mb-1">
        {temperature !== undefined ? `${Math.round(temperature)}°` : '--°'}
      </p>

      {/* 날씨 상태 */}
      {weather && (
        <div className="flex items-center gap-1 mb-2">
          <img
            src={getWeatherIconUrl(weather.icon)}
            alt={weather.description}
            className="w-6 h-6"
          />
          <span className="text-sm">{weather.description}</span>
        </div>
      )}

      {/* 최저/최고 기온 */}
      <p className="text-sm opacity-80">
        {minTemp !== undefined && maxTemp !== undefined
          ? `최저 ${Math.round(minTemp)}° / 최고 ${Math.round(maxTemp)}°`
          : '-- / --'}
      </p>
    </section>
  )
}
