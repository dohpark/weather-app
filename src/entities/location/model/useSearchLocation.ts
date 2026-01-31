import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { searchLocations, formatDisplayAddress } from '../lib/searchUtils'
import { getCoordinates } from '../api'
import type { Location } from './types'

export const locationKeys = {
  all: ['location'] as const,
  search: (query: string) => [...locationKeys.all, 'search', query] as const,
  geocode: (address: string) =>
    [...locationKeys.all, 'geocode', address] as const,
}

/**
 * 장소 검색 훅
 *
 * @example
 * const { query, setQuery, results, selectLocation, selectedCoordinates } = useSearchLocation()
 *
 * // 검색어 입력
 * setQuery('서울')
 *
 * // 결과에서 장소 선택
 * selectLocation(results[0])
 *
 * // 선택된 장소의 좌표
 * console.log(selectedCoordinates) // { lat: 37.5665, lon: 126.978 }
 */
export function useSearchLocation() {
  const [query, setQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  )

  // 로컬 데이터에서 검색 (동기)
  const results = useMemo(() => {
    if (query.length < 1) return []
    return searchLocations(query)
  }, [query])

  // 선택된 장소의 좌표 조회 (Geocoding API)
  const geocodingQuery = useQuery({
    queryKey: locationKeys.geocode(selectedLocation?.fullAddress ?? ''),
    queryFn: async () => {
      if (!selectedLocation) throw new Error('No location selected')
      const displayAddress = formatDisplayAddress(selectedLocation)
      const results = await getCoordinates(displayAddress)
      if (results.length === 0) throw new Error('좌표를 찾을 수 없습니다.')
      return results[0]
    },
    enabled: !!selectedLocation,
  })

  const selectLocation = (location: Location) => {
    setSelectedLocation(location)
    setQuery('')
  }

  const clearSelection = () => {
    setSelectedLocation(null)
  }

  return {
    /** 검색어 */
    query,
    /** 검색어 변경 */
    setQuery,
    /** 검색 결과 목록 */
    results,
    /** 장소 선택 */
    selectLocation,
    /** 선택 해제 */
    clearSelection,
    /** 선택된 장소 */
    selectedLocation,
    /** 선택된 장소의 좌표 */
    selectedCoordinates: geocodingQuery.data
      ? { lat: geocodingQuery.data.lat, lon: geocodingQuery.data.lon }
      : null,
    /** 좌표 로딩 중 */
    isLoadingCoordinates: geocodingQuery.isLoading,
    /** 좌표 조회 에러 */
    coordinatesError: geocodingQuery.error,
  }
}
