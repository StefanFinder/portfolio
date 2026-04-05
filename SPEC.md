# Personal Portfolio Website — Engineering Specification

## 1. Purpose

This document defines the **technical specification** for building a personal portfolio website for **Stefan (Qiwei) Chen**, a Software Engineer with 3+ years of backend and full-stack experience.

A core design requirement is a **concise, clean, reactive page background with an interstellar (cosmic) theme**. The background should create a memorable visual identity while remaining subtle and not distracting from the primary content.

Primary goals:

- Present professional information clearly
- Showcase technical skills in a vivid way
- Provide a concise, clean, reactive interstellar-themed background
- Allow editing of content through a password-protected admin UI
- Support resume download and profile image display
- Provide a working contact form
- Maintain clean version control via GitHub
- Deploy reliably on GCP

---

## 2. System Architecture

### 2.1 High-Level Architecture

The application uses a **full-stack Next.js architecture** with a database-backed admin panel for content management.

Frontend:

- **Next.js 14 (App Router)**
- TypeScript
- TailwindCSS
- Framer Motion (animations)

Backend:

- Next.js API Routes (`/api/contact`, `/api/admin/*`)
- **Resend** (email delivery service)
- **Prisma ORM** with SQLite (local dev) / PostgreSQL (production)

Hosting:

- Google Cloud Platform — **Cloud Run**

Deployment model:

- Containerized application (Docker)
- Node.js 20 Alpine base image

Architecture overview:

```text
User Browser
     │
     ├── GET /          → Portfolio (reads from DB)
     ├── POST /api/contact → Resend API → qiweic@alumni.usc.edu
     │
     └── /admin (password-protected)
             │
             └── CRUD /api/admin/* → Prisma → SQLite / PostgreSQL
```

---

## 3. Technology Stack

### 3.1 Frontend

| Concern       | Technology              |
| ------------- | ----------------------- |
| Framework     | Next.js 14 (App Router) |
| Language      | TypeScript              |
| Styling       | TailwindCSS             |
| Animation     | Framer Motion           |
| Background FX | Canvas API (starfield)  |

The Canvas-based starfield must remain **lightweight and performant** — no Three.js or heavy WebGL.

### 3.2 Backend

| Concern        | Technology                          |
| -------------- | ----------------------------------- |
| API routes     | Next.js Route Handlers              |
| ORM            | Prisma                              |
| DB (local)     | SQLite                              |
| DB (prod)      | PostgreSQL (Cloud Run + Cloud SQL)  |
| Email          | Resend (free tier)                  |
| Auth (admin)   | HTTP Basic Auth via middleware      |

- Rate limiting: in-memory request counter per IP (suitable for low traffic)

Secrets must be stored using **environment variables** and never exposed to the client.

### 3.3 Hosting

- Deployment target: **Google Cloud Platform — Cloud Run**
- Default Cloud Run URL (no custom domain for V1)
- HTTPS enabled automatically by Cloud Run
- Environment variables configured via Cloud Run service settings

---

## 4. Repository Requirements

The project must be stored in **GitHub** under the account `StefanFinder`.

Repository requirements:

- clean commit history
- descriptive README
- environment variable template

Required files:

```text
README.md
SPEC.md
.env.example
Dockerfile
.gitignore
```

The repository must be structured for professional presentation.

---

## 5. Functional Requirements

### 5.1 Asset Management

Assets will be stored at:

```text
/public/assets/
  resume.pdf          ← provided by owner
  profile.svg         ← pixel-art placeholder (replace with real photo)
  project-images/     ← optional per-project images
```

Resume requirements:

- downloadable via a clearly visible "Download Resume" button
- served directly from `/public/assets/resume.pdf`

Profile image:

- displayed in the Landing section
- use Next.js `<Image>` for optimized loading

### 5.2 Content Management

All site content is stored in a **database** (SQLite locally, PostgreSQL in production) managed via Prisma. Content is seeded from the existing JSON files in `/src/data/` on first run.

