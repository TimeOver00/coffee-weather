export type WeatherCategory = 'idle' | 'clear' | 'clouds' | 'rain' | 'snow' | 'thunderstorm'

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

export const THEME_GRADIENTS: Record<WeatherCategory, string> = {
  idle: 'linear-gradient(135deg, #3b2a20, #1a1310)',
  clear: 'linear-gradient(135deg, #ff9a56, #ff6a3d)',
  clouds: 'linear-gradient(135deg, #64748b, #94a3b8)',
  rain: 'linear-gradient(135deg, #263445, #3e5266)',
  snow: 'linear-gradient(135deg, #9fb8cc, #dde8f0)',
  thunderstorm: 'linear-gradient(135deg, #1f2124, #3a3d42)',
}
