import { useState } from 'react'
import { CloudRain, Thermometer, Wind, Cloud } from 'lucide-react'

type LayerType = 'precipitation' | 'temperature' | 'wind' | 'clouds'

const LAYER_OPTIONS: { type: LayerType; label: string; icon: typeof CloudRain }[] = [
  { type: 'precipitation', label: '강수', icon: CloudRain },
  { type: 'temperature', label: '온도', icon: Thermometer },
  { type: 'wind', label: '바람', icon: Wind },
  { type: 'clouds', label: '구름', icon: Cloud },
]

/**
 * 레이더 맵 섹션
 * - 지도 + 날씨 레이어
 * - REAL-21에서 실제 지도 구현 예정
 */
export function RadarMapSection() {
  const [activeLayer, setActiveLayer] = useState<LayerType>('precipitation')

  return (
    <section className="mx-4 mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">레이더 맵</h3>

      {/* 지도 영역 */}
      <div className="h-64 bg-gray-100 rounded-t-xl flex items-center justify-center text-gray-400 text-sm">
        지도 + 날씨 레이어 (REAL-21에서 구현 예정)
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
