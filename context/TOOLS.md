# TOOLS.md

The ledger of every dependency and Trust Boundary crossing. One row per dependency, updated by the Sourcing Audit ([docs/SOURCING-AUDIT.md](../docs/SOURCING-AUDIT.md)). A service not in use does not belong here.

Never a credential in this file. A key, token, or password anywhere in the repository is graded as a security failure regardless of the rest.

| Tool | Purpose | Ring | Checked on | Limit or price | Exit |
|---|---|---|---|---|---|
| wrangler 4.160.1 (pinned) | Dev/deploy CLI for the Worker and D1. Runs on my machine with my Cloudflare login (token stored outside the repo). | Adopt | 2026-11-12 | Free; 1 npm publishing account; 33 transitive packages | Stay on the pin; deploy from the dashboard if needed (~1 h) |
| Cloudflare Workers (`mgt3745-hw4`) | Serves `/entries` (GET/POST). Sees every evidence string and logs request IP/timestamp by default. | Adopt | 2026-11-12 | Free: 100K requests/day, 10 ms CPU; Paid $5/month | Netlify/Vercel functions (~5 h) |
| Cloudflare D1 (`mgt3745-entries`) | Stores all student evidence (path, skill, text). | Adopt | 2026-11-12 | Free: 500 MB/db, 5 GB/account, 5M reads and 100K writes/day | `wrangler d1 export` to SQLite or Supabase (~6 h); export tested 2026-11-12 |
| GitHub Pages | Hosts index.html, app.js, styles.css (planned for Module 12) | Adopt | 2026-11-12 | 1 GB site, soft 100 GB/month bandwidth | Cloudflare Pages or Netlify (~1 h) |
| GitHub repo + Codespaces | Source, history, dev environment | Adopt | 2026-11-12 | Codespaces: 120 compute hours and 15 GB-months/month (Free) | Local clone (~1 h); GitLab (~2 h) |
| Node.js 22 (devcontainer) / 24 (local) | Runs `npm test` (`node:test`) | Adopt | 2026-11-12 | Free; EOL 2027-04-30 / 2028-04-30 | Any LTS Node |
| bolt.new | Builder for F-06 (HW5, DDR-001); gets the spec and context files I give it, no credentials | Trial | 2026-11-12 | Free: 300K tokens/day, 1M/month; Pro $25/month | Hand-build with Copilot (~3–4 h per feature) |
| GitHub Copilot | Code suggestions in the editor; reads open files | Adopt | 2026-11-12 | Free for verified students; Free plan 2,000 completions/month | Turn it off (0 h) |
| Claude Code (Claude Opus 5.5) | Helped with the Sourcing Audit (DDR-003); reads the repo, runs commands with my logins | Trial | 2026-11-12 | Pro $20/month or higher | Do it by hand (0 h runtime) |
| Google AI Studio | Tried for F-06 in HW5, errored | Hold | 2026-11-12 | Free; free-tier content used to train Google models | Not used |

Removed in Audit 1 (2026-11-12): Gemini `gemini-3.5-flash` and Cloudflare AI Gateway. Both were template config the Worker never used. The deprecations page shows 3.5-flash already pulled from AI Studio. If SkillPath ever adds an AI feature, re-add the model with a fresh deprecations-page check dated here.

CDN scripts: none (`grep -rn "<script src=" *.html` finds only the local app.js).

## Revisit triggers

- A new service or package is added to the repository.
- A vendor changes pricing, terms, or region.
- A credential moves.
- Audit 2, after deployment in Module 12.
