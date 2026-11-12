# SkillPath

**One sentence:** SkillPath helps accounting students and recent graduates see which skills their target career path (audit, forensic accounting, IRS/government) needs and attach real evidence from coursework or internships, so they leave school with something concrete to show an employer.

**Deployed:**
- Worker API (Cloudflare): https://mgt3745-hw4.rchoi47.workers.dev/entries
- Page (GitHub Pages): not live yet, planned for the Module 12 deployment

**Status:** partly working. The evidence log (F-03) and export (F-06) work against the deployed Worker and D1, and `npm test` passes 4/4. The page isn't on GitHub Pages yet, and the Worker's CORS origin still points at the old Codespace URL.

**Hours spent:** 31.25 recorded so far: HW3 14 (mgt3745-hw3 README), HW4 12 (mgt3745-hw4 README), HW5 5.25 (tool run plus review and fixes, [docs/DDR-001.md](docs/DDR-001.md)). HW1, HW2 and HW7 weren't tracked, so the real total is higher.

## See It Work

![The product in use](docs/img/image-1.png)

## Who It Is For

An accounting student or recent graduate aiming at audit, forensic accounting, or a government role. INT-03 (a 2025 accounting graduate, currently unemployed) never figured out which skills her target career needed and graduated with no internship to point to. Career-center lists and generic advice don't connect a specific path to specific skills, and nothing she had tied coursework to evidence an employer can see. Full profiles are in [context/USERS.md](context/USERS.md).

## Run It

```bash
npm install
npm test                 # code evals in evals/, run against the deployed Worker (set API=... to use another)
cd worker && npx wrangler dev
```

## The Record

Milestone check-in items 1 to 8 are numbered in the first column.

| # | Artifact | Link |
|---|---|---|
| 1 | Problem, reframe, temporary-resolution stance, success measures | [context/PROJECT.md](context/PROJECT.md) |
| 2 | Users and jobs | [context/USERS.md](context/USERS.md) |
| 3 | Features (Kano, EARS rows, exclusions) | [context/FEATURES.md](context/FEATURES.md) |
| 4 | ADR-001 (Gate with weights) | [docs/ADR-001.md](docs/ADR-001.md) |
| 4 | Architecture diagram and Trust Boundary | [context/ARCHITECTURE.md](context/ARCHITECTURE.md) |
| 5 | RAT and Prediction Stake | [context/EVALS.md](context/EVALS.md) |
| 6 | First DDR (bolt.new, F-06) and the delegation log | [docs/DDR-001.md](docs/DDR-001.md), [docs/DDR-LOG.md](docs/DDR-LOG.md) |
| 7 | Context Scaffold Audit 1 | [docs/AUDIT.md](docs/AUDIT.md) |
| 8 | Sourcing Audit (HW7) and the tools ledger | [docs/SOURCING-AUDIT.md](docs/SOURCING-AUDIT.md), [context/TOOLS.md](context/TOOLS.md) |
| | Decision memo (criteria due before deployment, Nov 19) | [docs/DECISION-001.md](docs/DECISION-001.md) |
| | Real-user feedback (Nov 19) | [docs/FEEDBACK.md](docs/FEEDBACK.md) |
| | Deployment notes | [docs/DEPLOY.md](docs/DEPLOY.md) |
| | Self-review with Homogenization Check (Dec 14) | [docs/SELF-REVIEW.md](docs/SELF-REVIEW.md) |

**Dating note.** The final-project RAT and Prediction Stake in context/EVALS.md were first committed on 2026-11-12. That's after F-01, F-03 and F-06 were built (HW3 to HW5, carried in by commit `3ca78d7`) but before the deployment build and the real-user sessions they predict. The HW5 Stake for the F-06 delegation was committed before that build (2026-10-01 in the HW5 repo).

## AI Use

Claude Code (Claude Opus 5.5) helped run the HW7 Sourcing Audit and port HW5 into this repo, logged in [docs/DDR-003.md](docs/DDR-003.md). bolt.new generated the first version of F-06 (the export) in HW5, and I reviewed and fixed it before keeping it ([docs/DDR-001.md](docs/DDR-001.md)). GitHub Copilot helped write the HW4 Worker and D1 backend ([docs/DDR-002.md](docs/DDR-002.md)). Google AI Studio was tried for F-06 but errored before producing code. In HW6 it did build a feature for the team problem, but none of that code is in SkillPath. The details and verification are in [docs/DDR-LOG.md](docs/DDR-LOG.md).
