'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Twitter, Send } from 'lucide-react'
import { useConfig } from '@/lib/config-provider'

export default function Contact() {
  const { config } = useConfig()

  const socialLinks = [
    { icon: Github, href: config.github, label: 'GitHub' },
    { icon: Linkedin, href: config.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: config.twitter, label: 'Twitter' },
  ]

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Get in Touch</h2>
          <div className="w-20 h-1 bg-accent rounded-full mx-auto mb-6" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-surface-dark rounded-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Mail className="w-5 h-5 text-accent" />
            <a
              href={`mailto:${config.email}`}
              className="text-lg hover:text-accent transition-colors"
            >
              {config.email}
            </a>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-accent hover:text-white rounded-lg transition-all font-medium"
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </a>
            ))}
          </div>

          <form className="space-y-4 max-w-lg mx-auto">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-accent focus:outline-none transition-colors"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-accent focus:outline-none transition-colors"
              />
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-accent focus:outline-none transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-all hover:scale-[1.02]"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}