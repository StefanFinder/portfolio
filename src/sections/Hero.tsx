'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import aboutData from '@/data/about.json'

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-6 max-w-2xl"
      >
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-accent-blue/50 shadow-lg shadow-accent-blue/20">
          <Image
            src="/assets/profile.svg"
            alt="Profile photo of Stefan (Qiwei) Chen"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-2">
            {aboutData.name}
          </h1>
          <p className="text-xl text-accent-blue font-medium">{aboutData.title}</p>
        </div>

        <p className="text-text-muted text-base leading-relaxed max-w-xl">
          {aboutData.bio}
        </p>

        <div className="flex flex-wrap gap-4 justify-center mt-2">
          <a
            href="#resume"
            className="px-6 py-3 rounded-lg bg-gradient-cosmic text-white font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent-blue"
          >
            View Resume
          </a>
          <a
            href="#projects"
            className="px-6 py-3 rounded-lg border border-accent-blue/50 text-text-primary hover:bg-accent-blue/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-blue"
          >
            Projects ↓
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-lg border border-white/10 text-text-muted hover:text-text-primary hover:border-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-blue"
          >
            Contact ↓
          </a>
        </div>
      </motion.div>
    </section>
  )
}
