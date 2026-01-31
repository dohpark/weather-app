import { useParams, useSearchParams } from 'react-router-dom'
import { DetailHeader } from './DetailHeader'
import { RadarMapSection } from './RadarMapSection'
import { HeroSection } from '@/widgets/hero-section'
import { useWeatherQuery } from '@/entities/weather'
import { parseLocation, formatDisplayAddress } from '@/entities/location'

/**
 * 상세 페이지
 * - 헤더: 뒤로가기, 즐겨찾기 버튼
 * - 히어로: 현재 날씨 + 시간대별 기온
 * - 레이더 맵: 지도 + 날씨 레이어
 */
export function DetailPage() {
  const { locationId } = useParams<{ locationId: string }>()
  const [searchParams] = useSearchParams()

  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')
  const rawLocationName = locationId ? decodeURIComponent(locationId) : ''
  const locationName = rawLocationName
    ? formatDisplayAddress(parseLocation(rawLocationName))
    : '알 수 없는 위치'

  const coordinates = lat && lon ? { lat: parseFloat(lat), lon: parseFloat(lon) } : null
  const { data: weather, isLoading, error } = useWeatherQuery(coordinates)

  return (
    <div className="min-h-screen bg-white">
      <DetailHeader />

      <main className="pb-8">
        <HeroSection
          locationName={locationName}
          temperature={weather?.current.main.temp}
          minTemp={weather?.current.main.temp_min}
          maxTemp={weather?.current.main.temp_max}
          weather={weather?.current.weather[0]}
          hourlyItems={weather?.forecast.list}
          isLoading={isLoading}
          error={error}
        />

        <RadarMapSection />
      </main>
    </div>
  )
}
