import axios from 'axios'

const GEOCODE_LAMBDA_URL =
  'https://7owydws2vrfwjygslag4dvuyoa0vdrqd.lambda-url.us-east-1.on.aws'

interface LambdaGeocodeResponse {
  query: string
  found: boolean
  lat?: number
  lon?: number
  address_name?: string
  b_code?: string
  h_code?: string
  address_type?: string
}

interface LambdaReverseGeocodeResponse {
  found: boolean
  lat: number
  lon: number
  address_name?: string
  region_1depth?: string
  region_2depth?: string
  region_3depth?: string
  road_address?: string
  jibun_address?: string
}

export interface GeocodeResult {
  input: string
  query: string
  lat: number
  lon: number
  addressName: string
}

export interface ReverseGeocodeResult {
  lat: number
  lon: number
  addressName: string
  sido: string
  sigungu: string
  dong: string
}

export const geocodeKeys = {
  all: ['geocode'] as const,
  address: (address: string) => [...geocodeKeys.all, address] as const,
  reverse: (lat: number, lon: number) => [...geocodeKeys.all, 'reverse', lat, lon] as const,
}

/**
 * 한국 행정구역 주소를 Lambda(Kakao API)로 geocoding
 */
export async function fetchGeocode(input: string): Promise<GeocodeResult> {
  const { data } = await axios.get<LambdaGeocodeResponse>(GEOCODE_LAMBDA_URL, {
    params: { q: input },
  })

  if (!data.found || data.lat === undefined || data.lon === undefined) {
    throw new Error(`좌표를 찾을 수 없습니다: ${input}`)
  }

  const result = {
    input,
    query: data.query,
    lat: data.lat,
    lon: data.lon,
    addressName: data.address_name ?? '',
  }

  console.log('Geocoding 성공:', result)
  return result
}

/**
 * 좌표를 Lambda(Kakao API)로 역지오코딩하여 한국어 주소 반환
 */
export async function fetchReverseGeocode(
  lat: number,
  lon: number
): Promise<ReverseGeocodeResult> {
  const { data } = await axios.get<LambdaReverseGeocodeResponse>(GEOCODE_LAMBDA_URL, {
    params: { lat, lon },
  })

  if (!data.found) {
    throw new Error(`주소를 찾을 수 없습니다: ${lat}, ${lon}`)
  }

  return {
    lat: data.lat,
    lon: data.lon,
    addressName: data.address_name ?? '',
    sido: data.region_1depth ?? '',
    sigungu: data.region_2depth ?? '',
    dong: data.region_3depth ?? '',
  }
}
