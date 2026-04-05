'use client'

import { motion } from 'framer-motion'

export default function Resume() {
  return (
    <section id="resume" className="py-24 px-6 max-w-6xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-6"
      >
        <h2 className="text-3xl font-bold text-text-primary">Resume</h2>
        <p className="text-text-muted max-w-md">
          Download my full resume to learn more about my experience, skills, and education.
        </p>
        <a
          href="/assets/Stefan_resume.pdf"
          download
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-cosmic text-white font-semibold text-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent-blue shadow-lg shadow-accent-blue/20"
          aria-label="Download Stefan Chen's resume PDF"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7,10 12,15 17,10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download Resume
        </a>
      </motion.div>
    </section>
  )
}
