import { useQuery } from '@tanstack/react-query'
import { getWeather } from '../api'
import type { WeatherQueryParams } from './types'

/**
 * Query Key 팩토리
 * - 캐시를 구분하는 키 생성
 * - 같은 좌표로 요청하면 캐시된 데이터 반환
 * - 예: ['weather', 37.5665, 126.978]
 */
export const weatherKeys = {
  all: ['weather'] as const,
  detail: (params: WeatherQueryParams) =>
    [...weatherKeys.all, params.lat, params.lon] as const,
}

/**
 * 날씨 데이터 조회 훅
 *
 * @param params - 위도/경도 좌표 (null이면 요청하지 않음)
 * @returns { data, isLoading, error, refetch }
 *
 * @example
 * // 좌표가 있을 때 - 날씨 데이터 요청
 * const { data, isLoading } = useWeatherQuery({ lat: 37.5665, lon: 126.978 })
 *
 * @example
 * // 좌표가 없을 때 - 요청하지 않음 (enabled: false)
 * const { data } = useWeatherQuery(null)
 */
export function useWeatherQuery(params: WeatherQueryParams | null) {
  return useQuery({
    queryKey: params ? weatherKeys.detail(params) : weatherKeys.all,
    queryFn: () => {
      if (!params) throw new Error('No coordinates provided')
      return getWeather(params)
    },
    enabled: !!params,
  })
}
