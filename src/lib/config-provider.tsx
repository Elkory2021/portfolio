'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  github?: string
  liveDemo?: string
  gradient: string
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  content: string
}

export interface ProfileConfig {
  name: string
  title: string
  tagline: string
  email: string
  github: string
  linkedin: string
  twitter: string
  about: {
    story: string[]
    skills: string[]
    experience: { year: string; title: string; company: string }[]
  }
  now: {
    learning: string
    focus: string
    exploring: string
  }
  background: {
    image: string
    blur: number
    opacity: number
  }
  projects: Project[]
  blogPosts: BlogPost[]
}

const defaultConfig: ProfileConfig = {
  name: "Mohamed Elkory",
  title: "Full Stack Developer",
  tagline: "A passionate Full Stack Developer crafting exceptional digital experiences",
  email: "hello@example.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  about: {
    story: [
      "I'm a passionate Full Stack Developer with a keen eye for design and a commitment to building exceptional digital experiences.",
      "I specialize in modern web technologies, with a focus on React, Next.js, and cloud infrastructure.",
      "When I'm not coding, you'll find me exploring new frameworks or contributing to open-source projects."
    ],
    skills: ["JavaScript/TypeScript", "React/Next.js", "Node.js", "Python", "PostgreSQL", "MongoDB", "Tailwind CSS", "AWS"],
    experience: [
      { year: "2024", title: "Senior Developer", company: "Tech Corp" },
      { year: "2022", title: "Full Stack Developer", company: "Startup Inc" },
      { year: "2020", title: "Frontend Developer", company: "Web Agency" }
    ]
  },
  now: {
    learning: "Deepening my knowledge of server components and advanced Next.js patterns",
    focus: "Building scalable applications and improving system design skills",
    exploring: "AI/ML integration in web applications and edge computing"
  },
  background: {
    image: "/background.jpg",
    blur: 3,
    opacity: 0.1
  },
  projects: [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'A full-featured online shopping platform with cart functionality, user authentication, and payment integration.',
      techStack: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
      github: 'https://github.com',
      liveDemo: 'https://example.com',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates and team workspaces.',
      techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      github: 'https://github.com',
      liveDemo: 'https://example.com',
      gradient: 'from-purple-500 to-pink-500'
    }
  ],
  blogPosts: [
    {
      slug: 'mastering-typescript-generics',
      title: 'Mastering TypeScript Generics: A Deep Dive',
      date: '2024-03-15',
      excerpt: 'Learn how to write more flexible and reusable code using TypeScript generics.',
      category: 'TypeScript',
      content: '## Introduction\n\nTypeScript generics are powerful...'
    }
  ]
}

interface ConfigContextType {
  config: ProfileConfig
  updateConfig: (updates: Partial<ProfileConfig>) => void
  updateProjects: (projects: Project[]) => void
  updateBlogPosts: (posts: BlogPost[]) => void
  resetConfig: () => void
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined)

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<ProfileConfig>(defaultConfig)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-config')
    if (saved) {
      const parsed = JSON.parse(saved)
      setConfig({ ...defaultConfig, ...parsed })
    }
    setLoaded(true)
  }, [])

  const updateConfig = (updates: Partial<ProfileConfig>) => {
    const newConfig = { ...config, ...updates }
    setConfig(newConfig)
    localStorage.setItem('portfolio-config', JSON.stringify(newConfig))
  }

  const updateProjects = (projects: Project[]) => {
    updateConfig({ projects })
  }

  const updateBlogPosts = (posts: BlogPost[]) => {
    updateConfig({ blogPosts: posts })
  }

  const resetConfig = () => {
    setConfig(defaultConfig)
    localStorage.removeItem('portfolio-config')
    localStorage.removeItem('profile-position')
  }

  if (!loaded) return null

  return (
    <ConfigContext.Provider value={{ config, updateConfig, updateProjects, updateBlogPosts, resetConfig }}>
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfig() {
  const context = useContext(ConfigContext)
  if (!context) {
    throw new Error('useConfig must be used within ConfigProvider')
  }
  return context
}