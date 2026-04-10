import type { Metadata } from 'next'
import { ThemeProvider } from '@/lib/theme-provider'
import { ConfigProvider } from '@/lib/config-provider'
import { LanguageProvider } from '@/lib/language-provider'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import AdminPanel from '@/components/AdminPanel'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: {
    default: 'Mohamed Elkory | Full Stack Developer',
    template: '%s | Mohamed Elkory',
  },
  description: 'A passionate Full Stack Developer crafting exceptional digital experiences with modern web technologies. Building scalable web applications with React, Next.js, and cloud infrastructure.',
  keywords: ['developer', 'portfolio', 'full stack', 'web development', 'react', 'next.js', 'typescript', 'frontend', 'backend'],
  authors: [{ name: 'Mohamed Elkory' }],
  creator: 'Mohamed Elkory',
  publisher: 'Mohamed Elkory',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    siteName: 'Mohamed Elkory',
    title: 'Mohamed Elkory | Full Stack Developer',
    description: 'A passionate Full Stack Developer crafting exceptional digital experiences.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mohamed Elkory - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohamed Elkory | Full Stack Developer',
    description: 'A passionate Full Stack Developer crafting exceptional digital experiences.',
    images: ['/og-image.jpg'],
    creator: '@yourhandle',
  },
  alternates: {
    canonical: 'https://yourdomain.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col smooth-scroll">
        <ThemeProvider>
          <LanguageProvider>
            <ConfigProvider>
              <Navigation />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              <AdminPanel />
            </ConfigProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}