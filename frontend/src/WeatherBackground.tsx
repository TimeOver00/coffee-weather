import { useMemo } from 'react'
import { motion } from 'framer-motion'
import type { WeatherCategory } from './weatherTheme'

interface Props {
  category: WeatherCategory
}

function useRandomized<T>(count: number, factory: () => T, key: unknown): T[] {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => Array.from({ length: count }, factory), [count, key])
}

export default function WeatherBackground({ category }: Props) {
  const drops = useRandomized(
    category === 'rain' || category === 'thunderstorm' ? 45 : 0,
    () => ({
      left: Math.random() * 100,
      duration: 0.6 + Math.random() * 0.5,
      delay: Math.random() * 2,
    }),
    category,
  )

  const flakes = useRandomized(
    category === 'snow' ? 35 : 0,
    () => ({
      left: Math.random() * 100,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 4,
      size: 4 + Math.random() * 4,
    }),
    category,
  )

  return (
    <div className="weather-bg" aria-hidden="true">
      {category === 'clear' && (
        <motion.div
          className="sun"
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="ray"
              style={{ transform: `rotate(${i * 30}deg) translateY(-70px)` }}
            />
          ))}
        </motion.div>
      )}

      {category === 'clouds' &&
        [0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`cloud cloud-${i}`}
            animate={{ x: ['-15%', '15%', '-15%'] }}
            transition={{ duration: 16 + i * 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

      {(category === 'rain' || category === 'thunderstorm') &&
        drops.map((drop, i) => (
          <motion.span
            key={i}
            className="raindrop"
            style={{ left: `${drop.left}%` }}
            animate={{ y: ['-10vh', '110vh'] }}
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
          animate={{ opacity: [0, 0, 0.75, 0, 0] }}
          transition={{ duration: 5, repeat: Infinity, repeatDelay: 3 }}
        />
      )}

      {category === 'snow' &&
        flakes.map((flake, i) => (
          <motion.span
            key={i}
            className="snowflake"
            style={{ left: `${flake.left}%`, width: flake.size, height: flake.size }}
            animate={{ y: ['-10vh', '110vh'], x: ['-6%', '6%', '-6%'] }}
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
                y: [-10, -70],
                opacity: [0, 0.5, 0],
                x: [0, i % 2 === 0 ? 12 : -12, 0],
              }}
              transition={{ duration: 3.5 + i, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
