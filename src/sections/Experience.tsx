'use client'

import { motion } from 'framer-motion'
import experienceData from '@/data/experience.json'

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">Experience</h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue/50 to-transparent" aria-hidden="true" />

          <div className="flex flex-col gap-10 pl-12">
            {experienceData.employers.map((employer) => (
              <div key={employer.company}>
                <div className="absolute left-2 w-4 h-4 rounded-full bg-accent-blue border-2 border-space-bg mt-1" aria-hidden="true" />
                <div className="mb-1">
                  <h3 className="text-lg font-bold text-text-primary">{employer.company}</h3>
                  <p className="text-text-muted text-sm">{employer.location}</p>
                </div>

                <div className="flex flex-col gap-5 mt-4">
                  {employer.roles.map((role) => (
                    <div
                      key={role.title + role.period}
                      className="p-5 rounded-xl border border-card-border bg-card-bg"
                    >
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                        <div>
                          <p className="text-text-primary font-semibold">{role.title}</p>
                          <p className="text-accent-blue text-xs">{role.type}</p>
                        </div>
                        <span className="text-text-muted text-xs shrink-0">{role.period}</span>
                      </div>
                      <ul className="flex flex-col gap-1.5">
                        {role.bullets.map((bullet, i) => (
                          <li key={i} className="text-text-muted text-sm flex gap-2">
                            <span className="text-accent-blue mt-1 shrink-0">›</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
