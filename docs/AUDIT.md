# Context Scaffold Audits

## Audit 1: 2026-11-12 (before the November 12 check-in)

How it was run: facts gathered with `.github/prompts/audit.prompt.md` (last-changed dates from `git log`, the files and features each file names, overlaps, vendor names), then a verdict per file. The facts and draft verdicts came from Claude Code (docs/DDR-004.md). I confirm each verdict before the Dec 3 studio; any I change get a dated line under "Changes made".

**Honest timing note:** the brief says to run the first audit before changing anything else. I didn't. The HW5 context files were copied over the template stubs on 2026-11-12 (commit `3ca78d7`), and TOOLS.md was rewritten for HW7 the same day, both directly on `main`. That also broke my own AGENTS.md rule ("never write to context/ without a pull request"). This audit's changes go through PR #1 to get back on that rule.

"Last changed" means before this audit's PR.

| File | Reader | Last changed | Finding | Verdict | PR |
|---|---|---|---|---|---|
| PROJECT.md | Me, graders, agents | 2026-11-12 (carried from HW5, 2026-10-01) | No one-sentence problem, no temporary-resolution stance, no success measures. The HW1 AI-anxiety framing reads as current even though INT-03 contradicted it | Rewrite: added problem sentence, reframe, stance, and outcome / leading indicator / guardrail with numbers; HW1 to HW3 text kept below as history | #1 |
| USERS.md | Me, graders | 2026-11-12 (from HW5) | Three dated interviews, two job statements tied to INT-03, two profiles with known vs. assumed marked. Still only one target-segment interview (INT-03) | Keep. Revisit after the Module 12 sessions add real users | — |
| FEATURES.md | Me, builders | 2026-11-12 (from HW5) | Said "Only F-03 is implemented" and step 7 "Deferred", but F-01 and F-06 are built (app.js lines 249 and 258 hold the AC-11/AC-12 messages). Exclusions were labeled "Non-goals". Ended with a template instruction line | Rewrite: scope and Behavior match the build, F-06 verification table added, exclusions named, unbuilt rows classified separately | #1 |
| ARCHITECTURE.md | Me, graders, agents | 2026-11-12 (from HW5) | No current diagram or Trust Boundary. Its "ADR-001"/"ADR-002" clash with docs/ADR-001.md | Rewrite: mermaid diagram, Trust Boundary table, instruction-vs-structure table; old ADRs relabeled HW3/HW4 | #1 |
| TOOLS.md | Agents (read every task), graders | 2026-11-12 (HW7 Sourcing Audit) | Required columns present, every row dated 2026-11-12, AI Studio row corrected | Keep | — |
| EVALS.md | Me, graders | 2026-11-12 (from HW5) | RAT and Stake were about the HW5 bolt.new delegation, with none for the final project or the deployment build | Rewrite: new RAT and Tight/Loose/Open Stake before the Module 12 build; code-eval, judgment, and error-log tables; HW5 record kept below | #1 |
| STYLE.md | Builders, me | 2026-11-12 (from HW5) | Says "no new colors", but styles.css hard-codes six colors and an unused `--color-accent: #B39051` (`grep -n "#" styles.css`) | Keep the text; the drift is recorded in DESIGN.md and fixed in CSS before Dec 3 | — |
| DESIGN.md | Builders | 2026-11-02 (template stub) | All placeholders (`<hex>`, `<family>`, `<px>`), and the project has a visual interface | Rewrite: real tokens from styles.css, where warning may and may not appear, and the drift list | #1 |
| STANDARDS.md | Me, agents | 2026-11-12 (from HW5) | Rule 7 pointed at `worker.js`, which is now `worker/src/index.js` | Rewrite (one path) | #1 |
| CLAUDE.md | Agents, every task | 2026-11-12 (from HW5) | Pointed at `worker.js` and at `/curiosity`, which wasn't carried forward | Rewrite (two lines) | #1 |
| SKILLS.md | Agents, on demand | 2026-11-12 (from HW5) | "Reliably wrong" was still the template placeholder *fill from your error-analysis log* | Rewrite: filled from the HW5/HW6 error logs and the Sourcing Audit | #1 |
| AGENTS.md | Agents | 2026-11-02 (template) | `npx wrangler dev` has to run inside worker/ | Rewrite (one line) | #1 |

### Changes made
- 2026-11-12: everything marked #1 above, in PR #1 (branch `checkin/nov12`). `npm test` 4/4 before and after.
- Not changed in this audit: styles.css color drift (planned before Dec 3), and USERS.md (waits on real users).

## Audit 2: <YYYY-MM-DD> (final-iteration window, December 9 to 14)
