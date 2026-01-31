import { useParams, useSearchParams } from 'react-router-dom'
import { DetailHeader } from './DetailHeader'
import { DetailHero } from './DetailHero'
import { HourlyForecastSection } from './HourlyForecastSection'
import { RadarMapSection } from './RadarMapSection'
import { useWeatherQuery } from '@/entities/weather'

/**
 * 상세 페이지
 * - 헤더: 뒤로가기, 장소명, 즐겨찾기 버튼
 * - 히어로: 3D 배경 + 현재 날씨
 * - 시간대별 기온: 가로 스크롤
 * - 레이더 맵: 지도 + 날씨 레이어
 */
export function DetailPage() {
  const { locationId } = useParams<{ locationId: string }>()
  const [searchParams] = useSearchParams()

  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')
  const locationName = locationId ? decodeURIComponent(locationId) : '알 수 없는 위치'

  const coordinates = lat && lon ? { lat: parseFloat(lat), lon: parseFloat(lon) } : null
  const { data: weather, isLoading, error } = useWeatherQuery(coordinates)

  return (
    <div className="min-h-screen bg-white">
      <DetailHeader locationName={locationName} />

      <main className="pb-8">
        <DetailHero
          temperature={weather?.current.main.temp}
          minTemp={weather?.current.main.temp_min}
          maxTemp={weather?.current.main.temp_max}
          weather={weather?.current.weather[0]}
          isLoading={isLoading}
          error={error}
        />

        <HourlyForecastSection
          items={weather?.forecast.list}
          isLoading={isLoading}
        />

        <RadarMapSection />
      </main>
    </div>
  )
}
