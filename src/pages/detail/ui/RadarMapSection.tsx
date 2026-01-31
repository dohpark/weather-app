import { useState } from 'react'
import { CloudRain, Thermometer, Wind, Cloud } from 'lucide-react'
import { WeatherRadarMap, type WeatherLayerType } from '@/shared/ui'

type LayerType = 'precipitation' | 'temperature' | 'wind' | 'clouds'

const LAYER_OPTIONS: { type: LayerType; label: string; icon: typeof CloudRain }[] = [
  { type: 'precipitation', label: '강수', icon: CloudRain },
  { type: 'temperature', label: '온도', icon: Thermometer },
  { type: 'wind', label: '바람', icon: Wind },
  { type: 'clouds', label: '구름', icon: Cloud },
]

// UI 레이어 타입 → OpenWeather 레이어 타입 매핑
const LAYER_MAP: Record<LayerType, WeatherLayerType> = {
  precipitation: 'precipitation_new',
  temperature: 'temp_new',
  wind: 'wind_new',
  clouds: 'clouds_new',
}

interface RadarMapSectionProps {
  /** 마커 표시할 좌표 */
  coordinates?: { lat: number; lon: number } | null
}

/**
 * 레이더 맵 섹션
 * - 지도 + 날씨 레이어
 */
export function RadarMapSection({ coordinates }: RadarMapSectionProps) {
  const [activeLayer, setActiveLayer] = useState<LayerType>('precipitation')

  const markerPosition: [number, number] | undefined = coordinates
    ? [coordinates.lat, coordinates.lon]
    : undefined

  return (
    <section className="mx-4 mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">레이더 맵</h3>

      {/* 지도 영역 */}
      <div className="rounded-t-xl overflow-hidden">
        <WeatherRadarMap
          layer={LAYER_MAP[activeLayer]}
          opacity={0.6}
          height={256}
          center={markerPosition}
          zoom={coordinates ? 10 : 7}
          markerPosition={markerPosition}
        />
      </div>

      {/* 레이어 선택 버튼 */}
      <div className="flex bg-gray-50 rounded-b-xl p-2 gap-2">
        {LAYER_OPTIONS.map(({ type, label, icon: Icon }) => (
          <button
            key={type}
            type="button"
            onClick={() => setActiveLayer(type)}
            className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-sm transition-colors ${
              activeLayer === type
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
