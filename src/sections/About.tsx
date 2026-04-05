'use client'

import { motion } from 'framer-motion'
import aboutData from '@/data/about.json'

export default function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        <div>
          <h2 className="text-3xl font-bold text-text-primary mb-6">About Me</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            {aboutData.bio}
          </p>
          <p className="text-text-muted leading-relaxed mb-6">
            I thrive in fast-paced, high-stakes environments — from real-time trading systems to AI-powered web applications. I care deeply about system reliability, clean architecture, and writing code that teams can maintain and build on.
          </p>
          <div className="flex gap-4">
            <a
              href={aboutData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-blue hover:text-text-primary transition-colors text-sm font-medium"
              aria-label="GitHub profile"
            >
              GitHub →
            </a>
            <a
              href={aboutData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-blue hover:text-text-primary transition-colors text-sm font-medium"
              aria-label="LinkedIn profile"
            >
              LinkedIn →
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {[
            { label: 'Experience', value: '3+ Years' },
            { label: 'Current Role', value: 'Software Engineer @ SMBC Nikko' },
            { label: 'Location', value: 'Charlotte, NC' },
            { label: 'Education', value: 'USC (University of Southern California)' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex justify-between items-center px-5 py-4 rounded-xl border border-card-border bg-card-bg"
            >
              <span className="text-text-muted text-sm">{item.label}</span>
              <span className="text-text-primary text-sm font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
