import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AuroraBackground from './AuroraBackground'
import WeatherBackground from './WeatherBackground'
import AnimatedNumber from './AnimatedNumber'
import { getWeatherCategory, getTheme } from './weatherTheme'
import './App.css'

const API_URL = 'http://localhost:8000'

interface WeatherResult {
  city: string
  country: string
  temp: number
  feels_like: number
  condition: string
  description: string
  wind_speed: number
  is_day: boolean
  good_day: boolean
  reasons: string[]
}

function App() {
  const [city, setCity] = useState('')
  const [result, setResult] = useState<WeatherResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const category = getWeatherCategory(result?.condition ?? null)
  const isDay = result?.is_day ?? true
  const theme = getTheme(category, isDay)

  async function checkWeather() {
    if (!city.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `${API_URL}/weather?city=${encodeURIComponent(city)}`,
      )
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail ?? 'Erreur inconnue')
      }

      setResult(data as WeatherResult)
    } catch (err) {
      setResult(null)
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    checkWeather()
  }

  return (
    <div className="page">
      <AuroraBackground theme={theme} />
      <WeatherBackground category={category} isDay={isDay} />

      <main className="container">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          ☕ Coffee Weather
        </motion.h1>
        <motion.p
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Est-ce un bon jour pour un café en terrasse ?
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="search-form"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Entre une ville (ex: Montreal)"
          />
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
          >
            {loading ? (
              <motion.span
                className="spinner"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              />
            ) : (
              'Vérifier'
            )}
          </motion.button>
        </motion.form>

        <AnimatePresence>
          {error && (
            <motion.p
              className="error"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {result && (
            <motion.section
              key={`${result.city}-${result.temp}`}
              className={`result ${result.good_day ? 'good' : 'bad'}`}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <h2>
                {result.city}, {result.country}
              </h2>
              <motion.p
                className="verdict"
                initial={{ scale: 0.7, rotate: -4 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }}
              >
                {result.good_day ? '✅ Oui, sors ton café !' : "❌ Reste au chaud à l'intérieur."}
              </motion.p>
              <div className="temp-row">
                <span className="temp-big">
                  <AnimatedNumber value={result.temp} />°C
                </span>
                <span className="temp-feel">
                  ressenti <AnimatedNumber value={result.feels_like} />°C
                </span>
              </div>
              <ul className="details">
                <li>Conditions : {result.description}</li>
                <li>Vent : {result.wind_speed.toFixed(1)} m/s</li>
              </ul>
              <ul className="reasons">
                {result.reasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
              <motion.button
                type="button"
                onClick={checkWeather}
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
              >
                Rafraîchir
              </motion.button>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
