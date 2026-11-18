---
tokens:
  color:
    ink:     { $type: color, $value: "#172B40" }
    paper:   { $type: color, $value: "#F7F9FB" }
    accent:  { $type: color, $value: "#123552" }
    warning: { $type: color, $value: "#922020" }
    focus:   { $type: color, $value: "#B16D00" }
  font:
    body:    { $type: fontFamily, $value: ["Arial", "Helvetica", "sans-serif"] }
  space:
    unit:    { $type: dimension, $value: "12px" }
  radius:
    card:    { $type: dimension, $value: "4.8px" }
---
# Design rationale

These are the values already in `styles.css` (`:root`), converted from rem at 16px (0.75rem = 12px, 0.3rem = 4.8px). The full reasoning and contrast ratios are in [STYLE.md](STYLE.md), so this file doesn't repeat them. "accent" here is the primary button color (`--color-primary`).

**Where warning (#922020) may appear:** only in error messages: a failed save (AC-4), empty or missing input (AC-3), and blocked exports (AC-11, AC-12). These sit next to the control that caused them, in a live region.

**Where warning may not appear:** never on "Not yet evidenced". A skill with no evidence isn't an error. INT-03 left school with no internship, and the page shouldn't make a student with nothing yet feel like they failed. Not-evidenced uses the muted gray instead.

**Drift found in Audit 1 (2026-11-12):** `styles.css` defines `--color-accent: #B39051`, but no rule uses it. It also hard-codes six colors that aren't tokens: `#526578` (input borders), `#1d5b32` (evidenced and copied, green), `#5a6775` (not evidenced, gray), `#a02020` (invalid-input border, nearly the same as the error red), `#b8c5d0` (dividers) and `#fff` (button text). Fix before the Dec 3 studio: turn the green and gray into tokens, merge `#a02020` into `--color-error`, and delete the unused accent.
