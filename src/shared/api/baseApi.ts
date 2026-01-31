import axios from 'axios'
import { config } from '@/shared/config'

/**
 * OpenWeatherMap API 클라이언트
 *
 * @example
 * // 날씨 조회
 * openWeatherClient.get('/data/3.0/onecall', { params: { lat, lon } })
 *
 * // 좌표 변환
 * openWeatherClient.get('/geo/1.0/direct', { params: { q: '서울' } })
 */
export const openWeatherClient = axios.create({
  baseURL: 'https://api.openweathermap.org',
  params: {
    appid: config.openWeatherMapApiKey,
  },
})
