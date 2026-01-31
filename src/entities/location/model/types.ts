export interface Location {
  /** 전체 주소 (예: "서울특별시-종로구-청운동") */
  fullAddress: string
  /** 시/도 */
  sido: string
  /** 시/군/구 (없을 수 있음) */
  sigungu?: string
  /** 읍/면/동 (없을 수 있음) */
  eupmyeondong?: string
}

export interface GeocodingResult {
  name: string
  lat: number
  lon: number
  country: string
  state?: string
}
