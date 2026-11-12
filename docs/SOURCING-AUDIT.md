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
| Google AI Studio | builder | README AI Use, context/EVALS.md (HW5); [mgt3745-hw6 docs/DDR-002.md](https://github.com/ReginaChoi/mgt3745-hw6/blob/main/docs/DDR-002.md) (HW6, built F-02 for the team's Compliance Gate) | No. None of its code is in SkillPath |
| Claude Code (Claude Opus 5.5) | builder | docs/DDR-003.md (this audit) | No, docs and config only |
| CDN scripts | CDN script | `grep -rn "<script src=" *.html` finds only `app.js` (local) | None; no third-party scripts or fonts |

**Package count:** I chose 1 package (wrangler). `npm ls --all` shows 34 installed packages in total, so 33 are transitive (esbuild, miniflare, workerd, sharp, undici, ws, and others). Raw output: [audit-evidence/npm-2026-11-12.txt](audit-evidence/npm-2026-11-12.txt). The app itself loads zero npm packages in the browser or the Worker.

### Evidence (each fact with its source and the date you read it)
| Dependency | Latest version and date | Maintainers or vendor | License or terms | Limits or price | Other notes | Checked on |
|------------|------|------|------|------|------|------|
| wrangler | 4.161.0, published 2026-11-12 13:40 UTC (`npm view`) | Cloudflare; **one** publishing account, `wrangler-publisher` (`npm view wrangler maintainers`) | MIT OR Apache-2.0 | Free | 18 4.x releases since 2026-10-12, and one came out this morning. `^4` in package.json means the next `npm install` can pull any of them. 4.161.0 depends on `miniflare@5.20261110.2-beta`, which is on npm's `beta` tag, not `latest`. `npm audit`: 0 vulnerabilities. deps.dev: no advisories, npm provenance attestation present. npm warned that esbuild and workerd run install scripts. | 2026-11-12 |
| Cloudflare Workers | Platform; `compatibility_date = 2026-10-01` | Cloudflare | Cloudflare free-tier terms; logs request IP/timestamp by default | Free: 100,000 requests/day, 10 ms CPU per request. Paid: $5/month minimum ([pricing page](https://developers.cloudflare.com/workers/platform/pricing/)) | Live and answering: `GET /entries` returned 200 during `npm test` | 2026-11-12 |
| Cloudflare D1 | Platform | Cloudflare | Same as Workers | Free: 500 MB per database, 5 GB per account, 10 databases, 5M rows read/day, 100K rows written/day, 7-day Time Travel ([limits](https://developers.cloudflare.com/d1/platform/limits/)) | My table is tiny (a few dozen rows), nowhere near the limits. Data exports as plain SQLite SQL. | 2026-11-12 |
| GitHub Pages | Platform | GitHub (Microsoft) | GitHub Terms of Service | 1 GB site, soft 100 GB/month bandwidth, soft 10 builds/hour ([limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)) | Static files only, which is all my page is | 2026-11-12 |
| GitHub repo + Codespaces | Platform | GitHub (Microsoft) | GitHub ToS | Codespaces on GitHub Free: 120 compute hours and 15 GB-months/month ([billing](https://docs.github.com/en/billing/concepts/product-billing/github-codespaces)) | 120 compute hours is about 60 real hours on a 2-core machine. That's enough, but not unlimited. | 2026-11-12 |
| Node.js | Local v24.22.1; devcontainer `node:22` | OpenJS Foundation | MIT | Free | Both LTS. EOL: Node 22 on 2027-04-30, Node 24 on 2028-04-30 ([schedule](https://github.com/nodejs/Release)). Both outlast Dec 14. | 2026-11-12 |
| Gemini `gemini-3.5-flash` | Released 2026-05-19 | Google | Gemini API terms; free-tier content used to improve Google products ([pricing](https://aistudio.google.com/docs/pricing)) | Not used, so $0 | [Deprecations page](https://aistudio.google.com/docs/deprecations): "no longer available in Google AI Studio; the endpoint is not shutting down." Calls get routed to `gemini-3.6-flash`. My Worker never calls it anyway. It's left over from the template. | 2026-11-12 |
| Cloudflare AI Gateway | Platform | Cloudflare | Cloudflare terms | Core features free; legacy logs capped at 100,000 ([pricing](https://developers.cloudflare.com/ai-gateway/reference/pricing/)) | `AI_GATEWAY_ID` is still the template placeholder. No gateway exists for this project. | 2026-11-12 |
| bolt.new | Hosted builder | StackBlitz | bolt.new terms | Free: 300K tokens/day, 1M/month. Pro: $25/month ([pricing](https://bolt.new/pricing)) | HW5: 4/4 EARS rows on the first output, but the test script needed a manual fix (EVALS.md error log) | 2026-11-12 |
| GitHub Copilot | Assistant | GitHub (Microsoft) | GitHub Copilot terms | Free: 2,000 completions/month. Student: free for verified students. Pro: $10/month ([plans](https://docs.github.com/en/copilot/get-started/plans)) | Already installed by the devcontainer | 2026-11-12 |
| Google AI Studio | Hosted builder | Google | Free tier; content used to improve Google products ([pricing](https://aistudio.google.com/docs/pricing)) | Free | HW5 (2026-10-01): returned `Request contains an invalid argument` even on a minimal request, and produced no code. HW6 (2026-10-22, Gemini 3.8 Flash): worked, 4/4 EARS rows and 34/34 shared tests. But it built extras nobody asked for (Express server, JSON-file storage, an audit log, an unused `@google/genai` dependency), didn't use the Worker + D1 stack, and review and fixes took 6.4 h for a net of -3.7 h (hw6 DDR-002) | 2026-11-12 |
| Claude Code (Claude Opus 5.5) | CLI agent | Anthropic | Anthropic consumer terms | Needs Pro ($20/month, or $17 billed annually) or higher; not on Free ([pricing](https://claude.com/pricing)) | Used for this audit; logged in DDR-003 | 2026-11-12 |
| CDN scripts | n/a | n/a | n/a | n/a | None found by grep | 2026-11-12 |

All pages and command output: [audit-evidence/web-sources-2026-11-12.md](audit-evidence/web-sources-2026-11-12.md), [audit-evidence/npm-2026-11-12.txt](audit-evidence/npm-2026-11-12.txt), [audit-evidence/deps-2026-11-12.txt](audit-evidence/deps-2026-11-12.txt).

### Scores and Rings
Weighted = (Stability×30 + Pricing×15 + Fit×20 + Exit×35) / 5, so the range is 20 to 100. My rough guide was 80+ Adopt, 65–79 Trial, 50–64 Assess, under 50 Hold, and I overrode it where the reason says so.

| Dependency | Stability | Pricing | Institutional fit | Exit cost | Weighted | Ring | Reason in one line |
|------------|---|---|---|---|---|---|---|
| wrangler | 3 | 5 | 5 | 4 | 81 | Adopt | The course standard and officially maintained, but a single publishing account and 18 releases a month is why I pin it (see Changes). |
| Cloudflare Workers | 4 | 4 | 5 | 3 | 77 | Adopt | The number says Trial because of exit cost, but it's my ADR-001 decision, it's live, and I tested the exit below, so I'm adopting it with an exit plan. |
| Cloudflare D1 | 4 | 4 | 5 | 3 | 77 | Adopt | Same override as Workers: holds the real data, the export works (tested), and I'm far under every free limit. |
| GitHub Pages | 5 | 5 | 5 | 5 | 100 | Adopt | Static files on a free host the course uses; any other static host works if it goes away. |
| GitHub repo + Codespaces | 5 | 4 | 5 | 4 | 90 | Adopt | Required by the course; Codespaces hours are the only limit, and I can develop locally (I'm doing this audit locally). |
| Node.js | 5 | 5 | 5 | 5 | 100 | Adopt | Both versions I use are LTS until 2027 or later. |
| Gemini `gemini-3.5-flash` | 1 | 3 | 3 | 5 | 62 | Hold | The number says Assess, but it's already pulled from AI Studio and my product doesn't call any model, so I'm removing it instead of investigating. |
| Cloudflare AI Gateway | 4 | 5 | 4 | 5 | 90 | Hold | Scores well as a service, but I don't use it. A placeholder I'm not using is just clutter and a fake trust boundary, so I'm removing it. |
| bolt.new | 3 | 3 | 3 | 4 | 67 | Trial | Worked for F-06, but token limits and the manual fixes it needed mean I use it only behind a DDR and my own tests. |
| GitHub Copilot | 4 | 4 | 5 | 5 | 91 | Adopt | Free for students, in the devcontainer already, and nothing breaks if I turn it off. |
| Google AI Studio | 3 | 4 | 3 | 5 | 77 | Trial | Worked in HW6 after failing in HW5, but it overbuilds and ignores my stack, and free-tier content trains Google's models, so I'd use it only behind a DDR and my own tests. (Corrected from Hold/65; I first scored it on HW5 alone and missed my HW6 evidence.) |
| Claude Code (Opus 5.5) | 4 | 2 | 3 | 5 | 77 | Trial | Useful, but it's a paid subscription and not something the course hands out, so it's used only with a DDR and my own verification. |
| CDN scripts | n/a | n/a | n/a | n/a | n/a | n/a | There aren't any. Keeping it that way is the point. |

### Exit Plans (every critical dependency, every Trial)
| Dependency | Trigger | Substitute | Hours to swap | Tested? (date and how) |
|------------|---|---|---|---|
| Cloudflare D1 (holds data) | Free tier drops below my usage or starts charging; an outage longer than a day; export stops working | SQLite file behind a small Node server, or Supabase Postgres (the schema is one table) | 6 (1 to export and load, about 5 to rewrite the two queries and redeploy) | **Yes, 2026-11-12 15:58 ET.** `npx wrangler d1 export mgt3745-entries --remote --output=backup.sql` gave 22 lines and 12 rows. Loaded it into a fresh local D1 with `npx wrangler d1 execute mgt3745-entries --local --file=backup.sql`, and `SELECT COUNT(*) FROM evidence` returned 12 locally and 12 remotely. Backup not committed (`backup.sql` is in .gitignore). |
| Cloudflare Workers (serves users) | Workers Free changes so 100K requests/day or 10 ms CPU no longer covers me, or my account is suspended | Netlify or Vercel functions; the handler is one `fetch(request, env)` function | 5 (move the handler, swap `env.DB` for the new database client, update `API` in app.js and CORS) | Partly. `npx wrangler deploy --dry-run` on 2026-11-12 confirms the Worker bundles to 2.36 KiB with only the D1 binding, so there's nothing else to untangle. I didn't deploy it anywhere else. |
| GitHub Pages (serves users) | Pages goes down, changes terms, or my repo has to go private | Cloudflare Pages or Netlify (drag-and-drop static files) | 1 | Not yet; the Pages site goes live in Module 12 |
| GitHub repo + Codespaces | Codespaces hours run out, or GitHub is unavailable near a deadline | Local clone in VS Code (what I used for this audit) for code; GitLab for hosting | 1 for dev; 2 for hosting | Yes, in effect: this whole audit ran in a local clone on Windows, not in a Codespace |
| wrangler | A bad release, a compromised publishing account, or an advisory in `npm audit` | Stay on the pinned 4.160.1; worst case, deploy through the Cloudflare dashboard by pasting `src/index.js` | 1 | Pin tested 2026-11-12: `npx wrangler --version` is 4.160.1, `npm test` 4/4 |
| bolt.new (Trial) | Token limits block a feature, or its output fails my evals twice in a row | Hand-build in Codespaces with Copilot, which is how the Worker was built | 3 to 4 per feature (from DDR-001, where review and fixes took longer than the build) | No |
| Google AI Studio (Trial) | It errors again like HW5, or the free-tier terms change | bolt.new or Copilot, using the same committed spec | Under 1 (nothing in SkillPath depends on it) | No |
| Claude Code (Trial) | I stop paying for the subscription, or its output fails my verification | Do the work by hand with Copilot; nothing at runtime depends on it | 0 runtime; about 4 more hours for an audit like this one | No |

### Changes Caused by This Audit
- **Pinned** wrangler from `^4` to exactly `4.160.1` (commit `ce7f944`). This rules out surprise upgrades from a single-account package that releases almost daily. `npm test` 4/4 afterward.
- **Removed** the unused Gemini model, `CF_ACCOUNT_ID`/`AI_GATEWAY_ID` placeholders, the Gemini key-leak test, and `test:proxy` (commit `71233f5`). `wrangler deploy --dry-run` shows only `env.DB`; `npm test` 4/4 afterward.
- **ADR-001 amended**: added a line to its Consequences pointing here. The decision itself didn't change, since Build still wins, so no ADR-002.
- **Corrected the Google AI Studio row** with HW6 evidence (hw6 DDR-002): stability 1 to 3, weighted 65 to 77, ring Hold to Trial, and an exit plan added. The first pass only looked at HW5.
- **DDR-003** added for Claude Code's help with this audit, with a row in docs/DDR-LOG.md.

### Prediction Stake Resolution
**Did not hold.** I predicted more than 5 publishing accounts on wrangler. `npm view wrangler maintainers` on 2026-11-12 shows exactly one, `wrangler-publisher <workers-devprod@cloudflare.com>`, a shared Cloudflare publishing account. miniflare and workerd use the same account. I assumed a big company meant many publishers, but Cloudflare publishes through one automated account (with npm provenance attestations, per deps.dev). That's fewer doors to phish, but one compromised account would reach all three packages at once. That's the main reason I pinned wrangler instead of leaving it on `^4`.
