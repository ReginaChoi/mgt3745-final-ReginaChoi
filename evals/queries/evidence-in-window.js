// Decision metric for docs/DECISION-001.md (the PROJECT.md leading indicator).
// Counts evidence rows saved between two UTC times, one observed session at a time.
//
//   node evals/queries/evidence-in-window.js "2026-11-19 15:00" "2026-11-19 15:05"
//
// D1 stores created_at in UTC as "YYYY-MM-DD HH:MM:SS". The table has no user
// column, so run one window per session, with nobody else using the page then.
// npm test also POSTs rows to this table: never run it during a session window.
const API = process.env.API ?? "https://mgt3745-hw4.rchoi47.workers.dev";
const [start, end] = process.argv.slice(2);
if (!start || !end) {
  console.error('usage: node evals/queries/evidence-in-window.js "<start UTC>" "<end UTC>"');
  process.exit(2);
}
const pad = (t) => (t.length === 16 ? t + ":00" : t);
const res = await fetch(API + "/entries");
if (!res.ok) throw new Error("GET /entries returned " + res.status);
const rows = (await res.json()).filter(
  (r) => r.created_at >= pad(start) && r.created_at <= pad(end),
);
for (const r of rows) console.log(r.id, r.created_at, r.path_id, "|", r.skill_name);
console.log(`saved in window: ${rows.length} (at least 1 counts as "saved evidence")`);
