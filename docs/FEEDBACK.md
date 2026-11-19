# Real-User Feedback

Report counts, never percentages, when n is under ten. No personal data: roles only.

| User (role) | Date | Task attempted | What happened | Quote | Disappointment answer |
|---|---|---|---|---|---|

Disappointment question: "How would you feel if you could no longer use this?" Very / somewhat / not disappointed.

## Save log from D1 (machine record, not an observation)

Pulled 2026-11-19 by Claude Code (docs/DDR-007.md); raw output in [audit-evidence/saves-2026-11-19.txt](audit-evidence/saves-2026-11-19.txt). Times are UTC. The table has no user column, so this log cannot say who saved what or whether these are three different people. Matching each window to a row in the observation table above is mine to do.

| Window (UTC) | Row ids | Path | Skill | Notes |
|---|---|---|---|---|
| 2026-11-18 15:06 | 31 | forensic | Reading financial statements critically | 1 save |
| 2026-11-19 00:01 | 32, 33 | forensic | Reading financial statements critically | identical text in the same second: a double submit, so 1 save |
| 2026-11-19 02:05 | 34 | audit | Explaining findings to a client | 1 save |

Guardrail (`guardrail-personal-data.js`): 32 rows, 0 flagged; I still read every row myself.
