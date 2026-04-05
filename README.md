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

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | API key from resend.com |
| `EMAIL_TO_ADDRESS` | Recipient email for contact form |
| `CONTACT_RATE_LIMIT` | Max submissions per IP per hour (default: 5) |

## Content

All content is in `/src/data/*.json` — edit files directly, no CMS needed.

## Deployment (GCP Cloud Run)

```bash
npm run build
docker build -t portfolio .
docker tag portfolio gcr.io/PROJECT_ID/portfolio
docker push gcr.io/PROJECT_ID/portfolio
gcloud run deploy portfolio \
  --image gcr.io/PROJECT_ID/portfolio \
  --platform managed \
  --port 3000 \
  --memory 512Mi \
  --set-env-vars RESEND_API_KEY=...,EMAIL_TO_ADDRESS=...
```
