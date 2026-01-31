export function getWeatherIconUrl(iconCode: string, size: '2x' | '4x' = '2x') {
  return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`
}

export function formatTemperature(temp: number): string {
  return `${Math.round(temp)}°`
}

export function getWeatherDescription(code: number): string {
  if (code >= 200 && code < 300) return '뇌우'
  if (code >= 300 && code < 400) return '이슬비'
  if (code >= 500 && code < 600) return '비'
  if (code >= 600 && code < 700) return '눈'
  if (code >= 700 && code < 800) return '안개'
  if (code === 800) return '맑음'
  if (code > 800) return '흐림'
  return '알 수 없음'
}
