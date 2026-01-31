import { openWeatherClient } from '@/shared/api'
import type { GeocodingResult } from '../model/types'

/**
 * Geocoding API로 장소명을 좌표로 변환
 *
 * @param query - 검색할 장소명 (예: "서울특별시 종로구")
 * @returns 위도/경도 포함된 검색 결과
 *
 * @see https://openweathermap.org/api/geocoding-api
 */
export async function getCoordinates(
  query: string
): Promise<GeocodingResult[]> {
  const { data } = await openWeatherClient.get<GeocodingResult[]>(
    '/geo/1.0/direct',
    {
      params: {
        q: `${query},KR`,
        limit: 5,
      },
    }
  )
  return data
}
