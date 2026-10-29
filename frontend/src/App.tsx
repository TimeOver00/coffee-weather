import { useState } from 'react'
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
  good_day: boolean
  reasons: string[]
}

function App() {
  const [city, setCity] = useState('')
  const [result, setResult] = useState<WeatherResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
    <main className="container">
      <h1>☕ Coffee Weather</h1>
      <p className="subtitle">Est-ce un bon jour pour un café en terrasse ?</p>

      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Entre une ville (ex: Montreal)"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Vérification...' : 'Vérifier'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <section className={`result ${result.good_day ? 'good' : 'bad'}`}>
          <h2>
            {result.city}, {result.country}
          </h2>
          <p className="verdict">
            {result.good_day ? '✅ Oui, sors ton café !' : '❌ Reste au chaud à l\'intérieur.'}
          </p>
          <ul className="details">
            <li>Température : {result.temp.toFixed(1)}°C (ressenti {result.feels_like.toFixed(1)}°C)</li>
            <li>Conditions : {result.description}</li>
            <li>Vent : {result.wind_speed.toFixed(1)} m/s</li>
          </ul>
          <ul className="reasons">
            {result.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
          <button type="button" onClick={checkWeather} disabled={loading}>
            Rafraîchir
          </button>
        </section>
      )}
    </main>
  )
}

export default App
