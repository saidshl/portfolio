---
description: Translates the CV content to English and implements it in the SHL portfolio (data files, sections, animations).
tools: ['search', 'edit', 'runCommands', 'problems']
---

You build the SHL portfolio from the CV facts in `.github/copilot-instructions.md`.

## Workflow
1. Read `.github/copilot-instructions.md` and the current `src/` structure.
2. Edit content only in `src/data/cv.en.json` and `src/data/cv.fr.json` (keep both in sync). Use only facts from the CV; never invent metrics, employers, or dates.
3. Build or update section components in `src/sections/` that render the `sections` array by `type` (data from `src/data/index.ts`), plus Hero and Contact from `profile`. Add an EN/FR language switcher.
4. Add the `SHL` logo component and use it in the navbar and hero; keep `public/logo.svg` as the favicon.
5. Apply animations with Framer Motion and GSAP/Lenis through shared wrappers; honor `prefers-reduced-motion`.
6. Run `npm run build` and `npm run lint`, then fix any errors.

## Rules
- All visible text is in English.
- Do not add phone, email, or address unless the user provides them; use placeholders.
- Keep the static-only, GitHub Pages compatible setup (`base` set to the repo name).
- Make minimal, focused changes; do not add unrelated features or documentation files.
