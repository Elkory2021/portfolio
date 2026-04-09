'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  background?: 'none' | 'light' | 'dark'
}

export default function Section({ 
  id, 
  children, 
  className = '', 
  background = 'none' 
}: SectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const backgroundStyles = {
    none: '',
    light: 'bg-gray-50 dark:bg-surface-dark/30',
    dark: 'bg-gray-900 dark:bg-black',
  }

  return (
    <section
      id={id}
      ref={ref}
      className={`py-24 px-6 ${backgroundStyles[background]} ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    </section>
  )
}