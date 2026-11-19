# Real-User Feedback

Report counts, never percentages, when n is under ten. No personal data: roles only.

| User (role) | Date | Task attempted | What happened | Quote | Disappointment answer |
|---|---|---|---|---|---|
| User 1: _role to add_ | 2026-11-18 | _to add from my notes_ | _to add_; D1 row 31 at 10:06 AM ET | _to add_ | _to ask and add_ |
| User 2: _role to add_ | 2026-11-18 | _to add from my notes_ | _to add_; D1 rows 32 and 33 at 7:01 PM ET (one save, written twice) | _to add_ | _to ask and add_ |
| User 3: _role to confirm_ (their saved text says "at my auditing firm") | 2026-11-18 | Attach evidence to an audit skill | 8:59 PM started filling out the form; 9:05 PM done. D1 row 34 saved at 9:05:47 PM ET (Explaining findings to a client), about 6 min 47 s after starting the form, so outside the 5-minute window. Suggested "Skill Evidence Log" be title case since it is the title (changed 2026-11-19, docs/DDR-008.md). | From my notes: "site seems straightforward" (confirm whether these were their words) | _not in my notes: ask and add_ |

Disappointment question: "How would you feel if you could no longer use this?" Very / somewhat / not disappointed.

## Save log from D1 (machine record, not an observation)

Pulled 2026-11-19 by Claude Code (docs/DDR-007.md); raw output in [audit-evidence/saves-2026-11-19.txt](audit-evidence/saves-2026-11-19.txt). Times are UTC. The table has no user column, so this log cannot say who saved what or whether these are three different people. Matching each window to a row in the observation table above is mine to do.

| Window (UTC) | Row ids | Path | Skill | Notes |
|---|---|---|---|---|
| 2026-11-18 15:06 | 31 | forensic | Reading financial statements critically | 1 save |
| 2026-11-19 00:01 | 32, 33 | forensic | Reading financial statements critically | identical text in the same second: a double submit, so 1 save |
| 2026-11-19 02:05 | 34 | audit | Explaining findings to a client | 1 save; user 3 (9:05 PM ET, matches my notes) |

Guardrail (`guardrail-personal-data.js`): 32 rows, 0 flagged; I still read every row myself.
