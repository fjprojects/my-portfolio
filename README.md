# Francis Job — Developer Portfolio

A responsive, dark-themed portfolio for software engineering internships, technical collaborations, and hackathon networking.

**Live portfolio:** https://francis-portfolio-bqnn.onrender.com/

## What is included
- **Home:** Introduction and links to projects and contact details
- **About:** Education, technical interests, and learning goals
- **Skills:** Languages, frontend, backend, and tools
- **Projects:** Active, completed, and planned work, with honest status labels
- **Certificates:** Linked credentials
- **Contact:** Email, LinkedIn, GitHub, and resume access
- Animations and a desktop-only custom pointer (with accessible native-pointer fallback for touch and reduced-motion preferences)

## Featured projects
1. **LabTwin** — Personalized learning and coding practice, actively in development. [Source](https://github.com/fjprojects/LabTwin-Track-D-2026)
2. **OcuSense AI** — Web-based eye and screen-wellness project. [Source](https://github.com/fjprojects/OcuSense-AI)
3. **Developer Portfolio** — This site. [Source](https://github.com/fjprojects/my-portfolio)

Project status badges distinguish live work from plans. A live-demo link should only be presented when it has been verified.

## Tech stack
React, Vite, Tailwind CSS, Framer Motion, React Router, and React Icons.

## Local setup
Requires Node.js 22+ and npm.

```bash
npm ci
npm run lint
npm run build
npm run dev
```

Run `npm run check` for the source smoke tests, lint, and production build.

## Deployment
Built with `npm run build`; the production output is `dist/`. When deploying with Render or another static host, configure SPA fallback to `/index.html` so routes like `/projects` load after a refresh.

## Maintenance checklist
- Verify every demo link before labeling it as live.
- Check contact, resume, certifications, and links after deployment.
- Keep personal contact information private; use a professional email and LinkedIn.
- Verify all resume statements and credentials before sharing.
- Keep project feature descriptions consistent with the implementation.
- Check mobile layout, keyboard navigation, touch and reduced-motion accessibility.

## Ownership
Portfolio content belongs to its owner. This project is not an official endorsement of any educational institution, internship provider, or company.
