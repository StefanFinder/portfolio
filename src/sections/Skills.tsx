'use client'

import { motion } from 'framer-motion'
import skillsData from '@/data/skills.json'

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">Skills</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {skillsData.categories.map((category) => (
            <div
              key={category.name}
              className="p-6 rounded-2xl border border-card-border bg-card-bg hover:border-accent-blue/30 transition-colors duration-300"
            >
              <h3 className="text-sm font-semibold text-accent-blue uppercase tracking-wider mb-4">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs rounded-full border border-white/10 text-text-muted hover:border-accent-blue/50 hover:text-text-primary hover:shadow-sm hover:shadow-accent-blue/20 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
