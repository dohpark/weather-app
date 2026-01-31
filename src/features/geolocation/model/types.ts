export interface Coordinates {
  lat: number
  lon: number
}

/**
 * 기본 위치: 서울시청
 * 위치 권한 거부 시 fallback으로 사용
 */
export const DEFAULT_COORDINATES: Coordinates = {
  lat: 37.5665,
  lon: 126.978,
}
