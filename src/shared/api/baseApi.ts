import axios from 'axios'
import { config } from '@/shared/config'

export const apiClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/3.0',
  params: {
    appid: config.openWeatherMapApiKey,
    units: 'metric',
    lang: 'kr',
  },
})
