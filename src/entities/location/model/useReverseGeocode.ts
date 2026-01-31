import { useQuery } from '@tanstack/react-query'
import { fetchReverseGeocode, geocodeKeys } from '../api'

interface UseReverseGeocodeParams {
  lat: number
  lon: number
}

/**
 * 역지오코딩 query hook
 * 좌표를 한국어 주소로 변환
 *
 * @example
 * const { data, isLoading } = useReverseGeocode({ lat: 37.5, lon: 127.0 })
 * // data.addressName = "서울특별시 강남구 역삼동"
 */
export function useReverseGeocode(params: UseReverseGeocodeParams | null) {
  return useQuery({
    queryKey: params ? geocodeKeys.reverse(params.lat, params.lon) : ['geocode', 'reverse', 'none'],
    queryFn: () => {
      if (!params) throw new Error('No coordinates')
      return fetchReverseGeocode(params.lat, params.lon)
    },
    enabled: !!params,
    staleTime: 1000 * 60 * 10, // 10분 캐시
  })
}
