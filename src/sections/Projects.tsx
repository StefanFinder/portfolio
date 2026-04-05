'use client'

import { motion } from 'framer-motion'
import projectsData from '@/data/projects.json'

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projectsData.projects.map((project) => (
            <motion.div
              key={project.title}
              whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(58,74,170,0.15)' }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl border border-card-border bg-card-bg flex flex-col gap-4"
            >
              <div>
                <h3 className="text-lg font-bold text-text-primary">{project.title}</h3>
                <p className="text-accent-blue text-sm">{project.subtitle}</p>
              </div>
              <p className="text-text-muted text-sm leading-relaxed flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-xs rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors mt-1 focus:outline-none focus:ring-2 focus:ring-accent-blue rounded"
                aria-label={`GitHub repository for ${project.title}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                </svg>
                View on GitHub
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
