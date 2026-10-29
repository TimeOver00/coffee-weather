import { useMemo } from 'react'
import { motion } from 'framer-motion'
import type { WeatherCategory } from './weatherTheme'

interface Props {
  category: WeatherCategory
  isDay: boolean
}

function useRandomized<T>(count: number, factory: () => T, key: unknown): T[] {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => Array.from({ length: count }, factory), [count, key])
}

export default function WeatherBackground({ category, isDay }: Props) {
  const sceneKey = `${category}-${isDay}`
  const showSun = category === 'clear' && isDay
  const showMoon = category === 'clear' && !isDay
  const showStars = !isDay && category !== 'idle'

  const stars = useRandomized(
    showStars ? 60 : 0,
    () => ({
      left: Math.random() * 100,
      top: Math.random() * 55,
      size: 1 + Math.random() * 2,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3,
    }),
    sceneKey,
  )

  const drops = useRandomized(
    category === 'rain' || category === 'thunderstorm' ? 55 : 0,
    () => ({
      left: Math.random() * 100,
      duration: 0.55 + Math.random() * 0.45,
      delay: Math.random() * 2,
      drift: (Math.random() - 0.5) * 20,
    }),
    category,
  )

  const flakes = useRandomized(
    category === 'snow' ? 40 : 0,
    () => ({
      left: Math.random() * 100,
      duration: 6 + Math.random() * 5,
      delay: Math.random() * 5,
      size: 3 + Math.random() * 5,
    }),
    category,
  )

  return (
    <div className="weather-bg" aria-hidden="true">
      {showStars &&
        stars.map((star, i) => (
          <motion.span
            key={i}
            className="star"
            style={{ left: `${star.left}%`, top: `${star.top}%`, width: star.size, height: star.size }}
            animate={{ opacity: [0.15, 1, 0.15] }}
            transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

      {showSun && (
        <motion.div
          className="sun"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="sun-rays"
            animate={{ rotate: 360 }}
            transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
          >
            {Array.from({ length: 16 }).map((_, i) => (
              <span
                key={i}
                className="ray"
                style={{ transform: `rotate(${i * 22.5}deg) translateY(-88px)` }}
              />
            ))}
          </motion.div>
          <div className="sun-core" />
        </motion.div>
      )}

      {showMoon && (
        <motion.div
          className="moon"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="moon-crater moon-crater-0" />
          <div className="moon-crater moon-crater-1" />
          <div className="moon-crater moon-crater-2" />
        </motion.div>
      )}

      {category === 'clouds' &&
        [0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className={`cloud cloud-${i}`}
            animate={{ x: ['-22%', '22%', '-22%'] }}
            transition={{ duration: 22 + i * 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

      {(category === 'rain' || category === 'thunderstorm') &&
        drops.map((drop, i) => (
          <motion.span
            key={i}
            className="raindrop"
            style={{ left: `${drop.left}%` }}
            animate={{ y: ['-10vh', '110vh'], x: [0, drop.drift] }}
            transition={{
              duration: drop.duration,
              delay: drop.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}

      {category === 'thunderstorm' && (
        <motion.div
          className="flash"
          animate={{ opacity: [0, 0, 0.8, 0.1, 0.55, 0, 0] }}
          transition={{ duration: 6, repeat: Infinity, repeatDelay: 2.5 }}
        />
      )}

      {category === 'snow' &&
        flakes.map((flake, i) => (
          <motion.span
            key={i}
            className="snowflake"
            style={{ left: `${flake.left}%`, width: flake.size, height: flake.size }}
            animate={{ y: ['-10vh', '110vh'], x: ['-8%', '8%', '-4%', '8%', '-8%'] }}
            transition={{
              duration: flake.duration,
              delay: flake.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}

      {category === 'idle' && (
        <div className="idle-steam">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className={`steam steam-${i}`}
              animate={{
                y: [-10, -80],
                opacity: [0, 0.5, 0],
                x: [0, i % 2 === 0 ? 14 : -14, 0],
              }}
              transition={{ duration: 3.5 + i, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
