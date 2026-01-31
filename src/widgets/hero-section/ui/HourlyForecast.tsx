import { getWeatherIconUrl } from '@/entities/weather'
import type { ForecastItem } from '@/entities/weather'

interface HourlyForecastProps {
  items: ForecastItem[]
}

/**
 * 시간대별 기온 가로 스크롤
 * - 3시간 간격 예보 표시
 * - 최대 8개 (24시간)
 */
export function HourlyForecast({ items }: HourlyForecastProps) {
  // 24시간분만 표시 (8개)
  const hourlyItems = items.slice(0, 8)

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-4 px-4 min-w-max">
        {hourlyItems.map((item) => (
          <HourlyItem key={item.dt} item={item} />
        ))}
      </div>
    </div>
  )
}

function HourlyItem({ item }: { item: ForecastItem }) {
  const date = new Date(item.dt * 1000)
  const hour = date.getHours()
  const timeLabel = `${hour}시`

  const iconUrl = getWeatherIconUrl(item.weather[0].icon, '2x')
  const temp = Math.round(item.main.temp)

  return (
    <div className="flex flex-col items-center gap-1 py-2">
      <span className="text-xs opacity-80">{timeLabel}</span>
      <img src={iconUrl} alt={item.weather[0].description} className="w-8 h-8" />
      <span className="text-sm font-medium">{temp}°</span>
    </div>
  )
}