Content is updated through the **password-protected admin UI** at `/admin`. No direct file or database editing is required.

#### Admin UI pages

| Route | Purpose |
|---|---|
| `/admin` | Dashboard — links to all editors |
| `/admin/about` | Edit name, title, bio, links |
| `/admin/skills` | Add / remove skill categories and individual skills |
| `/admin/projects` | Add / edit / delete project cards |
| `/admin/experience` | Add / edit / delete employers and roles |

Admin access is protected by HTTP Basic Auth (username + password via environment variables). The admin UI is server-rendered — no client-side secrets.

---

## 6. Content Inventory

This section records the actual content to be rendered on the site.

### 6.1 Owner Info

```json
{
  "name": "Stefan (Qiwei) Chen",
  "title": "Software Engineer",
  "bio": "Results-driven Software Engineer with 3+ years of experience in backend and full-stack development. Specializing in Java, Spring Boot, and cloud-native microservices, with hands-on production experience in trading systems and client management platforms at SMBC Nikko Securities.",
  "email": "qiweic@alumni.usc.edu",
  "github": "https://github.com/StefanFinder",
  "linkedin": "https://www.linkedin.com/in/chenqiwei123/"
}
```

### 6.2 Skills

#### Programming Languages

Java, JavaScript, Python, Golang, C++, C, SQL, CSS, HTML

#### Frameworks

Spring Boot, Spring MVC, Spring Cloud, React, Express, Angular, Vue, Bootstrap, Node.js

#### Databases & Cloud

MySQL, PostgreSQL, MongoDB, SQL Server, AWS, GCP

#### Tools, Libraries & Protocols

Hibernate, Liquibase, Maven, Redis, Kafka, ZeroMQ, Docker, Kubernetes, OpenShift, Grafana, Git, jQuery, JIRA, Mockito, MockMvc, REST API, SOAP, WebSocket, SDLC, Copilot

Skills section must display categories as **interactive, visually grouped cards or badges** (not plain text lists).

### 6.3 Projects

#### Twitch-Go — Personalized Twitch Recommendation Engine

- Full-stack Spring Boot application for searching Twitch resources (clips, videos, streams) with personalized recommendations
- MySQL on AWS RDS via Spring Data JDBC
- RESTful APIs consuming the Twitch API with OpenFeign HTTP client
- Deployed on AWS App Runner via Docker
- Tech stack: Java, Spring Boot, MySQL, AWS RDS, AWS App Runner, Docker, OpenFeign

#### Document AI — Web-Based Q&A Agent for PDF Documents

- Real-time conversational UI built with React and Ant Design for querying uploaded PDF documents
- RESTful API backend built with Node.js and Express
- Powered by OpenAI GPT-3.5 Turbo and LangChain for document parsing, splitting, retrieval, and response generation
- Tech stack: React, Ant Design, Node.js, Express, OpenAI API, LangChain

Each project card must display:

- title
- description (2–3 sentences)
- technology stack (badge list)
- GitHub link
- optional image

### 6.4 Experience

#### SMBC Nikko Securities America — Charlotte, NC

Software Engineer (Full-time) · Nov 2024 – Present

- Designed and developed features for the PNL service, enabling traders to manage trading books and view portfolio data in Orion
- Implemented throttled live price ingestion for UST bonds, bond futures, and SOFR futures via ZeroMQ for real-time risk and P&L calculations
- Built a real-time configurable price ladder merging market and VAP data with trader quantities using Orion Pipeline and Stream
- Designed and implemented a client-contact-salesperson onboarding and management system using Spring Boot and PostgreSQL
- Performed QA integration and regression testing with JUnit 5, AssertJ, and Awaitility in a WebSocket-based microservices architecture
- Managed service pod lifecycle and deployment using Kubernetes and OpenShift

#### SECURAM — Newbury Park, CA

