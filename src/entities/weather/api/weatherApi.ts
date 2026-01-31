import { openWeatherClient } from '@/shared/api'
import type {
  CurrentWeatherResponse,
  ForecastResponse,
  WeatherData,
  WeatherQueryParams,
} from '../model/types'

/**
 * Current Weather API로 현재 날씨 조회
 *
 * @see https://openweathermap.org/current
 */
export async function getCurrentWeather(
  params: WeatherQueryParams
): Promise<CurrentWeatherResponse> {
  const { data } = await openWeatherClient.get<CurrentWeatherResponse>(
    '/data/2.5/weather',
    {
      params: {
        lat: params.lat,
        lon: params.lon,
        units: 'metric',
        lang: 'kr',
      },
    }
  )
  return data
}

/**
 * 5 Day / 3 Hour Forecast API로 예보 조회
 * - 3시간 간격, 5일치 예보 (40개 데이터)
 *
 * @see https://openweathermap.org/forecast5
 */
export async function getForecast(
  params: WeatherQueryParams
): Promise<ForecastResponse> {
  const { data } = await openWeatherClient.get<ForecastResponse>(
    '/data/2.5/forecast',
    {
      params: {
        lat: params.lat,
        lon: params.lon,
        units: 'metric',
        lang: 'kr',
      },
    }
  )
  return data
}

/**
 * 현재 날씨 + 예보 통합 조회
 */
export async function getWeather(
  params: WeatherQueryParams
): Promise<WeatherData> {
  const [current, forecast] = await Promise.all([
    getCurrentWeather(params),
    getForecast(params),
  ])
  return { current, forecast }
}
