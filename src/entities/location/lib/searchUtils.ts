import type { Location } from '../model/types'
import koreaDistricts from '../data/korea_districts.json'

/**
 * 초성 추출용 상수
 */
const CHOSUNG = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
]

/**
 * 한글 문자열에서 초성 추출
 *
 * @example
 * getChosung('서울') // 'ㅅㅇ'
 * getChosung('종로구') // 'ㅈㄹㄱ'
 */
export function getChosung(str: string): string {
  return str
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0) - 44032
      if (code < 0 || code > 11171) return char
      return CHOSUNG[Math.floor(code / 588)]
    })
    .join('')
}

/**
 * 문자열 파싱하여 Location 객체로 변환
 *
 * @example
 * parseLocation('서울특별시-종로구-청운동')
 * // { fullAddress: '서울특별시-종로구-청운동', sido: '서울특별시', sigungu: '종로구', eupmyeondong: '청운동' }
 */
export function parseLocation(address: string): Location {
  const parts = address.split('-')
  return {
    fullAddress: address,
    sido: parts[0],
    sigungu: parts[1],
    eupmyeondong: parts[2],
  }
}

/**
 * 검색어로 장소 검색 (초성 검색, 부분 일치 지원)
 *
 * @param query - 검색어
 * @param limit - 최대 결과 개수 (기본: 20)
 * @returns 매칭된 장소 목록
 *
 * @example
 * searchLocations('서울') // 서울 포함된 모든 장소
 * searchLocations('ㅅㅇ') // 초성 'ㅅㅇ'으로 시작하는 장소
 */
export function searchLocations(query: string, limit = 20): Location[] {
  if (!query.trim()) return []

  const normalizedQuery = query.trim().toLowerCase()
  const isChosungQuery = /^[ㄱ-ㅎ]+$/.test(normalizedQuery)

  const results = (koreaDistricts as string[])
    .filter((address) => {
      const displayName = address.replace(/-/g, ' ')

      if (isChosungQuery) {
        // 초성 검색
        const addressChosung = getChosung(displayName)
        return addressChosung.includes(normalizedQuery)
      } else {
        // 부분 일치 검색
        return displayName.toLowerCase().includes(normalizedQuery)
      }
    })
    .slice(0, limit)
    .map(parseLocation)

  return results
}

/**
 * 표시용 주소 포맷
 *
 * @example
 * formatDisplayAddress({ sido: '서울특별시', sigungu: '종로구', eupmyeondong: '청운동' })
 * // '서울특별시 종로구 청운동'
 */
export function formatDisplayAddress(location: Location): string {
  return [location.sido, location.sigungu, location.eupmyeondong]
    .filter(Boolean)
    .join(' ')
}
