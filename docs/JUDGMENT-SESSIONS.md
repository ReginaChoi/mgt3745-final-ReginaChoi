# Judgment eval: is the saved evidence real evidence? (Module 12 sessions)

Two graders score each real saved row on its own, then compare. Grader 2 sees only this sheet and the raw rows below, never my notes or verdicts (course rule: a judge sees the raw data, not my summary). Claude Code wrote this sheet ([DDR-010](DDR-010.md)) and built the fixes, so it is not a grader.

- **Grader 1:** Regina Choi
- **Grader 2:** ChatGPT (OpenAI), model: GPT-6, one prompt with no follow-ups, see [DDR-012](DDR-012.md). A person would be stronger; no second person was available.
- **Date graded:** 2026-11-19
- **Order (as it actually happened):** DDR-012 planned to commit my answers before ChatGPT ran, but they weren't committed first. Both sets reached the repo together in this commit, so the history can't show my answers were independent. I graded before reading ChatGPT's answers (my statement, 2026-11-19), but the commit history can't confirm it.

## The rows (raw, from `GET /entries`; row 33 is a duplicate of 32 and isn't graded)

| Row | Path | Skill | Evidence text |
|---|---|---|---|
| 31 | forensic | Reading financial statements critically | Building DCF model for equity research and ensuring that the financials were accurate and up to date based on existing financial information like income statement and balance sheets for the company. |
| 32 | forensic | Reading financial statements critically | Took advanced level accounting classes that taught us to make proper evaluations and conclusions of an entity's financial standing after thorough observation. |
| 34 | audit | Explaining findings to a client | At my auditing firm I presented an account our findings, highlighting financial discrepancies and regulatory initiatives |

## Questions (Yes / No for each row)

1. **Real:** is it something the person actually did, not a placeholder or test text?
2. **Specific:** could an interviewer ask a follow-up about it (it names a course, project, task or setting)?
3. **Fits the skill:** does it show the skill it's attached to?
4. **Safe:** is it free of names, emails, student IDs and grades?

| Row | Q | Grader 1 | Grader 2 | Agree? |
|---|---|---|---|---|
| 31 | 1 Real | Yes ("yes its real") | Yes: Describes completing a DCF model for equity research. | Yes |
| 31 | 2 Specific | Yes ("yeah i think so") | Yes: Identifies a DCF modeling task and the financial statements used. | Yes |
| 31 | 3 Fits the skill | Yes ("yes it shows") | Yes: Shows reviewing financial statements and checking financial information for accuracy. | Yes |
| 31 | 4 Safe | Yes ("yes") | Yes: Contains no names, emails, student IDs, or grades. | Yes |
| 32 | 1 Real | Yes ("yes real") | Yes: Describes taking advanced accounting classes. | Yes |
| 32 | 2 Specific | Yes ("yes the interviewer can somewhat follow up") | No: Does not identify a particular course, assignment, or evaluation task. | **No** |
| 32 | 3 Fits the skill | Yes ("it shows") | Yes: Describes evaluating an entity's financial standing through observation. | Yes |
| 32 | 4 Safe | Yes ("yes") | Yes: Contains no names, emails, student IDs, or grades. | Yes |
| 34 | 1 Real | Yes ("yes the person actually did") | Yes: Describes presenting findings at an auditing firm. | Yes |
| 34 | 2 Specific | Yes ("i think the interviewer could follow up by asking more so yeah") | Yes: Identifies an auditing firm setting and presenting financial discrepancies. | Yes |
| 34 | 3 Fits the skill | Yes ("it shows") | Yes: Shows communicating audit findings and discrepancies to others. | Yes |
| 34 | 4 Safe | Yes ("yes") | Yes: Contains no names, emails, student IDs, or grades. | Yes |

**Agreement: 11 of 12.** The one disagreement is row 32, Specific. I said yes, that an interviewer "can somewhat follow up"; ChatGPT said no, because it names no course, assignment or task. Both readings see the same gap: row 32 is the vaguest entry, the kind of evidence DECISION-001's held-back alternative (an example under each skill) is meant to improve. Grader 1 answers are as I wrote them; Grader 2's are ChatGPT's reply word for word. Result recorded in context/EVALS.md.

## Grader 1 reasons, written out later (2026-11-19)

I wrote these fuller reasons myself, with no AI help, after I'd seen ChatGPT's table, so they aren't independent of it. My first answers in the table above are the graded record. The Yes/No answers are the same in both, so agreement is unchanged at 11 of 12.

| Row | Question | Yes/No | Reason |
|---|---|---|---|
| 31 | Real | Yes | It sounds like something the person actually worked on. |
| 31 | Specific | Yes | It gives an idea of what they worked on, so an interviewer could ask more about it. |
| 31 | Fits the skill | Yes | It shows that they worked with financial statements and checked the information for accuracy. |
| 31 | Safe | Yes | There are no names, emails, student IDs, or grades included. |
| 32 | Real | Yes | It describes accounting classes the person actually took. |
| 32 | Specific | Yes | An interviewer could ask more about the classes and what they learned. |
| 32 | Fits the skill | Yes | It shows that they learned how to evaluate an entity's financial standing. |
| 32 | Safe | Yes | There are no names, emails, student IDs, or grades included. |
| 34 | Real | Yes | It sounds like the person actually presented findings at an auditing firm. |
| 34 | Specific | Yes | An interviewer could ask more about the findings they presented and what discrepancies they found. |
| 34 | Fits the skill | Yes | It shows that they communicated audit findings and financial discrepancies. |
| 34 | Safe | Yes | There are no names, emails, student IDs, or grades included. |
