'use client'

import { motion } from 'framer-motion'
import { Play, Image, Music } from 'lucide-react'
import { useConfig } from '@/lib/config-provider'

export default function MediaGallery() {
  const { config } = useConfig()
  const media = config.media || []

  if (media.length === 0) return null

  return (
    <section id="media" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">الميديا</h2>
          <div className="w-20 h-1 bg-accent rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {media.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-surface-dark rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800"
            >
              {item.type === 'video' && (
                <div className="relative h-48 bg-black">
                  <video controls className="w-full h-full object-contain">
                    <source src={item.url} />
                  </video>
                </div>
              )}
              {item.type === 'audio' && (
                <div className="p-6 bg-gradient-to-br from-purple-500 to-pink-500">
                  <div className="flex items-center justify-center h-24">
                    <Music className="w-12 h-12 text-white" />
                  </div>
                  <audio controls className="w-full mt-2">
                    <source src={item.url} />
                  </audio>
                </div>
              )}
              {item.type === 'image' && (
                <div className="h-48 bg-gray-200 dark:bg-gray-800">
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-center gap-2">
                  {item.type === 'video' && <Play className="w-4 h-4 text-red-500" />}
                  {item.type === 'audio' && <Music className="w-4 h-4 text-purple-500" />}
                  {item.type === 'image' && <Image className="w-4 h-4 text-green-500" />}
                  <span className="font-medium">{item.title}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}