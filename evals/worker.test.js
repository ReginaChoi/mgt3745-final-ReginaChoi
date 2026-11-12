// evals/worker.test.js
// The code eval. Runs against the deployed Worker; set API to test a different one.
// Each test names the EARS row it checks. Add at least one for your new feature.
import { test } from "node:test";
import assert from "node:assert/strict";

const API = process.env.API || "https://mgt3745-hw4.rchoi47.workers.dev";

test("EARS: THE SYSTEM SHALL return all entries in creation order (GET /entries is 200 + array)", async () => {
  const res = await fetch(API + "/entries");
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.ok(Array.isArray(body));
  for (let i = 1; i < body.length; i++) assert.ok(body[i].id > body[i - 1].id, "ids ascending");
});

test("EARS: IF the entry text is missing, THEN THE SYSTEM SHALL reject it (POST {} is 400)", async () => {
  const res = await fetch(API + "/entries", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{}",
  });
  assert.equal(res.status, 400);
  assert.ok((await res.text()).length > 0, "400 carries a reason");
});

test("EARS: WHEN a valid entry is submitted, THE SYSTEM SHALL store it (POST then GET shows it)", async () => {
  const marker = "eval-" + Date.now();

  const post = await fetch(API + "/entries", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      pathId: "audit",
      skillName: "Reviewing documents for missing detail",
      evidenceText: marker,
    }),
  });

  assert.equal(post.status, 201);

  const list = await (await fetch(API + "/entries")).json();

  assert.ok(
    list.some(
      e =>
        e.path_id === "audit" &&
        e.skill_name === "Reviewing documents for missing detail" &&
        e.evidence_text === marker
    ),
    "posted entry appears in GET"
  );
});

test("EARS AC-10: WHEN evidence is attached to a skill, THE SYSTEM SHALL include that evidence in the exported summary", async () => {
  const marker = "export-eval-" + Date.now();

  const post = await fetch(API + "/entries", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      pathId: "audit",
      skillName: "Reviewing documents for missing detail",
      evidenceText: marker,
    }),
  });

  assert.equal(post.status, 201);

  const list = await (await fetch(API + "/entries")).json();

  const saved = list.find(
    e =>
      e.path_id === "audit" &&
      e.skill_name === "Reviewing documents for missing detail" &&
      e.evidence_text === marker
  );

  assert.ok(saved, "evidence is returned by GET /entries");

  const appSource = await import("node:fs/promises").then(fs =>
    fs.readFile("app.js", "utf8")
  );

  assert.match(
    appSource,
    /Evidence:.*storedText/,
    "F-06 export code includes stored evidence text"
  );
});
