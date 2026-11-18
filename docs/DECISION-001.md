# DECISION-001: Keep the evidence log as it is, or add example evidence to every skill

The choice: after the first three real users, either **keep F-03 unchanged** or **add one example of evidence under each skill** (for example "ACCT 3101 case: tested a revenue cutoff") so students see what "evidence" means before they type. It answers the RAT in context/EVALS.md: will a student who sees the skills attach evidence on their own?

## Committed before the evidence (2026-11-17)
**Status: draft, written by Claude Code from the thresholds already in context/PROJECT.md (docs/DDR-006.md). I confirm or change it before the first user session, and any change gets a dated line here.**

Default action: keep F-03 unchanged (cheap and reversible, no code change).
Owner and deadline: Regina Choi; decided by 2026-12-09, the start of the final-iteration window.
Evidence that would change it:
- Outcome: the number of the first 3 observed users who save at least one piece of evidence within 5 minutes of opening the page, with no help from me (the PROJECT.md leading indicator). Measured with `node evals/queries/evidence-in-window.js <start> <end>` for each session's start and end time (UTC), plus my timed notes in docs/FEEDBACK.md.
- Threshold: 2 or 3 of 3 → keep the default. 0 or 1 of 3 → add example evidence under each skill, then observe at least 2 more users.
- Guardrail: 0 entries with a real name, email, student ID, or grade (`node evals/queries/guardrail-personal-data.js`, then I read every flagged row), and 0 saves shown as "Evidenced" that are missing from `GET /entries`. One violation stops sessions until it's fixed.

## Resolved beneath (<YYYY-MM-DD>)
Result: <numbers, with n>
Decision: <ship / iterate / stop>
Reversal trigger: <what would make you revisit it>
