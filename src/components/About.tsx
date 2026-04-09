'use client'

import { motion } from 'framer-motion'
import { Code2, Database, Palette, Zap } from 'lucide-react'
import { useConfig } from '@/lib/config-provider'

const getSkillIcon = (skill: string) => {
  const icons: Record<string, typeof Code2> = {
    'JavaScript/TypeScript': Code2,
    'React/Next.js': Code2,
    'Node.js': Code2,
    'Python': Code2,
    'PostgreSQL': Database,
    'MongoDB': Database,
    'Tailwind CSS': Palette,
    'AWS': Zap,
  }
  return icons[skill] || Code2
}

export default function About() {
  const { config } = useConfig()

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-accent rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-serif font-semibold mb-4">My Story</h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              {config.about.story.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-12">
              <h4 className="text-lg font-semibold mb-6">Experience</h4>
              <div className="space-y-6">
                {config.about.experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-accent rounded-full" />
                      <div className="w-px h-full bg-gray-200 dark:bg-gray-800" />
                    </div>
                    <div>
                      <span className="text-sm text-accent font-medium">{exp.year}</span>
                      <p className="font-medium">{exp.title}</p>
                      <p className="text-sm text-gray-500">{exp.company}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-serif font-semibold mb-6">Skills & Tools</h3>
            <div className="grid grid-cols-2 gap-4">
              {config.about.skills.map((skill, index) => {
                const Icon = getSkillIcon(skill)
                return (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center gap-3 p-4 bg-white dark:bg-surface-dark rounded-lg border border-gray-200 dark:border-gray-800 card-hover"
                  >
                    <Icon className="w-5 h-5 text-accent" />
                    <span className="font-medium">{skill}</span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}