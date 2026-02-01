/** 즐겨찾기 아이템 */
export interface Favorite {
  id: string
  name: string
  lat: number
  lon: number
}

/** 날씨 정보 */
export interface WeatherInfo {
  id: number
  main: string
  description: string
  icon: string
}

/** 날씨 데이터 */
export interface WeatherData {
  current: {
    main: {
      temp: number
      temp_min: number
      temp_max: number
    }
    weather: WeatherInfo[]
  }
}
