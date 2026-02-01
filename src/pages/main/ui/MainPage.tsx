import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/widgets/header'
import { HeroSection } from '@/widgets/hero-section'
import { SearchModal } from '@/features/search'
import { FavoriteListContainer } from '@/features/favorites'
import { useCurrentLocation } from '@/features/geolocation'
import { useWeatherQuery } from '@/entities/weather'
import { useReverseGeocode } from '@/entities/location'
import type { Location } from '@/entities/location'

/**
 * 메인 페이지
 * - 헤더: 검색, 현재위치 버튼
 * - 히어로: 현재 위치 날씨
 * - 즐겨찾기: 저장된 장소들
 */
export function MainPage() {
  const navigate = useNavigate()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const { coordinates, isLoading: isLocationLoading, refetch: refetchLocation } = useCurrentLocation()
  const {
    data: weather,
    isLoading: isWeatherLoading,
    error,
  } = useWeatherQuery(coordinates)
  const { data: locationData, isLoading: isLocationNameLoading } = useReverseGeocode(coordinates)

  // 한국어 주소
  const locationName = locationData
    ? `${locationData.sigungu} ${locationData.dong}`.trim() || locationData.addressName
    : undefined

  const isLoading = isLocationLoading || isWeatherLoading || isLocationNameLoading

  const handleSearchClick = () => {
    setIsSearchOpen(true)
  }

  const handleSearchClose = () => {
    setIsSearchOpen(false)
  }

  const handleSearchSelect = (
    location: Location,
    coords: { lat: number; lon: number }
  ) => {
    // 상세 페이지로 이동 (좌표를 URL 파라미터로 전달)
    const locationId = encodeURIComponent(location.fullAddress)
    navigate(`/detail/${locationId}?lat=${coords.lat}&lon=${coords.lon}`)
  }

  const handleLocationClick = () => {
    refetchLocation()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        onSearchClick={handleSearchClick}
        onLocationClick={handleLocationClick}
      />

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

        <FavoriteListContainer />
      </main>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={handleSearchClose}
        onSelect={handleSearchSelect}
      />
    </div>
  )
}
