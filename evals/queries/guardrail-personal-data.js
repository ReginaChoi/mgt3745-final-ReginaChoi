// Guardrail check for docs/DECISION-001.md and context/EVALS.md.
// Flags evidence rows that look like they hold an email, a student ID, a phone
// number, or a grade. It only flags: I read every flagged row and decide, and
// a name can't be caught by a pattern, so I also skim the full export.
//
//   node evals/queries/guardrail-personal-data.js
const API = process.env.API ?? "https://mgt3745-hw4.rchoi47.workers.dev";
const checks = {
  email: /[^\s@]+@[^\s@]+\.[a-z]{2,}/i,
  "student ID (9 digits)": /\b\d{9}\b/,
  phone: /\b\d{3}[-. ]\d{3}[-. ]\d{4}\b/,
  grade: /\b(GPA|grade[ds]?)\b|\b[A-F][+-]?\s*(in|on)\b/i,
};
const res = await fetch(API + "/entries");
if (!res.ok) throw new Error("GET /entries returned " + res.status);
const rows = await res.json();
let flagged = 0;
for (const r of rows) {
  const hits = Object.keys(checks).filter((k) => checks[k].test(r.evidence_text));
  if (hits.length) { flagged++; console.log(r.id, hits.join(", "), "|", r.evidence_text); }
}
console.log(`rows: ${rows.length}, flagged for review: ${flagged}`);
process.exitCode = flagged ? 1 : 0;
