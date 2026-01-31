import { openWeatherClient } from '@/shared/api'
import type { OneCallResponse, WeatherQueryParams } from '../model/types'

/**
 * One Call API 3.0으로 날씨 데이터 조회
 *
 * @param params - 위도/경도 좌표
 * @returns 현재 날씨, 시간별 예보(48시간), 일별 예보(8일)
 *
 * @see https://openweathermap.org/api/one-call-3
 */
export async function getWeather(
  params: WeatherQueryParams
): Promise<OneCallResponse> {
  const { data } = await openWeatherClient.get<OneCallResponse>(
    '/data/3.0/onecall',
    {
      params: {
        lat: params.lat,
        lon: params.lon,
        units: 'metric',
        lang: 'kr',
        /**
         * 응답에서 제외할 데이터
         * - minutely: 1분 단위 강수량 예보 (사용 안 함)
         * - alerts: 기상 경보 (사용 안 함)
         *
         * 포함되는 데이터:
         * - current: 현재 날씨
         * - hourly: 시간별 예보 (48시간)
         * - daily: 일별 예보 (8일)
         */
        exclude: 'minutely,alerts',
      },
    }
  )
  return data
}
