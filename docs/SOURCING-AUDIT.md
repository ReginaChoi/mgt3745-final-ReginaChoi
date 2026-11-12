# Sourcing Audit

## Audit 1, November 2026

### Prediction Stake (commit before any evidence)
`npm view wrangler maintainers` will list more than 5 publishing accounts. Resolution: Tight.

My reasoning: wrangler is Cloudflare's official CLI, so I'm guessing a lot of Cloudflare employees can publish it. That's more people who could get phished, but it also means it isn't one person's side project.

Note on timing: I ran `npm install` as part of "Before You Start", so I already saw its summary (34 packages added, 0 vulnerabilities, an install-scripts warning for esbuild and workerd) before writing this. That's why the Stake isn't about `npm audit`. I haven't looked up maintainers, versions, or any pricing page yet.

### Weights (commit in their own commit, before scoring)
Scoring direction for every criterion: 5 is best (most stable, most predictable cost, best fit, cheapest to leave), 1 is worst.

| Criterion | Weight | Why this weight for this project |
|-----------|--------|----------------------------------|
| Stability | 30 | Students rely on the evidence they save, so a tool that breaks or disappears mid-semester (like GitHub Models did) would hurt the most. |
| Pricing predictability | 15 | My budget is $0 and everything runs on free tiers, but a surprise bill is a small risk at my traffic, so it matters less than the others. |
| Institutional fit | 20 | This is a Georgia Tech course project; tools need to work with my GT accounts and be ones the course expects (Codespaces, Cloudflare, GitHub Pages). |
| Exit cost | 35 | I already paid a migration once (localStorage to D1 in HW4), and student data lives in D1, so being able to get out cheaply is what I care about most. |
Total: 100

### Inventory
| Dependency | Kind (package, dev package, platform, model, builder, CDN script) | Where it is recorded | Ships to users? |
|------------|------|------|------|
| wrangler | dev package | package.json (`devDependencies`), package-lock.json | No, deploy/dev tool only |
| Cloudflare Workers (`mgt3745-hw4`) | platform | worker/wrangler.toml (`name`, `main`) | Yes, serves the API |
| Cloudflare D1 (`mgt3745-entries`) | platform | worker/wrangler.toml (`[[d1_databases]]`), worker/schema.sql | Yes, holds every piece of student evidence |
| GitHub Pages | platform | README (planned page host), index.html at repo root | Yes, will serve the page (not live yet) |
| GitHub repo + Codespaces | platform | .devcontainer/devcontainer.json, context/TOOLS.md | No |
| Node.js (runs `node:test`) | platform | package.json `test` script, devcontainer image `javascript-node:22` | No |
| Gemini `gemini-3.5-flash` | model | worker/wrangler.toml `[vars] GEMINI_MODEL` | No, configured but nothing in worker/src/index.js calls it |
| Cloudflare AI Gateway | platform | worker/wrangler.toml `[vars] AI_GATEWAY_ID` (placeholder) | No, same, never called |
| bolt.new | builder | docs/DDR-001.md (HW5, F-06) | Yes, its F-06 export code is in app.js |
| GitHub Copilot | builder | docs/DDR-002.md (HW4 Worker/D1), devcontainer extension | Yes, helped write worker/src/index.js |
| Google AI Studio | builder | README AI Use, context/EVALS.md (HW5) | No, it errored and produced nothing |
| Claude Code (Claude Opus 5.5) | builder | docs/DDR-003.md (this audit) | No, docs and config only |
| CDN scripts | CDN script | `grep -rn "<script src=" *.html` finds only `app.js` (local) | None; no third-party scripts or fonts |

**Package count:** I chose 1 package (wrangler). `npm ls --all` shows 34 installed packages in total, so 33 are transitive (esbuild, miniflare, workerd, sharp, undici, ws, and others). Raw output: [audit-evidence/npm-2026-11-12.txt](audit-evidence/npm-2026-11-12.txt). The app itself loads zero npm packages in the browser or the Worker.

### Evidence (each fact with its source and the date you read it)
| Dependency | Latest version and date | Maintainers or vendor | License or terms | Limits or price | Other notes | Checked on |
|------------|------|------|------|------|------|------|

### Scores and Rings
| Dependency | Stability | Pricing | Institutional fit | Exit cost | Weighted | Ring | Reason in one line |
|------------|---|---|---|---|---|---|---|

### Exit Plans (every critical dependency, every Trial)
| Dependency | Trigger | Substitute | Hours to swap | Tested? (date and how) |
|------------|---|---|---|---|

### Changes Caused by This Audit
- <removal, pin, or replacement, with commit hash>
- <ADR amended or superseded, if any>
- <DDR lines added, if AI helped>

### Prediction Stake Resolution
<What happened, and whether the prediction held.>
