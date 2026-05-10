<div align="center">

<img src="https://brevio-alpha.vercel.app/favicon.ico" width="60" alt="Brevio Logo" />

# Brevio

**AI-powered PDF summarisation, built for speed.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-brevio--alpha.vercel.app-black?style=for-the-badge&logo=vercel)](https://brevio-alpha.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

</div>

---

## What is Brevio?

Brevio is a SaaS web application that lets users upload PDF documents and receive clean, AI-generated summaries in seconds. Built on Next.js 16 with Clerk authentication, Google Gemini AI, and Stripe-powered subscriptions — it's a full-stack product from upload to payment.

**Live at → [brevio-alpha.vercel.app](https://brevio-alpha.vercel.app)**

---

## Features

- **AI PDF Summarisation** — Upload any PDF and get a structured summary powered by Google Gemini
- **Authentication** — Secure sign-up/sign-in via Clerk (OAuth + email)
- **Subscription Plans** — Free, Pro, and Enterprise tiers with Stripe billing
- **Upload Limit Enforcement** — Per-plan upload quotas with real-time access control
- **Summary Viewer** — Navigate, browse, and download your past summaries
- **Database Storage** — Summaries persisted to NeonDB (serverless PostgreSQL)
- **File Uploads** — Handled by UploadThing with chunked transfer support
- **Animations** — Smooth motion with Framer Motion (`motion`)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui + Radix UI |
| Auth | Clerk |
| AI | Google Gemini (`@google/generative-ai`) + LangChain |
| Database | NeonDB (serverless PostgreSQL) |
| Payments | Stripe |
| File Uploads | UploadThing |
| PDF Parsing | `pdf-parse` |
| Animations | Motion (Framer Motion) |
| Deployment | Vercel |

---

## Project Structure

```
Brevio/
├── app/                  # Next.js App Router pages & API routes
├── components/           # Reusable UI components
├── actions/              # Server actions
├── lib/                  # DB client, Stripe, Clerk helpers
├── utils/                # Utility functions (pricing plans, etc.)
├── public/               # Static assets
├── schema.sql            # NeonDB schema
├── proxy.ts              # Upload proxy with logging
└── vercel.json           # Vercel config (60s function timeout)
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Clerk](https://clerk.com) account
- A [NeonDB](https://neon.tech) database
- A [Google AI Studio](https://aistudio.google.com) API key (Gemini)
- An [UploadThing](https://uploadthing.com) account
- A [Stripe](https://stripe.com) account

### 1. Clone the repository

```bash
git clone https://github.com/dndmein-rgb/Brevio.git
cd Brevio
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# NeonDB
DATABASE_URL=

# Google Gemini
GOOGLE_GENERATIVE_AI_API_KEY=

# UploadThing
UPLOADTHING_TOKEN=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

### 4. Set up the database

Run the SQL schema against your NeonDB instance:

```bash
psql $DATABASE_URL -f schema.sql
```

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment

Brevio is optimised for [Vercel](https://vercel.com). The `vercel.json` sets a 60-second function timeout to handle large PDF uploads and AI processing.

```bash
vercel --prod
```

Add all environment variables from `.env.local` to your Vercel project settings before deploying.

---

## Subscription Plans

| Plan | Uploads | Features |
|---|---|---|
| Free | Limited | Basic summaries |
| Pro | Increased quota | Full summary history, downloads |
| Enterprise | Unlimited | Priority processing, all features |

Billing is handled entirely through Stripe. Webhooks update user access levels in NeonDB in real time.

---



<div align="center">
  Made with ☕ and Claude · <a href="https://brevio-alpha.vercel.app">brevio-alpha.vercel.app</a>
</div>
