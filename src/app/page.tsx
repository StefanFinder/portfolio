import StarfieldBackground from '@/components/StarfieldBackground'
import Navbar from '@/components/Navbar'
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Skills from '@/sections/Skills'
import Projects from '@/sections/Projects'
import Experience from '@/sections/Experience'
import Resume from '@/sections/Resume'
import Contact from '@/sections/Contact'

export default function Home() {
  return (
    <>
      <StarfieldBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <div className="section-divider mx-8" />
        <About />
        <div className="section-divider mx-8" />
        <Skills />
        <div className="section-divider mx-8" />
        <Projects />
        <div className="section-divider mx-8" />
        <Experience />
        <div className="section-divider mx-8" />
        <Resume />
        <div className="section-divider mx-8" />
        <Contact />
      </main>
    </>
  )
}
