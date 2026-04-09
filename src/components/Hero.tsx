'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Settings } from 'lucide-react'
import Image from 'next/image'
import { useConfig } from '@/lib/config-provider'

export default function Hero() {
  const { config } = useConfig()
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [showControls, setShowControls] = useState(false)

  useEffect(() => {
    const savedPosition = localStorage.getItem('profile-position')
    const savedBg = localStorage.getItem('background-settings')
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition))
    }
  }, [])

  const updatePosition = (axis: 'x' | 'y', change: number) => {
    setPosition(prev => {
      const newPos = {
        ...prev,
        [axis]: Math.max(0, Math.min(100, prev[axis] + change))
      }
      localStorage.setItem('profile-position', JSON.stringify(newPos))
      return newPos
    })
  }

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black" />
        {config.background.image && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${config.background.image})`,
              opacity: config.background.opacity,
              filter: `blur(${config.background.blur}px)`
            }}
          />
        )}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row items-center gap-12 max-w-5xl"
      >
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent to-purple-500 p-1">
            <div className="w-full h-full rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800">
              <Image
                src="/profile.jpg"
                alt={config.name}
                fill
                className="object-cover"
                style={{
                  objectPosition: `${position.x}% ${position.y}%`
                }}
                priority
              />
            </div>
          </div>
          <div className="absolute -inset-4 rounded-full bg-accent/20 blur-2xl -z-10" />
          
          <button
            onClick={() => setShowControls(!showControls)}
            className="absolute -bottom-2 -right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform"
            aria-label="Adjust image position"
          >
            <Settings className="w-4 h-4" />
          </button>
          
          {showControls && (
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xl flex flex-col gap-2 z-10">
              <div className="flex items-center gap-2">
                <span className="text-xs w-6">X:</span>
                <button onClick={() => updatePosition('x', -5)} className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200">←</button>
                <span className="text-xs w-8 text-center">{position.x}%</span>
                <button onClick={() => updatePosition('x', 5)} className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200">→</button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs w-6">Y:</span>
                <button onClick={() => updatePosition('y', -5)} className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200">↑</button>
                <span className="text-xs w-8 text-center">{position.y}%</span>
                <button onClick={() => updatePosition('y', 5)} className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200">↓</button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Text Content */}
        <div className="text-center md:text-left">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm font-medium text-accent mb-4 tracking-wider uppercase"
          >
            Hello, I&apos;m
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight"
          >
            {config.name}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-xl"
          >
            {config.tagline.includes('Full Stack Developer') ? (
              <>A passionate <span className="text-accent font-medium">{config.title}</span> {config.tagline.replace('A passionate Full Stack Developer', '').replace('A passionate', '')}</>
            ) : (
              config.tagline
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap justify-center md:justify-start gap-4"
          >
            <a
              href="#work"
              className="px-8 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-all hover:scale-105"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border-2 border-gray-300 dark:border-gray-700 hover:border-accent hover:text-accent font-medium rounded-lg transition-all"
            >
              Contact Me
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-gray-500 hover:text-accent transition-colors"
        >
          <span className="text-xs tracking-wider uppercase">Scroll</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  )
}