import { Header } from '@/widgets/header'
import { HeroSection } from '@/widgets/hero-section'
import { FavoriteList } from '@/widgets/favorite-list'
import { useCurrentLocation } from '@/features/geolocation'
import { useWeatherQuery } from '@/entities/weather'

/**
 * 메인 페이지
 * - 헤더: 검색, 현재위치 버튼
 * - 히어로: 현재 위치 날씨
 * - 즐겨찾기: 저장된 장소들
 */
export function MainPage() {
  const { coordinates, isLoading: isLocationLoading } = useCurrentLocation()
  const { data: weather, isLoading: isWeatherLoading } = useWeatherQuery(
    coordinates
  )

  const isLoading = isLocationLoading || isWeatherLoading

  const handleSearchClick = () => {
    // REAL-14에서 구현
    console.log('검색 클릭')
  }

  const handleLocationClick = () => {
    // 현재 위치 새로고침
    console.log('현재 위치 클릭')
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        onSearchClick={handleSearchClick}
        onLocationClick={handleLocationClick}
      />

      <main className="pb-8">
        <HeroSection
          locationName={weather?.current.name}
          temperature={weather?.current.main.temp}
          minTemp={weather?.current.main.temp_min}
          maxTemp={weather?.current.main.temp_max}
          isLoading={isLoading}
        />

        <FavoriteList />
      </main>
    </div>
  )
}
