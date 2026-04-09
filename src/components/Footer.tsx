'use client'

import { Github, Linkedin, Twitter, ArrowUp } from 'lucide-react'
import { useConfig } from '@/lib/config-provider'

export default function Footer() {
  const { config } = useConfig()
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: config.github, label: 'GitHub' },
    { icon: Linkedin, href: config.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: config.twitter, label: 'Twitter' },
  ]

  return (
    <footer className="py-12 px-6 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {currentYear} {config.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <a
            href="#"
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
          >
            Back to top
            <ArrowUp className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}