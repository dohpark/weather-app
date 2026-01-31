import { getWeatherIconUrl } from '@/entities/weather'
import type { ForecastItem } from '@/entities/weather'

interface HourlyForecastSectionProps {
  items?: ForecastItem[]
  isLoading?: boolean
}

/**
 * 시간대별 기온 섹션
 * - 3시간 간격 예보 가로 스크롤
 * - 최대 8개 (24시간)
 */
export function HourlyForecastSection({ items, isLoading }: HourlyForecastSectionProps) {
  if (isLoading) {
    return (
      <section className="mx-4 mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">시간대별 기온</h3>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[60px]">
              <div className="h-4 w-8 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-4 w-6 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (!items || items.length === 0) return null

  const hourlyItems = items.slice(0, 8)

  return (
    <section className="mx-4 mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">시간대별 기온</h3>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {hourlyItems.map((item) => (
          <HourlyItem key={item.dt} item={item} />
        ))}
      </div>
    </section>
  )
}

function HourlyItem({ item }: { item: ForecastItem }) {
  const date = new Date(item.dt * 1000)
  const hour = date.getHours()
  const timeLabel = `${hour}시`

  const iconUrl = getWeatherIconUrl(item.weather[0].icon, '2x')
  const temp = Math.round(item.main.temp)

  return (
    <div className="flex flex-col items-center gap-1 min-w-[60px] py-2 px-3 bg-gray-50 rounded-xl">
      <span className="text-xs text-gray-500">{timeLabel}</span>
      <img src={iconUrl} alt={item.weather[0].description} className="w-10 h-10" />
      <span className="text-sm font-semibold text-gray-800">{temp}°</span>
    </div>
  )
}
