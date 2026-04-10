import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Blog from '@/components/Blog'
import MediaGallery from '@/components/MediaGallery'
import Now from '@/components/Now'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Blog />
      <MediaGallery />
      <Now />
      <Contact />
    </>
  )
}