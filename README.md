# Logica Infoway — Website

Marketing site and product shop for **Logica Infoway Limited** (formerly Eastern
Logica Infoway Limited) — a Kolkata-headquartered public limited company, founded
in 1995, supplying genuine IT hardware, networking and enterprise technology to
corporate and government clients across eight cities in India.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command         | Description                          |
| ---------------- | ------------------------------------- |
| `npm run dev`    | Start the local development server    |
| `npm run build`  | Build for production                  |
| `npm run start`  | Serve the production build            |
| `npm run lint`   | Run ESLint                            |

## Project structure

```
app/                 Route segments (App Router) — home, shop, product, cart, etc.
components/          UI, shop, and homepage ("kanva") components
lib/                 Product catalog, site content, and shared data
public/              Images, videos, brand and partner logos, product photos
```

## Content policy

All copy, statistics, client names, and award/recognition mentions on this site
are sourced from Logica Infoway's real, published information. No fabricated
data, logos, or testimonials are used — where a real asset isn't available yet,
it's flagged rather than invented.

## Deployment

The app is a standard Next.js project and deploys to any Next.js-compatible
host (e.g. Vercel). No environment variables are required for a base deploy.
