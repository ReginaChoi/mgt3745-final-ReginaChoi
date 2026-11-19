# Real-User Feedback

Report counts, never percentages, when n is under ten. No personal data: roles only.

| User (role) | Date | Task attempted | What happened | Quote | Disappointment answer |
|---|---|---|---|---|---|
| User 1 (session 1): accounting student | 2026-11-18 | Attach evidence to a forensic skill | 10:00 AM clicked the link; 10:01 site working; 10:03 began filling out; 10:06 finished. D1 row 31 (Reading financial statements critically) saved at 10:06:25 AM ET, 6 min 25 s after opening, so outside the 5-minute window. No help given. | "a great way to organize/simplify what she has done" (my paraphrase) | **Not disappointed**, closest to her answer: she "won't be that much affected" if she could no longer use it (borderline somewhat) |
| User 2 (session 2): accounting graduate | 2026-11-18 | Attach evidence to a forensic skill | 6:49 PM clicked the link; started filling (time not noted); 7:01 PM finished. D1 rows 32 and 33 (Reading financial statements critically) saved at 7:01:12 PM ET, 12 min 12 s after opening, so outside the 5-minute window. One save written twice (fixed in AC-13, docs/DDR-008.md). Comments in full below. | "It's weird how after i click 'save evidence' the evidence just disappears, so i cant tell if it really was saved" | **Not disappointed**: she "wouldn't care", because of the issues she ran into (S2-1 to S2-3 below) |
| User 3 (session 3): accounting graduate (his saved text says "at my auditing firm") | 2026-11-18 | Attach evidence to an audit skill | 8:59 PM started filling out the form (open time not noted); 9:05 PM done. D1 row 34 (Explaining findings to a client) saved at 9:05:47 PM ET, at least 6 min 47 s after opening, so outside the 5-minute window. Suggested "Skill Evidence Log" be title case since it is the title (changed 2026-11-19, docs/DDR-008.md). | From my notes: "site seems straightforward" | **Somewhat disappointed**: he "won't be devastated" but thinks it "helps in a way" |

**Counts (n = 3):** 3 of 3 saved at least one piece of evidence with no help. 0 of 3 saved within 5 minutes of opening the page, the DECISION-001 leading indicator (6 min 25 s, 12 min 12 s, and at least 6 min 47 s). Query output: [audit-evidence/leading-indicator-2026-11-19.txt](audit-evidence/leading-indicator-2026-11-19.txt). Disappointment answers (n = 3): 0 very, 1 somewhat (session 3), 2 not (sessions 1 and 2; session 1 borderline). The categories are my reading of what each person said, quoted in the table. This is problem-solution signal at best, and n = 3 says nothing about product-market fit.

### Session 2 comments, as written in my notes

> number of skills required seem limited but ig it's concise. Wondering if ur gonna add more career paths eventually (or if this is it). Not sure if "evidence" is a fitting word, maybe "testimony" would be better. The text box for the 'evidence' entry is inconvenient to enter into; it'd be nice if the text box itself expanded downwards as i typed, rather than just having the text 'move' to the left (and conceal the beginning half of what i typed). It makes me not wanna put in effort bc going back and trying to edit would be a hassle. It's weird how after i click 'save evidence' the evidence just disappears, so i cant tell if it really was saved or if my entry was just erased; some sort of indication that my entry was actually saved for others to view (or watev) would be nice. I think also an indication that the person has completed all required steps would be helpful bc after i apparently finished, i was like "is that it?" Bc there was no clarity on if i was done or not.

What session 2 raised, sorted. S2-1 to S2-3 built 2026-11-19 (AC-14 to AC-16, docs/DDR-010.md); S2-4 and S2-5 not built:

| # | Issue | Where it touches the build |
|---|---|---|
| S2-1 | The one-line text box hides the start of what you type, which "makes me not wanna put in effort" | F-03 step 4: the evidence input is a single-line `<input>`, so a growing `<textarea>` would fix it |
| S2-2 | After saving, the text disappears, and they couldn't tell whether it was saved | F-03 step 5: the form clears and a status line appears, but they didn't notice it. This may also explain the double save |
| S2-3 | No sign of being done ("is that it?") | No progress or completion state exists (for example "1 of 5 skills evidenced") |
| S2-4 | The skill list seems short, and they asked whether more career paths are coming | F-01 has three hard-coded paths |
| S2-5 | Not sure "evidence" is the right word (suggested "testimony") | Naming in STYLE.md and on the page |

Disappointment question: "How would you feel if you could no longer use this?" Very / somewhat / not disappointed.

## Save log from D1 (machine record, not an observation)

Pulled 2026-11-19 by Claude Code (docs/DDR-007.md); raw output in [audit-evidence/saves-2026-11-19.txt](audit-evidence/saves-2026-11-19.txt). Times are UTC. The table has no user column, so this log cannot say who saved what or whether these are three different people. Matching each window to a row in the observation table above is mine to do.

| Window (UTC) | Row ids | Path | Skill | Notes |
|---|---|---|---|---|
| 2026-11-18 15:06 | 31 | forensic | Reading financial statements critically | 1 save; user 1 (10:06 AM ET, matches my notes) |
| 2026-11-19 00:01 | 32, 33 | forensic | Reading financial statements critically | identical text in the same second: a double submit, so 1 save; user 2 (7:01 PM ET, matches my notes) |
| 2026-11-19 02:05 | 34 | audit | Explaining findings to a client | 1 save; user 3 (9:05 PM ET, matches my notes) |

Guardrail (`guardrail-personal-data.js`): 32 rows, 0 flagged; I still read every row myself.
