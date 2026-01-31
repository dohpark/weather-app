import { useQuery } from '@tanstack/react-query'
import { getCurrentPosition } from '../lib/geolocationApi'
import { DEFAULT_COORDINATES } from './types'

export const geolocationKeys = {
  current: ['geolocation', 'current'] as const,
}

/**
 * 현재 위치 감지 훅 (Tanstack Query)
 *
 * @param options.useFallback - 위치 권한 거부 시 기본 위치(서울) 사용 여부 (기본: true)
 * @returns { data, isLoading, error, refetch }
 *
 * @example
 * const { data: coordinates, isLoading, error } = useCurrentLocation()
 *
 * if (isLoading) return <Loading />
 * if (coordinates) return <Weather lat={coordinates.lat} lon={coordinates.lon} />
 */
export function useCurrentLocation(options: { useFallback?: boolean } = {}) {
  const { useFallback = true } = options

  const query = useQuery({
    queryKey: geolocationKeys.current,
    queryFn: getCurrentPosition,
    staleTime: 1000 * 60 * 5, // 5분간 캐시
    retry: false, // 권한 거부 시 재시도 안 함
  })

  // 에러 시 fallback 좌표 반환
  const coordinates = query.data ?? (useFallback && query.error ? DEFAULT_COORDINATES : null)
  const isUsingFallback = !query.data && !!query.error && useFallback

  return {
    ...query,
    coordinates,
    /** 기본 위치 사용 중 여부 */
    isUsingFallback,
  }
}
