export interface WeatherCondition {
  id: number
  main: string
  description: string
  icon: string
}

/**
 * Current Weather API 응답
 * @see https://openweathermap.org/current
 */
export interface CurrentWeatherResponse {
  coord: {
    lon: number
    lat: number
  }
  weather: WeatherCondition[]
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  name: string
}

/**
 * 5 Day / 3 Hour Forecast API 응답
 * @see https://openweathermap.org/forecast5
 */
export interface ForecastResponse {
  list: ForecastItem[]
  city: {
    name: string
    coord: {
      lat: number
      lon: number
    }
    country: string
    timezone: number
    sunrise: number
    sunset: number
  }
}

export interface ForecastItem {
  dt: number
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  weather: WeatherCondition[]
  clouds: {
    all: number
  }
  wind: {
    speed: number
    deg: number
  }
  visibility: number
  pop: number // 강수 확률
  dt_txt: string
}

/**
 * 통합 날씨 데이터 (Current + Forecast 조합)
 */
export interface WeatherData {
  current: CurrentWeatherResponse
  forecast: ForecastResponse
}

export interface WeatherQueryParams {
  lat: number
  lon: number
}
