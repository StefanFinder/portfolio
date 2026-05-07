# Stefan (Qiwei) Chen — Portfolio

Personal portfolio website built with Next.js 14, TailwindCSS, Framer Motion, and a Canvas-based starfield background.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animation**: Framer Motion
- **Email**: Resend
- **Hosting**: GCP Cloud Run

## Getting Started

```bash
cp .env.example .env.local
# Fill in RESEND_API_KEY

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable                         | Description                                  |
| -------------------------------- | -------------------------------------------- |
| `RESEND_API_KEY`                 | API key from resend.com                      |
| `EMAIL_TO_ADDRESS`               | Recipient email for contact form             |
| `CONTACT_RATE_LIMIT`             | Max submissions per IP per hour (default: 5) |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 site key (client-side)          |
| `RECAPTCHA_SECRET_KEY`           | reCAPTCHA v3 secret key (server-side)        |

## Content

All content is in `/src/data/*.json` — edit files directly, no CMS needed.

## Deployment (GCP Cloud Run)

Make sure Docker Desktop is running and you are authenticated:

```bash
gcloud auth login
gcloud config set project portfolio-492420
```

Then deploy everything (push to GitHub + build image + deploy to GCP) with one command:

```bash
npm run deploy
```

Live URL: https://portfolio-1078341789962.us-central1.run.app
