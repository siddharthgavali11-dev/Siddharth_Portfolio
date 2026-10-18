# Siddharth Gavali — Portfolio

A modern, animated personal portfolio built with Next.js, showcasing my projects, skills, education, and experience as a Computer Science and Business Systems student.

**Live site:** [siddharth-portfolio-rho.vercel.app](https://siddharth-portfolio-rho.vercel.app)
**Repository:** https://github.com/siddharthgavali11-dev/Siddharth_Portfolio

---

## ✨ Features

- **Smooth scrolling** experience powered by Lenis
- **Animated sections** with scroll-triggered reveals (Framer Motion + Intersection Observer)
- **Custom cursor** and particle background for a distinctive feel
- **Command palette** (`Ctrl+K`) for quick in-page navigation
- **Live GitHub stats** — pulls real-time repo count, stars, and followers from the GitHub API
- **Dynamic stats counters** computed directly from resume data (projects, skills, experience)
- **Fully responsive** — desktop, tablet, and mobile layouts
- **Dark theme** with a neon cyan/purple accent system
- **Interactive resume viewer** and downloadable CV
- **Contact form** for direct outreach

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack), [React 19](https://react.dev) |
| Language | [TypeScript](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Animation | [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com), [Lenis](https://lenis.darkroom.engineering) (smooth scroll) |
| Icons | [Lucide React](https://lucide.dev) |
| Scroll Detection | [react-intersection-observer](https://github.com/thebuilder/react-intersection-observer) |
| Linting | ESLint 9 (flat config) |

## 📂 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, global providers
│   │   ├── page.tsx            # Home page, section composition
│   │   └── globals.css
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Timeline.tsx        # Experience & Education
│   │   ├── Projects.tsx
│   │   ├── ProfilesAndAchievements.tsx
│   │   ├── ResumeViewer.tsx
│   │   ├── ContactForm.tsx
│   │   ├── Footer.tsx
│   │   ├── SmoothScroll.tsx
│   │   ├── ParticleBackground.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── CommandPalette.tsx
│   │   └── AiAssistant.tsx
│   └── utils/
│       └── resumeData.ts       # Single source of truth for all content
├── public/                     # Static assets (photo, resume PDF, etc.)
├── next.config.ts
├── tsconfig.json
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20.9 or later (required by Next.js 16)
- npm (or yarn / pnpm / bun)

### Run locally

```bash
git clone https://github.com/siddharthgavali11-dev/Siddharth_Portfolio.git
cd Siddharth_Portfolio
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

### Other scripts

| Command | What it does |
| --- | --- |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

### Updating the content

All portfolio content (projects, skills, experience, education) comes from `src/utils/resumeData.ts`, so most edits happen in that one file.

## 📬 Contact

- **Email:** siddharthgavali55@gmail.com
- **LinkedIn:** [siddharth-gavali](https://linkedin.com/in/siddharth-gavali-84b68a2a6)
- **GitHub:** [@siddharthgavali11-dev](https://github.com/siddharthgavali11-dev)

## 📄 License

This project is personal portfolio code. Feel free to reference the structure for your own portfolio, but please don't copy the content or design wholesale without permission.
