import type { Coordinates } from '../model/types'

/**
 * 브라우저 Geolocation API로 현재 위치 조회
 *
 * @returns 위도/경도 좌표
 * @throws GeolocationPositionError (권한 거부, 위치 불가, 타임아웃)
 *
 * @example
 * try {
 *   const coords = await getCurrentPosition()
 *   console.log(coords) // { lat: 37.5665, lon: 126.978 }
 * } catch (error) {
 *   console.error(error.message)
 * }
 */
export function getCurrentPosition(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation이 지원되지 않는 브라우저입니다.'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
      },
      (error) => {
        reject(new Error(getGeolocationErrorMessage(error)))
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5분간 캐시
      }
    )
  })
}

/**
 * Geolocation 에러 코드를 사용자 친화적 메시지로 변환
 */
function getGeolocationErrorMessage(error: GeolocationPositionError): string {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return '위치 권한이 거부되었습니다.'
    case error.POSITION_UNAVAILABLE:
      return '위치 정보를 가져올 수 없습니다.'
    case error.TIMEOUT:
      return '위치 요청 시간이 초과되었습니다.'
    default:
      return '알 수 없는 오류가 발생했습니다.'
  }
}