Software Application Engineer (Full-time) · Aug 2023 – Nov 2024

- Standardized project workflows using Agile/Scrum methodology
- Managed deployment and maintenance of Weblink software using Docker
- Implemented RESTful APIs for Weblink Software using Golang

Software Engineering Intern · May 2022 – May 2023

- Contributed to debugging and enhancing the SECURAM Guard App built with Spring Boot and Vue

---

## 7. UI/UX Requirements

### 7.1 Design Principles

- clean, minimal, readable
- fully responsive (desktop / tablet / mobile)
- dark theme throughout

### 7.2 Visual Theme

Theme: **Interstellar / cosmic**

Design elements:

- deep dark background (`#0a0a1f` or similar near-black)
- animated Canvas starfield (subtle, slow-drifting particles)
- soft blue/purple glowing gradients on accent elements
- section dividers using gradient lines

Constraints:

- background animation must not exceed ~2% CPU on idle
- no Three.js, no WebGL — Canvas API only

### 7.3 Motion and Interaction

Allowed (via Framer Motion):

- fade-in on scroll for each section
- hover card elevation (subtle `translateY` + shadow)
- smooth page-load entrance for the hero name/title

Disallowed:

- heavy animations, parallax scrolling effects, large GPU load

---

## 8. Page Structure

### 8.1 Landing / Hero Section

- Full-viewport height
- Profile image (circular, optimized)
- Name: **Stefan (Qiwei) Chen**
- Title: **Software Engineer**
- Bio (1–2 sentences)
- Buttons: `View Resume` · `Projects ↓` · `Contact ↓`

### 8.2 About Section

- Expanded professional summary
- Background / personal touch (optional)

### 8.3 Skills Section

- Skills displayed as **categorized interactive badge cards**
- Categories: Programming Languages · Frameworks · Databases & Cloud · Tools & Libraries
- Hover effect on each badge

### 8.4 Projects Section

- 2 cards: Twitch-Go, Document AI
- Each card: title, description, tech stack badges, GitHub link, optional image

### 8.5 Experience Section

- Timeline-style layout
- 2 employers: SMBC Nikko Securities, SECURAM (includes internship)

### 8.6 Resume Section

- Prominent download button → `/public/assets/resume.pdf`
- Optional: embedded PDF preview (iframe)

### 8.7 Contact Section

Fields:

- Name (optional)
- Email (required)
- Message (required)

Behavior:

1. Client-side validation before submit
2. POST to `/api/contact`
3. Display success message or error feedback

---

## 9. Contact Form API

Endpoint:

```text
POST /api/contact
```

Payload:

```json
{
  "name": "string (optional)",
  "email": "string (required)",
  "message": "string (required)"
}
```

Server-side process:

1. Validate required fields (`email`, `message`)
2. Sanitize input (strip HTML)
3. Enforce rate limit (max 5 requests per IP per hour, in-memory)
4. Send email via Resend to `qiweic@alumni.usc.edu`
5. Return response

Success response:

```json
{ "success": true }
```

Errors return appropriate HTTP status codes (`400`, `429`, `500`).

---

## 10. Folder Structure

