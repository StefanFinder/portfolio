'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const recaptchaToken = await new Promise<string>((resolve, reject) => {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, { action: 'contact_submit' })
            .then(resolve)
            .catch(reject)
        })
      })

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, recaptchaToken }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please try again.')
    }
  }

  return (
    <section id="contact" className="py-24 px-6 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-text-primary mb-4 text-center">Get in Touch</h2>
        <p className="text-text-muted text-center mb-10">
          Have a question or want to work together? Send me a message.
        </p>

        {status === 'success' ? (
          <div className="p-6 rounded-xl border border-green-500/30 bg-green-500/5 text-center">
            <p className="text-green-400 font-medium">Message sent successfully!</p>
            <p className="text-text-muted text-sm mt-1">I&apos;ll get back to you soon.</p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-4 text-sm text-accent-blue hover:text-text-primary transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div>
              <label htmlFor="name" className="block text-sm text-text-muted mb-1.5">
                Name <span className="text-text-muted/50">(optional)</span>
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-lg border border-card-border bg-card-bg text-text-primary placeholder-text-muted/50 focus:outline-none focus:border-accent-blue/50 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-text-muted mb-1.5">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onBlur={(e) => setForm({ ...form, email: e.target.value.trim() })}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border border-card-border bg-card-bg text-text-primary placeholder-text-muted/50 focus:outline-none focus:border-accent-blue/50 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-text-muted mb-1.5">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="What's on your mind?"
                className="w-full px-4 py-3 rounded-lg border border-card-border bg-card-bg text-text-primary placeholder-text-muted/50 focus:outline-none focus:border-accent-blue/50 transition-colors resize-none"
              />
            </div>

            {status === 'error' && (
              <p className="text-red-400 text-sm">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 rounded-lg bg-gradient-cosmic text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent-blue"
            >
              {status === 'loading' ? 'Sending…' : 'Send Message'}
            </button>
            <p className="text-text-muted/40 text-xs text-center">
              Protected by reCAPTCHA —{' '}
              <a href="https://policies.google.com/privacy" className="underline hover:text-text-muted" target="_blank" rel="noopener noreferrer">Privacy</a>
              {' & '}
              <a href="https://policies.google.com/terms" className="underline hover:text-text-muted" target="_blank" rel="noopener noreferrer">Terms</a>
            </p>
          </form>
        )}
      </motion.div>
    </section>
  )
}
