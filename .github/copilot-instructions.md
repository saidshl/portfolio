# SHL Portfolio – Project Instructions

Personal portfolio of **SASHL**, Full Stack .NET Engineer. Static site deployed to GitHub Pages.

## Stack
- Vite + React + TypeScript, Tailwind CSS (`@tailwindcss/vite`)
- Framer Motion (reveals, hover, transitions), GSAP ScrollTrigger + Lenis (smooth scroll, parallax)
- Optional: Three.js via `@react-three/fiber` / `drei` for the hero background
- `base` in `vite.config.ts` must match the GitHub repo name (`/shl-portfolio/`)
- Static output only: no server code, no secrets, no runtime backend

## Branding
- Logo: "SHL" (SVG component `src/components/Logo.tsx`, also `public/logo.svg` used as favicon)
- Display name: SASHL. Title: Full Stack .NET Engineer
- Modern, original, dark-first design with gradient accents, glassmorphism, subtle motion; light/dark toggle
- Respect `prefers-reduced-motion`; keep accessibility (contrast, semantic HTML, alt text, keyboard focus)

## Language
- All site content is in **English**. The source CV is in French and must be translated, not copied.
- Keep proper nouns as-is (CDiscount, Octopia, Banque de Tunisie, Altran, Coders Cloud, ENSIT, IPEIM).

## Content source of truth (CV)
Content lives in `src/data/cv.en.json` and `src/data/cv.fr.json` (same structure, typed by `cv.types.ts`, loaded via `src/data/index.ts`). Never hardcode CV content in components. Both files must always be kept in sync.
Sections are a `sections` array; each has `id`, `type` (`skills`, `timeline`, `education`, `certifications`, `languages`), `title`, `items`. To add a new section, append an entry to both JSON files; add a new `type` in `cv.types.ts` and a renderer only if the type is new.

**Summary:** Software engineer with 5+ years of experience designing, architecting and developing enterprise web solutions.

**Skills**
- Languages: C#, JavaScript, TypeScript, SQL
- Frameworks: ASP.NET Core, ASP.NET Framework, React.js, jQuery, Node.js, Angular 6, xUnit, SpecFlow, Pact-net, Selenium
- Databases: SQL Server, PostgreSQL, DB2, SQLite, MongoDB, Redis
- Architectures: Event Driven Architecture, Multi-Tenancy, Microservices, RESTful API, SOAP API
- Methodologies: Scrum, Kanban
- Tools: Kafka, RabbitMQ, Azure DevOps, Git, SVN, Docker, Kubernetes, Jira, Bitbucket

**Experience (reverse chronological)**
1. Jul 2021 – Present, Bordeaux, France – Full Stack .NET Engineer – Client: CDiscount – "Marketplace CDiscount Powered by Octopia" (turnkey e-commerce marketplace for sellers, France and international). Built: registered sales channels module, seller onboarding on multiple channels, sync of shops/subscriptions, offers, products, orders, discussions, financial reports; catalog replication and fine-grained seller catalog management. Practices: Scrum, microservices, event-driven, design-first API, multi-tenancy, jobs/workers, REST services, unit/BDD/Pact tests, consuming other teams' services. Tech: ASP.NET Core 5/6, Kafka, RabbitMQ, MongoDB, Azure DevOps, Elasticsearch, Kibana, SonarQube, Refit, xUnit, Stryker, SpecFlow, Pact-net.
2. Nov 2019 – Jun 2021, Tunis, Tunisia – Full Stack .NET Engineer – Client: Banque de Tunisie (BT)
   - BIG BOARD: stock-order and SICAV investment-order routing platform for branches and the DGMC front office. Admin module (users, roles, permissions), online trading, SICAV, PDF generation, daily trading reports, real-time with SignalR. Tech: ASP.NET Web API, Unity, React.js, MobX, NHibernate, AS400, Azure DevOps, Scrum, SignalR, RDLC, xUnit.
   - Hermes: rebuild of international teletransmission platform (SWIFT). Admin module, bank reference module, SWIFT MT message creation/validation/send/receive/assignment, Windows-service batches for automated transmission. Tech: ASP.NET MVC 5, Unity, TopShelf, jQuery, NHibernate, AS400, Azure DevOps, Scrum, xUnit.
   - Practices: UML analysis/design, Repository Pattern, layered architecture, unit tests.
3. Sep 2018 – Oct 2019, Ariana, Tunisia – Full Stack .NET Engineer – Client: Altran – Recruitment platform (needs, job offers, applications, CV filtering by skills, interview scheduling and conduct). Layered architecture, Repository + Unit of Work, RESTful API, Docker. Tech: ASP.NET Core 2.1, Entity Framework Core, Angular 6, NPM, SVN, Scrum, PostgreSQL, Docker, xUnit, SpecFlow.
4. Feb 2018 – Jun 2018, Tunis, Tunisia – Full Stack JS Engineer (final-year internship) – Coders Cloud – Commercial-offer automation app: similarity detection against past projects, automatic quote draft, project-manager editing UI. Tech: React.js, Koa.js, Node.js, MongoDB, Git, Bitbucket.

**Education**
- 2015–2018: Software Engineering and Business Intelligence engineering degree, ENSIT (Tunis)
- 2012–2015: Preparatory classes for engineering studies (PC), IPEIM (Monastir)
- 2012: Baccalaureate, Computer Science

**Certifications:** Cisco CCNA Routing and Switching (2017); IBM Big Data Developer – Mastery Award for Students 2016 (2017)

**Languages:** Arabic (fluent), English (intermediate), French (professional)

## Page sections
Hero (animated SHL logo, name, title, text reveal) → About → Skills (animated grouped cards/marquee) → Experience (scroll timeline) → Education & Certifications → Contact.

## Code conventions
- Function components, TypeScript strict, no `any`
- One component per file in `src/components/`, sections in `src/sections/`
- Tailwind utilities for styling; no inline style unless dynamic
- Animations in reusable wrappers (e.g. `Reveal`, `StaggerList`) rather than repeated per component
- Do not include personal phone/email/address unless the user provides them; use placeholders in `profile.ts`

## Deploy
- GitHub Actions workflow `.github/workflows/deploy.yml` builds with `npm ci && npm run build` and publishes `dist` to GitHub Pages
- Before finishing a change, run `npm run build` and `npm run lint`
