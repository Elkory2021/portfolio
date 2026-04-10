'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Language = 'en' | 'ar'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (en: string, ar: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children, initialLang = 'en' }: { children: ReactNode; initialLang?: Language }) {
  const [language, setLanguage] = useState<Language>(initialLang)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-language') as Language
    if (saved) {
      setLanguage(saved)
    }
    setLoaded(true)
  }, [])

  const updateLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('portfolio-language', lang)
  }

  const t = (en: string, ar: string): string => {
    return language === 'ar' ? ar : en
  }

  if (!loaded) return null

  return (
    <LanguageContext.Provider value={{ language, setLanguage: updateLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    return { language: 'en' as Language, setLanguage: () => {}, t: (en: string) => en }
  }
  return context
}