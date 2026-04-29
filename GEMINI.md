# GEMINI.md — ZcookOps

Project-specific behavioral guidelines. Every agent, every task, every line of code follows these rules.

---

## Project Context

**ZcookOps** is a personal cybersecurity writeups site — not a portfolio. It publishes walkthroughs and writeups for CTF challenges, pentest labs, network virtualized labs, and other cybersecurity work.

**Stack:** Next.js 15 (App Router) · TypeScript (relaxed) · Tailwind CSS v4 · shadcn/ui  
**Content:** Local `.mdx` files in the repo (no CMS)  
**i18n:** Bilingual FR/EN  
**Visual:** Clean modern dark mode (Vercel docs / shadcn aesthetic)  
**Backend:** None — static/frontend only  

---

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

---

## 5. Stack Conventions

### Next.js App Router
- Use `app/` directory structure. No `pages/` directory.
- Server Components by default. Use `"use client"` only when necessary.
- Use `layout.tsx` for shared layouts, `page.tsx` for routes.
- Use `next/image` for images, `next/link` for navigation.

### TypeScript
- Relaxed mode — no need for strict types on everything.
- Type props and function signatures. Infer the rest.
- Prefer interfaces over type aliases for component props.

### Tailwind v4 + shadcn/ui
- Use shadcn/ui components as the base — don't reinvent UI primitives.
- Customize via Tailwind theme tokens, not inline overrides.
- Dark mode is the default and primary design target.

### Content (MDX)
- All writeups live in a `content/` directory at the project root.
- Organized by type: `ctf/`, `pentest-labs/`, `network-labs/`, `walkthroughs/`.
- Each `.mdx` file has frontmatter with: title, date, tags, category, lang, description.

### i18n
- Support `fr` and `en` locales.
- Default locale: `fr` (or `en` — to be confirmed during setup).
- Use a simple dictionary/namespace approach. No heavy i18n framework unless needed.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
