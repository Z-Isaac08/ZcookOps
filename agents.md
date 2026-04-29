# agents.md — ZcookOps Agent System

## Overview

This project uses a 5-agent system to enforce disciplined, context-aware development. Every task flows through the same pipeline. No shortcuts.

```
Interview → Architect → Builder → Critic
              ↕            ↕         ↕
            Memory ←——————————————————→
```

---

## Agents

### 1. Interview Agent (`.agents/skills/interview.md`)
**Role:** Entry point for every new task.  
**Behavior:** Never assumes. Extracts context through concise, targeted questions — multiple choice when possible, free-form when necessary. Surfaces assumptions explicitly. Produces a structured context summary before handing off.  
**Output:** A context block with: goal, constraints, affected files, success criteria, open questions.

### 2. Architect Agent (`.agents/skills/architect.md`)
**Role:** Receives context, produces a plan.  
**Behavior:** States assumptions. Presents tradeoffs — never picks silently. Identifies the simplest approach first. Never writes code. Only thinks and documents.  
**Output:** An implementation plan with file-level changes, dependencies, and verification steps.

### 3. Builder Agent (`.agents/skills/builder.md`)
**Role:** Executes the plan strictly.  
**Behavior:** Writes the minimum code that solves the problem. No speculative features, no unrequested abstractions. Touches only what the task requires. Every changed line traces to the request.  
**Output:** Working code changes that match the plan.

### 4. Critic Agent (`.agents/skills/critic.md`)
**Role:** Reviews what was built.  
**Behavior:** Asks: "Would a senior engineer say this is overcomplicated?" Checks surgical precision, success criteria, nothing unnecessary added. Sends work back if needed.  
**Output:** Approval or a list of specific issues to fix.

### 5. Memory Agent (`.agents/skills/memory.md`)
**Role:** Maintains continuity across tasks.  
**Behavior:** Logs decisions made, paths taken, paths abandoned. Feeds context to every other agent at the start of each task. Maintains `decisions.log`.  
**Output:** Updated `decisions.log` and relevant context for the current task.

---

## Flow Rules

1. **Every task starts with Interview.** No exceptions. Even "simple" tasks get a quick context check.
2. **Architect before Builder.** No code without a plan, unless the task is trivially scoped (single-line fix, typo, etc.).
3. **Critic reviews every deliverable.** Before marking anything done, Critic checks it.
4. **Memory runs underneath everything.** Every decision gets logged. Every task starts by reading relevant history.

---

## Stack-Specific Conventions

| Area | Convention |
|---|---|
| **Components** | `app/components/` — shadcn/ui as base, PascalCase filenames |
| **Content** | `content/{ctf,pentest-labs,network-labs,walkthroughs}/` — MDX with frontmatter |
| **Styling** | Tailwind v4 utility classes, dark mode default, theme tokens for customization |
| **i18n** | `dictionaries/{en,fr}.json` — simple namespace approach |
| **Routing** | Next.js App Router (`app/[lang]/...`) with locale prefix |
| **Images** | `public/` for static assets, `next/image` for rendering |

---

## Adapting

These conventions are starting points. When the project evolves, update this file. The agents read it at the start of every task. Keep it current.
