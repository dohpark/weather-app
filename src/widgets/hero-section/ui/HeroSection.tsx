import { getWeatherIconUrl } from '@/entities/weather'
import type { ForecastItem, WeatherCondition } from '@/entities/weather'
import { HourlyForecast } from './HourlyForecast'

interface HeroSectionProps {
  locationName?: string
  temperature?: number
  minTemp?: number
  maxTemp?: number
  weather?: WeatherCondition
  hourlyItems?: ForecastItem[]
  isLoading?: boolean
  error?: Error | null
}

/**
 * 히어로 섹션 (현재 날씨 + 시간대별 기온)
 * - 3D 배경은 추후 REAL-22~25에서 구현
 */
export function HeroSection({
  locationName = '위치 불명',
  temperature,
  minTemp,
  maxTemp,
  weather,
  hourlyItems,
  isLoading,
  error,
}: HeroSectionProps) {
  if (isLoading) {
    return (
      <section className="flex flex-col items-center justify-center min-h-[350px] bg-gradient-to-b from-blue-400 to-blue-600 text-white rounded-2xl mx-4">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-6 w-32 bg-white/30 rounded mb-4" />
          <div className="h-16 w-24 bg-white/30 rounded mb-2" />
          <div className="h-4 w-40 bg-white/30 rounded mb-6" />
          <div className="flex gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="h-3 w-8 bg-white/30 rounded" />
                <div className="h-8 w-8 bg-white/30 rounded-full" />
                <div className="h-3 w-6 bg-white/30 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="flex flex-col items-center justify-center min-h-[350px] bg-gradient-to-b from-gray-400 to-gray-600 text-white rounded-2xl mx-4 py-8">
        <p className="text-lg mb-2">날씨 정보를 불러올 수 없습니다</p>
        <p className="text-sm opacity-70">{error.message}</p>
      </section>
    )
  }

  return (
    <section className="flex flex-col items-center min-h-[350px] bg-gradient-to-b from-blue-400 to-blue-600 text-white rounded-2xl mx-4 py-8">
      {/* 현재 날씨 */}
      <h2 className="text-xl font-medium mb-1">{locationName}</h2>

      {weather && (
        <div className="flex items-center gap-2 mb-2">
          <img
            src={getWeatherIconUrl(weather.icon, '2x')}
            alt={weather.description}
            className="w-10 h-10"
          />
          <span className="text-sm opacity-80">{weather.description}</span>
        </div>
      )}

      <p className="text-7xl font-light mb-2">
        {temperature !== undefined ? `${Math.round(temperature)}°` : '--°'}
      </p>

      <p className="text-sm opacity-80 mb-6">
        {minTemp !== undefined && maxTemp !== undefined
          ? `최저 ${Math.round(minTemp)}° / 최고 ${Math.round(maxTemp)}°`
          : '-- / --'}
      </p>

      {/* 시간대별 기온 */}
      {hourlyItems && hourlyItems.length > 0 && (
        <div className="w-full border-t border-white/20 pt-4">
          <HourlyForecast items={hourlyItems} />
        </div>
      )}
    </section>
  )
}
