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

export interface GeocodeResult {
  input: string
  query: string
  lat: number
  lon: number
  addressName: string
}

export const geocodeKeys = {
  all: ['geocode'] as const,
  address: (address: string) => [...geocodeKeys.all, address] as const,
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
