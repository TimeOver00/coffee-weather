import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

interface Props {
  value: number
  decimals?: number
}

export default function AnimatedNumber({ value, decimals = 1 }: Props) {
  const motionValue = useMotionValue(value)
  const rounded = useTransform(motionValue, (v) => v.toFixed(decimals))

  useEffect(() => {
    const controls = animate(motionValue, value, { duration: 0.8, ease: 'easeOut' })
    return controls.stop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <motion.span>{rounded}</motion.span>
}
