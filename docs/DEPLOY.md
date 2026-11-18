# Deployment Notes

Last deployed 2026-11-17 (docs/DDR-006.md). Worker version `dfeca5f8-17ed-4f1d-aee0-671a728330d8`.

## Front end
GitHub Pages from `main`, folder `/` (root): index.html, app.js, styles.css. URL: https://reginachoi.github.io/mgt3745-final-ReginaChoi/

## Worker
`npx wrangler deploy` from worker/. Worker `mgt3745-hw4`, D1 database `mgt3745-entries` (binding `DB`). URL: https://mgt3745-hw4.rchoi47.workers.dev/entries

Secrets: none. SkillPath calls no model, so there is no API key, no AI Gateway, and no key-leak test (docs/SOURCING-AUDIT.md). The `database_id` in wrangler.toml is an address, not a secret. The only credential is my wrangler login, stored in my user config, never in the repo.

CORS: the Worker only allows `https://reginachoi.github.io` (worker/src/index.js). A page served from anywhere else, including a Codespace preview, can't save until that origin is changed and redeployed.

## From a clean checkout
1. `git clone https://github.com/ReginaChoi/mgt3745-final-ReginaChoi.git && cd mgt3745-final-ReginaChoi`
2. `npm install` (installs wrangler 4.160.1, the only package).
3. `cd worker && npx wrangler login` (opens a browser; needs access to the Cloudflare account).
4. First time only, on a new account: `npx wrangler d1 create mgt3745-entries`, put the new id in wrangler.toml as `database_id`, then `npx wrangler d1 execute mgt3745-entries --remote --file=schema.sql`.
5. `npx wrangler deploy`. Note the Version ID it prints, for the rollback runbook in README.md.
6. If the page URL changed, update `access-control-allow-origin` in worker/src/index.js and `API` in app.js, then redeploy.
7. Front end: push to `main`. In the repository settings, Pages serves `main` from `/`. It takes about a minute to update.
8. Check: `cd .. && npm test` passes 4/4, and saving evidence on the Pages URL turns the skill "Evidenced". Don't run `npm test` during a user session: it writes rows to the same table.
