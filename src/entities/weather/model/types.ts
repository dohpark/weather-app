export interface WeatherCondition {
  id: number
  main: string
  description: string
  icon: string
}

export interface CurrentWeather {
  dt: number
  sunrise: number
  sunset: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  weather: WeatherCondition[]
}

export interface HourlyWeather {
  dt: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  wind_gust?: number
  weather: WeatherCondition[]
  pop: number
}

export interface DailyTemperature {
  day: number
  min: number
  max: number
  night: number
  eve: number
  morn: number
}

export interface DailyFeelsLike {
  day: number
  night: number
  eve: number
  morn: number
}

export interface DailyWeather {
  dt: number
  sunrise: number
  sunset: number
  moonrise: number
  moonset: number
  moon_phase: number
  summary: string
  temp: DailyTemperature
  feels_like: DailyFeelsLike
  pressure: number
  humidity: number
  dew_point: number
  wind_speed: number
  wind_deg: number
  wind_gust?: number
  weather: WeatherCondition[]
  clouds: number
  pop: number
  rain?: number
  snow?: number
  uvi: number
}

export interface OneCallResponse {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  current: CurrentWeather
  hourly: HourlyWeather[]
  daily: DailyWeather[]
}

export interface WeatherQueryParams {
  lat: number
  lon: number
}
