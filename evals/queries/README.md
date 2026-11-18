# Metric queries

Put each decision metric here as a query or script anyone can rerun, named for the metric (for example paid-within-30.sql).
Link it from docs/DECISION-001.md and context/EVALS.md.

| Metric | Script | What it answers |
|---|---|---|
| Leading indicator | [evidence-in-window.js](evidence-in-window.js) | Did this observed user save evidence within the session window? |
| Guardrail | [guardrail-personal-data.js](guardrail-personal-data.js) | Does any saved row look like it holds personal data? |
