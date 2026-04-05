import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'

export const viewport: Viewport = {
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  title: 'Stefan (Qiwei) Chen — Software Engineer',
  description: 'Personal portfolio of Stefan (Qiwei) Chen, Software Engineer specializing in Java, Spring Boot, and cloud-native microservices.',
  keywords: ['Software Engineer', 'Java', 'Spring Boot', 'Full-Stack', 'Portfolio'],
  authors: [{ name: 'Stefan (Qiwei) Chen' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>
        {children}
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
