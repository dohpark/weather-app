import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'

/** OpenWeather에서 지원하는 날씨 레이어 타입 */
export type WeatherLayerType =
  | 'precipitation_new'
  | 'clouds_new'
  | 'pressure_new'
  | 'wind_new'
  | 'temp_new'

interface WeatherRadarMapProps {
  /** 날씨 오버레이 레이어 타입 */
  layer?: WeatherLayerType
  /** 오버레이 투명도 (0-1) */
  opacity?: number
  /** 지도 높이 */
  height?: string | number
  /** 초기 중심 좌표 [lat, lng] */
  center?: [number, number]
  /** 초기 줌 레벨 */
  zoom?: number
  /** 마커 위치 [lat, lng] */
  markerPosition?: [number, number]
}

// 커스텀 마커 아이콘
const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

// 서울 좌표
const DEFAULT_CENTER: [number, number] = [37.5665, 126.978]
const DEFAULT_ZOOM = 7

// CARTO Dark Matter (dark theme)
const BASE_TILE_URL =
  'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
const BASE_ATTRIBUTION = '&copy; OpenStreetMap contributors &copy; CARTO'

// OpenWeather tile URL
const getWeatherTileUrl = (layer: WeatherLayerType, apiKey: string) =>
  `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${apiKey}`

/**
 * 날씨 레이더 맵 컴포넌트
 * - Base map: CARTO Positron
 * - Overlay: OpenWeather raster tiles
 */
export function WeatherRadarMap({
  layer = 'precipitation_new',
  opacity = 0.6,
  height = 256,
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  markerPosition,
}: WeatherRadarMapProps) {
  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY

  if (!apiKey) {
    return (
      <div
        className="flex items-center justify-center bg-gray-100 text-gray-400 text-sm"
        style={{ height }}
      >
        API 키가 설정되지 않았습니다
      </div>
    )
  }

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height, width: '100%' }}
    >
      {/* Base map layer */}
      <TileLayer
        url={BASE_TILE_URL}
        attribution={BASE_ATTRIBUTION}
        maxZoom={19}
      />

      {/* Weather overlay layer */}
      <TileLayer
        url={getWeatherTileUrl(layer, apiKey)}
        attribution="&copy; OpenWeather"
        opacity={opacity}
        maxZoom={19}
      />

      {/* Location marker */}
      {markerPosition && (
        <Marker position={markerPosition} icon={markerIcon} />
      )}
    </MapContainer>
  )
}
