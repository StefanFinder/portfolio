import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { checkRateLimit } from '@/utils/rateLimit'
import { promises as dns } from 'dns'

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '').trim()
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  const rateLimit = parseInt(process.env.CONTACT_RATE_LIMIT ?? '5', 10)
  if (!checkRateLimit(ip, rateLimit, 60 * 60 * 1000)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait an hour before trying again.' },
      { status: 429 }
    )
  }

  let body: { name?: string; email?: string; message?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const email = stripHtml(body.email ?? '')
  const message = stripHtml(body.message ?? '')
  const name = stripHtml(body.name ?? '')

  if (!email || !message) {
    return NextResponse.json(
      { error: 'Email and message are required.' },
      { status: 400 }
    )
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
  }

  // Verify reCAPTCHA token
  const recaptchaToken = stripHtml((body as { recaptchaToken?: string }).recaptchaToken ?? '')
  if (!recaptchaToken) {
    return NextResponse.json({ error: 'reCAPTCHA verification failed.' }, { status: 400 })
  }
  try {
    const verifyBody = new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY ?? '',
      response: recaptchaToken,
      remoteip: ip,
    })
    const captchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      body: verifyBody,
    })
    const captchaData = await captchaRes.json()
    if (!captchaData.success || captchaData.score < 0.5) {
      return NextResponse.json({ error: 'Bot detected. Please try again.' }, { status: 403 })
    }
  } catch {
    return NextResponse.json({ error: 'reCAPTCHA verification failed.' }, { status: 500 })
  }

  // Verify email domain has valid MX records
  const emailDomain = email.split('@')[1]
  try {
    const mxRecords = await dns.resolveMx(emailDomain)
    if (!mxRecords || mxRecords.length === 0) {
      return NextResponse.json({ error: 'Invalid email domain.' }, { status: 400 })
    }
  } catch {
    return NextResponse.json({ error: 'Could not verify email domain. Please check your email address.' }, { status: 400 })
  }

  const to = process.env.EMAIL_TO_ADDRESS ?? 'qiweic@alumni.usc.edu'
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to,
      subject: `Portfolio contact from ${name || email}`,
      text: `Name: ${name || '(not provided)'}\nEmail: ${email}\n\nMessage:\n${message}`,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
}
