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

**Confirmation note (2026-11-19):** the criteria above were never confirmed with a dated line before the first session, as the status line promised; the sessions ran on 2026-11-18 with them still marked draft. They are resolved below exactly as committed in `db8618c` (2026-11-17), with no change to the threshold.

## Resolved beneath (2026-11-19)
Resolved by Claude Code at my request ([DDR-010](DDR-010.md)), from the raw D1 rows, my session notes and the disappointment answers, not from a summary of them. Resolved before the 2026-12-09 deadline because the evidence is in.

Result (n = 3, sessions on 2026-11-18):
- **Leading indicator: 0 of 3** saved evidence within 5 minutes of opening the page: 6 min 25 s, 12 min 12 s, and at least 6 min 47 s ([query output](audit-evidence/leading-indicator-2026-11-19.txt)). 3 of 3 did save at least one piece with no help from me.
- **Guardrail: held.** 0 rows with a name, email, student ID or grade (`guardrail-personal-data.js`: 32 rows, 0 flagged, and I read the four real rows), and 0 saves shown as Evidenced that were missing from `GET /entries`. Not covered by the guardrail, but found: the page showed other visitors' evidence as the student's own (AC-6), fixed in [ADR-002](ADR-002.md).
- The committed threshold, "0 or 1 of 3", points to the **alternative: add example evidence under each skill, then observe at least 2 more users.**

Decision: **iterate, but not with the alternative as committed.** This is a deviation from the rule above, and I'm recording it as one. Session 2's notes say where her time went: a one-line box that hid what she typed ("makes me not wanna put in effort"), not being able to tell whether the save worked, and not knowing when she was done. Session 1 began typing 3 minutes in and typed for 3 more. Nobody said they didn't know what counts as evidence, which is the problem example evidence solves. So I built S2-1 to S2-3 (AC-14 to AC-16) and fixed AC-6 instead, on 2026-11-19. The example evidence is held as the next step, not dropped.

Next, with the same metric and threshold: observe at least 2 more users on the new version, timed from opening the page, and rerun `evidence-in-window.js` for each.

Reversal trigger: if fewer than 2 of the next 2 users save within 5 minutes on the new version, or if any of them says they weren't sure what to write, add example evidence under each skill (the committed alternative) and observe again. If the guardrail breaks even once, stop sessions until it's fixed.
