import { AnimatePresence, motion } from 'framer-motion'
import type { WeatherTheme } from './weatherTheme'

interface Props {
  theme: WeatherTheme
}

export default function AuroraBackground({ theme }: Props) {
  return (
    <div className="aurora-bg" aria-hidden="true">
      <AnimatePresence mode="sync">
        <motion.div
          key={theme.key}
          className="aurora-base"
          style={{ background: theme.base }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1 }}
        >
          {theme.blobs.map((color, i) => (
            <motion.div
              key={i}
              className={`aurora-blob blob-${i}`}
              style={{ background: color }}
              animate={{
                x: [0, 40, -30, 10, 0],
                y: [0, -30, 20, -10, 0],
                scale: [1, 1.15, 0.95, 1.05, 1],
              }}
              transition={{
                duration: 20 + i * 7,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>
      </AnimatePresence>
      <div className="noise-overlay" />
    </div>
  )
}
