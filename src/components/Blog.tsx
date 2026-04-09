'use client'

import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import { useConfig } from '@/lib/config-provider'

export default function Blog() {
  const { config } = useConfig()

  return (
    <section id="blog" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Blog</h2>
          <div className="w-20 h-1 bg-accent rounded-full" />
        </motion.div>

        <div className="space-y-8">
          {config.blogPosts?.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white dark:bg-surface-dark rounded-xl p-8 border border-gray-200 dark:border-gray-800 card-hover"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                  {post.category}
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>

              <h3 className="text-2xl font-serif font-semibold mb-3 group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {post.excerpt}
              </p>

              <button className="flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all">
                Read More
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}