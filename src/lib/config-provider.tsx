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
  taglineAr?: string
  email: string
  github: string
  linkedin: string
  twitter: string
  adminPassword: string
  language: 'en' | 'ar'
  about: {
    story: string[]
    storyAr?: string[]
    skills: string[]
    experience: { year: string; title: string; titleAr?: string; company: string; companyAr?: string }[]
  }
  now: {
    learning: string
    learningAr?: string
    focus: string
    focusAr?: string
    exploring: string
    exploringAr?: string
  }
  background: {
    image: string
    blur: number
    opacity: number
  }
  projects: Project[]
  blogPosts: BlogPost[]
  media: { type: 'image' | 'video' | 'audio'; url: string; title: string }[]
}

const defaultConfig: ProfileConfig = {
  name: "Mohamed Elkory",
  title: "Full Stack Developer",
  tagline: "A passionate Full Stack Developer crafting exceptional digital experiences",
  taglineAr: "مطورfull stack شغوف يبني تجارب رقمية استثنائية",
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
    storyAr: [
      "أنا مطورFull Stack شغوف بتصميم وبناء تجارب رقمية استثنائية.",
      "أتخصص في تقنيات الويب الحديثة، مع التركيز علىReact وNext.js والبنية السحابية.",
      "عندما لا أبرمج، ستجدني أستكشف أُطرعمل جديدة أو أساهم في مشاريع مفتوحة المصدر."
    ],
    skills: ["JavaScript/TypeScript", "React/Next.js", "Node.js", "Python", "PostgreSQL", "MongoDB", "Tailwind CSS", "AWS"],
    experience: [
      { year: "2024", title: "Senior Developer", titleAr: "مطور أول", company: "Tech Corp", companyAr: "تك كورب" },
      { year: "2022", title: "Full Stack Developer", titleAr: "مطورFull Stack", company: "Startup Inc", companyAr: "ستارت اب" },
      { year: "2020", title: "Frontend Developer", titleAr: "مطور واجهات", company: "Web Agency", companyAr: "وكالة ويب" }
    ]
  },
  now: {
    learning: "Deepening my knowledge of server components and advanced Next.js patterns",
    learningAr: "تعميق معرفتي بمكونات الخادم وأنماطNext.js المتقدمة",
    focus: "Building scalable applications and improving system design skills",
    focusAr: "بناء تطبيقات قابلة للتطوير وتحسين مهاراتDiseño النظام",
    exploring: "AI/ML integration in web applications and edge computing",
    exploringAr: "استكشاف تكاملالذكاء الاصطناعي في تطبيقات الويب والحوسبة الطرفية"
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
  ],
  adminPassword: '',
  language: 'en',
  media: []
}

export interface MediaItem {
  type: 'image' | 'video' | 'audio'
  url: string
  title: string
}

interface ConfigContextType {
  config: ProfileConfig
  updateConfig: (updates: Partial<ProfileConfig>) => void
  updateProjects: (projects: Project[]) => void
  updateBlogPosts: (posts: BlogPost[]) => void
  updateMedia: (media: MediaItem[]) => void
  resetConfig: () => void
  isAuthenticated: boolean
  authenticate: (password: string) => boolean
  logout: () => void
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined)

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<ProfileConfig>(defaultConfig)
  const [loaded, setLoaded] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-config')
    if (saved) {
      const parsed = JSON.parse(saved)
      setConfig({ ...defaultConfig, ...parsed })
    }
    // Check if already authenticated in this session
    const auth = sessionStorage.getItem('portfolio-auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
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

  const updateMedia = (media: MediaItem[]) => {
    updateConfig({ media })
  }

  const resetConfig = () => {
    setConfig(defaultConfig)
    localStorage.removeItem('portfolio-config')
    localStorage.removeItem('profile-position')
    setIsAuthenticated(false)
    sessionStorage.removeItem('portfolio-auth')
  }

  const authenticate = (password: string): boolean => {
    // Check against stored password or empty (not set yet)
    const storedPassword = config.adminPassword || localStorage.getItem('portfolio-admin-password')
    if (!storedPassword || password === storedPassword) {
      setIsAuthenticated(true)
      sessionStorage.setItem('portfolio-auth', 'true')
      if (!config.adminPassword && password) {
        localStorage.setItem('portfolio-admin-password', password)
        updateConfig({ adminPassword: password })
      }
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('portfolio-auth')
  }

  if (!loaded) return null

  return (
    <ConfigContext.Provider value={{ 
      config, 
      updateConfig, 
      updateProjects, 
      updateBlogPosts,
      updateMedia,
      resetConfig,
      isAuthenticated,
      authenticate,
      logout
    }}>
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