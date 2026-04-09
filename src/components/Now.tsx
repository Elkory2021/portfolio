'use client'

import { motion } from 'framer-motion'
import { BookOpen, Target, Lightbulb } from 'lucide-react'
import { useConfig } from '@/lib/config-provider'

export default function Now() {
  const { config } = useConfig()

  const nowItems = [
    {
      icon: BookOpen,
      title: 'Currently Learning',
      description: config.now.learning,
    },
    {
      icon: Target,
      title: 'Focus',
      description: config.now.focus,
    },
    {
      icon: Lightbulb,
      title: 'Exploring',
      description: config.now.exploring,
    },
  ]

  return (
    <section className="py-24 px-6 bg-gray-50 dark:bg-surface-dark/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Now</h2>
          <div className="w-20 h-1 bg-accent rounded-full" />
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl">
            Inspired by the &quot;Now&quot; page concept. These are the things I&apos;m focused on right now.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {nowItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-surface-dark p-8 rounded-xl border border-gray-200 dark:border-gray-800 card-hover"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}