```text
portfolio-project/
│
├── prisma/
│   ├── schema.prisma       ← DB schema (About, Skill, Project, Experience)
│   ├── seed.ts             ← Seeds DB from /src/data/*.json
│   └── dev.db              ← SQLite file (local only, gitignored)
│
├── public/
│   └── assets/
│       ├── resume.pdf
│       ├── profile.svg
│       └── project-images/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── admin/
│   │   │   ├── layout.tsx      ← Auth guard (HTTP Basic)
│   │   │   ├── page.tsx        ← Admin dashboard
│   │   │   ├── about/page.tsx
│   │   │   ├── skills/page.tsx
│   │   │   ├── projects/page.tsx
│   │   │   └── experience/page.tsx
│   │   └── api/
│   │       ├── contact/route.ts
│   │       └── admin/
│   │           ├── about/route.ts
│   │           ├── skills/route.ts
│   │           ├── projects/route.ts
│   │           └── experience/route.ts
│   ├── components/
│   │   ├── StarfieldBackground.tsx
│   │   └── Navbar.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   ├── Resume.tsx
│   │   └── Contact.tsx
│   ├── data/                   ← Seed source only (not used at runtime)
│   │   ├── about.json
│   │   ├── skills.json
│   │   ├── projects.json
│   │   └── experience.json
│   ├── lib/
│   │   └── prisma.ts           ← Prisma client singleton
│   └── utils/
│       └── rateLimit.ts
│
├── .env.example
├── .env.local
├── .gitignore
├── Dockerfile
├── README.md
├── SPEC.md
├── next.config.mjs
├── tailwind.config.ts
└── package.json
```

---

## 11. Deployment Requirements

Workflow:

1. `npm run build` — produce production Next.js build
2. `docker build` — create container image (Node 20 Alpine)
3. `docker push gcr.io/PROJECT_ID/portfolio` — push to Google Container Registry
4. `gcloud run deploy` — deploy to Cloud Run

Cloud Run settings:

- HTTPS: enabled (automatic)
- Port: 3000
- Memory: 512Mi minimum
- Environment variables: set via Cloud Run console or `gcloud` CLI

Environment variables:

```text
RESEND_API_KEY=           # Resend API key
EMAIL_TO_ADDRESS=qiweic@alumni.usc.edu
CONTACT_RATE_LIMIT=5      # max submissions per IP per hour
DATABASE_URL=             # SQLite (file:./dev.db) or PostgreSQL connection string
ADMIN_USERNAME=           # Admin UI username
ADMIN_PASSWORD=           # Admin UI password
```

---

## 12. Performance Requirements

- First Contentful Paint < 2 seconds on a standard connection
- Smooth starfield animation (target 60fps, degrade gracefully)
- Minimize bundle size: no heavy 3D libraries

Best practices:

- Next.js `<Image>` for all images
- Lazy loading for below-fold sections
- Tree-shaking (enabled by default in Next.js)

---

## 13. Accessibility Requirements

- Keyboard navigable (tab order, focus states)
- Color contrast ratio ≥ 4.5:1 for all text
- `alt` text on all images
- `aria-label` on icon-only buttons

---

## 14. Security Requirements

- `RESEND_API_KEY` only accessed server-side, never exposed to client
- All contact form inputs sanitized before email dispatch
- Rate limiting on `/api/contact` to prevent spam
- Admin UI protected by HTTP Basic Auth; credentials stored in environment variables only
- All `/api/admin/*` routes verify auth before any DB mutation
- No user data persisted server-side (contact form is email-only)

---

## 15. Non-Goals (Version 1)

The following features are intentionally excluded:

- Blog engine
- Custom domain
- Analytics
- Multi-user admin / role-based access
- Rich text / markdown editor for content fields

These may be considered future improvements.

---

## 16. Acceptance Criteria

The project is complete when:

1. Portfolio renders correctly on desktop, tablet, and mobile
2. Starfield background renders smoothly without performance impact
3. Assets (resume PDF, profile image) load and download correctly
4. All content (about, skills, projects, experience) is editable via the `/admin` UI
5. Admin UI is protected — unauthenticated requests are rejected with 401
6. Skills section displays visually grouped categories
7. Contact form validates input, POSTs to `/api/contact`, and sends email to `qiweic@alumni.usc.edu`
8. DB seeded correctly from JSON files on first run
9. Repository is published to GitHub (`StefanFinder`) with clean history
10. Site is deployed to GCP Cloud Run with HTTPS

---

## 17. Future Enhancements

- Blog system
- GitHub API auto-sync for projects
- Analytics (Plausible or Google Analytics)
- Custom domain
- Dark/light mode toggle
- Rich text editor for bio/description fields
- Image upload for project cards
