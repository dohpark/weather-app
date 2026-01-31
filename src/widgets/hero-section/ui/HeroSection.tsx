interface HeroSectionProps {
  locationName?: string
  temperature?: number
  minTemp?: number
  maxTemp?: number
  isLoading?: boolean
}

/**
 * 히어로 섹션 (현재 날씨 + 시간대별 기온)
 * - 3D 배경은 추후 REAL-22~25에서 구현
 * - 시간대별 기온은 추후 REAL-13에서 구현
 */
export function HeroSection({
  locationName = '위치 불명',
  temperature,
  minTemp,
  maxTemp,
  isLoading,
}: HeroSectionProps) {
  if (isLoading) {
    return (
      <section className="flex flex-col items-center justify-center min-h-[300px] bg-gradient-to-b from-blue-400 to-blue-600 text-white rounded-2xl mx-4">
        <div className="animate-pulse">
          <div className="h-6 w-32 bg-white/30 rounded mb-4" />
          <div className="h-16 w-24 bg-white/30 rounded mb-2" />
          <div className="h-4 w-40 bg-white/30 rounded" />
        </div>
      </section>
    )
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-[300px] bg-gradient-to-b from-blue-400 to-blue-600 text-white rounded-2xl mx-4 py-8">
      <h2 className="text-xl font-medium mb-2">{locationName}</h2>
      <p className="text-7xl font-light mb-2">
        {temperature !== undefined ? `${Math.round(temperature)}°` : '--°'}
      </p>
      <p className="text-sm opacity-80">
        {minTemp !== undefined && maxTemp !== undefined
          ? `최저 ${Math.round(minTemp)}° / 최고 ${Math.round(maxTemp)}°`
          : '-- / --'}
      </p>

      {/* 시간대별 기온 - REAL-13에서 구현 */}
      <div className="mt-6 text-sm opacity-60">시간대별 기온 (추후 구현)</div>
    </section>
  )
}
