export type WeatherCategory = 'idle' | 'clear' | 'clouds' | 'rain' | 'snow' | 'thunderstorm'

export interface WeatherTheme {
  key: string
  base: string
  blobs: [string, string, string]
}

export function getWeatherCategory(condition: string | null): WeatherCategory {
  switch (condition) {
    case 'Clear':
      return 'clear'
    case 'Clouds':
      return 'clouds'
    case 'Rain':
    case 'Drizzle':
      return 'rain'
    case 'Snow':
      return 'snow'
    case 'Thunderstorm':
      return 'thunderstorm'
    case null:
      return 'idle'
    default:
      return 'clouds'
  }
}

const THEMES: Record<string, WeatherTheme> = {
  idle: { key: 'idle', base: '#160f0a', blobs: ['#6b4530', '#3c2616', '#8a5a3b'] },
  'clear-day': { key: 'clear-day', base: '#1c1308', blobs: ['#ff8c42', '#ffd27a', '#ff5e3a'] },
  'clear-night': { key: 'clear-night', base: '#060814', blobs: ['#2a2a6b', '#4b2e83', '#101633'] },
  'clouds-day': { key: 'clouds-day', base: '#232a35', blobs: ['#8a94a6', '#5b6579', '#aeb8c4'] },
  'clouds-night': { key: 'clouds-night', base: '#0e1118', blobs: ['#2f3b52', '#1a2230', '#404f66'] },
  'rain-day': { key: 'rain-day', base: '#101a22', blobs: ['#2f4a5e', '#1b2b38', '#3e6278'] },
  'rain-night': { key: 'rain-night', base: '#070d12', blobs: ['#16242f', '#0b141b', '#233a49'] },
  'snow-day': { key: 'snow-day', base: '#1a2430', blobs: ['#9fb8cc', '#5c7389', '#dde8f0'] },
  'snow-night': { key: 'snow-night', base: '#0d141c', blobs: ['#2c3e52', '#17222e', '#3c5068'] },
  'thunderstorm-day': { key: 'thunderstorm-day', base: '#15161a', blobs: ['#3a3d42', '#55585e', '#4b3a6b'] },
  'thunderstorm-night': { key: 'thunderstorm-night', base: '#0a0a0d', blobs: ['#232429', '#1a1a1f', '#352a52'] },
}

export function getTheme(category: WeatherCategory, isDay: boolean): WeatherTheme {
  if (category === 'idle') return THEMES.idle
  return THEMES[`${category}-${isDay ? 'day' : 'night'}`]
}
