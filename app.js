(() => {
  'use strict';

  // Paste the deployed Worker URL here after `npx wrangler deploy`.
  const API = "https://mgt3745-hw4.rchoi47.workers.dev";

  // Paths and skills are still hard-coded for HW4. FEATURES.md requires this
  // list to be editable, which a stored or fetched list would satisfy; see
  // ADR-001 (and now ADR-002, since it did not change this part).
  const careerPaths = [
    {
      id: 'audit',
      name: 'Audit',
      skills: ['Reviewing documents for missing detail', 'Applying compliance rules', 'Explaining findings to a client']
    },
    {
      id: 'forensic',
      name: 'Forensic accounting',
      skills: ['Investigating inconsistencies', 'Building a written case', 'Reading financial statements critically']
    },
    {
      id: 'government',
      name: 'Government or IRS',
      skills: ['Interpreting tax regulation', 'Handling confidential records', 'Documenting a decision trail']
    }
  ];

  const pathSelect = document.querySelector('#path-select');
  const skillSelect = document.querySelector('#skill-select');
  const skillList = document.querySelector('#skill-list');
  const evidenceForm = document.querySelector('#evidence-form');
  const evidenceInput = document.querySelector('#evidence-input');
  const evidenceError = document.querySelector('#evidence-error');
  const saveStatus = document.querySelector('#save-status');
  const exportBtn = document.querySelector('#export-btn');
  const exportError = document.querySelector('#export-error');
  const exportOutput = document.querySelector('#export-output');
  const summaryText = document.querySelector('#summary-text');
  const copyBtn = document.querySelector('#copy-btn');
  const copyStatus = document.querySelector('#copy-status');
  const evidenceCount = document.querySelector('#evidence-count');
  const pathProgress = document.querySelector('#path-progress');

  // AC-6: WHILE peer comparison is disabled, THE SYSTEM SHALL NOT display any
  // other student's data. The D1 table is shared and has no user column
  // (ADR-001), so this browser remembers which saves it made and shows only
  // those (ADR-002). Before 2026-11-19 every visitor saw every row, test rows
  // included, which also made "Evidenced" and any progress count wrong.
  const mineKey = 'skillpath-my-evidence';
  let myEvidence = readMine();

  let savedEvidence = {};
  let selectedPathId = '';

  function readMine() {
    try {
      const stored = JSON.parse(localStorage.getItem(mineKey) || '[]');
      return Array.isArray(stored) ? stored : [];
    } catch {
      return [];
    }
  }

  function writeMine() {
    try {
      localStorage.setItem(mineKey, JSON.stringify(myEvidence));
    } catch {
      // Storage blocked (private window): saves still show for this visit.
    }
  }

  function evidenceKey(pathId, skillName) {
    return `${pathId}::${skillName}`;
  }

  function rowKey(pathId, skillName, evidenceText) {
    return JSON.stringify([pathId, skillName, evidenceText]);
  }

  function findPath(pathId) {
    return careerPaths.find(path => path.id === pathId);
  }

  // ---- HW3, for the record (superseded by ADR-002) ------------------------
  // function loadEvidence() { return JSON.parse(localStorage.getItem(storageKey) || '{}'); }
  // function saveEvidence(evidence) { localStorage.setItem(storageKey, JSON.stringify(evidence)); }
  // -------------------------------------------------------------------------

  // HW4: evidence now comes from the deployed Worker instead of this
  // browser's own storage. A row from the server has path_id, skill_name,
  // and evidence_text; this turns those rows into the same
  // "pathId::skillName -> text" shape the rendering code already expects.
  async function loadEvidence() {
    const response = await fetch(API + '/entries');
    if (!response.ok) {
      saveStatus.textContent = 'Could not load saved evidence from the server.';
      return {};
    }
    const rows = await response.json();
    // Guardrail: a save counts only if the server still has it, so the page
    // never shows "Evidenced" for something missing from GET /entries.
    const onServer = new Set(rows.map(row => rowKey(row.path_id, row.skill_name, row.evidence_text)));
    const evidence = {};
    myEvidence.forEach(item => {
      if (onServer.has(rowKey(item.pathId, item.skillName, item.evidenceText))) {
        evidence[evidenceKey(item.pathId, item.skillName)] = item.evidenceText;
      }
    });
    return evidence;
  }

  // Sends one new piece of evidence to the Worker. Returns true only if the
  // server actually accepted it, so the caller never marks a skill
  // evidenced on the strength of a request that failed.
  async function saveEvidence(pathId, skillName, evidenceText) {
    const response = await fetch(API + '/entries', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ pathId, skillName, evidenceText }),
    });

    if (!response.ok) {
      const reason = await response.text();
      evidenceError.textContent = 'Could not save: ' + (reason || response.status);
      saveStatus.textContent = '';
      return false;
    }

    return true;
  }

  function renderPathOptions() {
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Choose a career path';
    pathSelect.append(placeholder);

    careerPaths.forEach(path => {
      const option = document.createElement('option');
      option.value = path.id;
      option.textContent = path.name;
      pathSelect.append(option);
    });
  }

  function renderSkills() {
    const currentPath = findPath(selectedPathId);

    skillList.replaceChildren();
    skillSelect.replaceChildren();

    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Choose a skill';
    skillSelect.append(placeholder);

    if (!currentPath) {
      const emptyItem = document.createElement('li');
      emptyItem.textContent = 'Select a career path to see its skills.';
      skillList.append(emptyItem);
      renderProgress();
      return;
    }

    currentPath.skills.forEach(skillName => {
      const storedText = savedEvidence[evidenceKey(selectedPathId, skillName)];

      const listItem = document.createElement('li');

      const nameElement = document.createElement('span');
      nameElement.className = 'skill-name';
      nameElement.textContent = skillName;

      const statusElement = document.createElement('span');
      statusElement.className = 'skill-status';
      statusElement.dataset.state = storedText ? 'evidenced' : 'not-evidenced';
      statusElement.textContent = storedText ? 'Evidenced' : 'Not yet evidenced';

      listItem.append(nameElement, statusElement);

      if (storedText) {
        const evidenceElement = document.createElement('p');
        evidenceElement.className = 'skill-evidence';
        evidenceElement.textContent = storedText;
        listItem.append(evidenceElement);
      }

      skillList.append(listItem);

      const option = document.createElement('option');
      option.value = skillName;
      option.textContent = skillName;
      skillSelect.append(option);
    });

    renderProgress();
  }

  // AC-16: WHILE a career path is selected, THE SYSTEM SHALL show how many of
  // its skills have the student's evidence, and say when all of them do.
  // Session 2 finished and asked "is that it?" (docs/FEEDBACK.md, S2-3).
  function renderProgress() {
    const currentPath = findPath(selectedPathId);
    if (!currentPath) {
      pathProgress.hidden = true;
      pathProgress.textContent = '';
      return;
    }
    const total = currentPath.skills.length;
    const done = currentPath.skills.filter(
      skillName => savedEvidence[evidenceKey(selectedPathId, skillName)]
    ).length;

    pathProgress.hidden = false;
    pathProgress.dataset.state = done === total ? 'complete' : 'in-progress';
    if (done === total) {
      pathProgress.textContent = `Done: all ${total} skills on this path have your evidence. Export your summary below, or pick another path.`;
    } else if (done === 0) {
      pathProgress.textContent = `Your progress: 0 of ${total} skills have evidence. Pick a skill below and describe something you did.`;
    } else {
      pathProgress.textContent = `Your progress: ${done} of ${total} skills have evidence. Add evidence for another skill, or export your summary when you're done.`;
    }
  }

  // AC-14: WHILE the student types evidence, THE SYSTEM SHALL grow the box to
  // show all of the text and show the character count. Session 2: the one-line
  // box hid the start of what they typed (docs/FEEDBACK.md, S2-1).
  function fitEvidenceBox() {
    evidenceInput.style.height = 'auto';
    evidenceInput.style.height = evidenceInput.scrollHeight + 'px';
    evidenceCount.textContent = `${Array.from(evidenceInput.value).length} / 200 characters`;
  }

  evidenceInput.addEventListener('input', fitEvidenceBox);

  // AC-15: WHEN a save succeeds, THE SYSTEM SHALL show the saved text and its
  // skill in a confirmation. Session 2 couldn't tell whether the text that
  // vanished was saved or erased (docs/FEEDBACK.md, S2-2).
  function showSaved(skillName, evidenceText) {
    const heading = document.createElement('strong');
    heading.textContent = 'Saved. ';
    const detail = document.createElement('span');
    detail.textContent = `"${evidenceText}" is now evidence for ${skillName}. You can see it in the skill list above.`;
    saveStatus.replaceChildren(heading, detail);
    saveStatus.dataset.state = 'saved';
  }

  pathSelect.addEventListener('change', () => {
    selectedPathId = pathSelect.value;
    evidenceError.textContent = '';
    saveStatus.textContent = '';
    renderSkills();
  });

  const saveButton = evidenceForm.querySelector('button[type="submit"]');

  evidenceForm.addEventListener('submit', async event => {
    event.preventDefault();
    // A second click or Enter while the POST is in flight saved the same
    // evidence twice (D1 rows 32 and 33, docs/DDR-007.md). AC-13: IF a student
    // submits again while a save is in flight, THEN THE SYSTEM SHALL ignore it.
    if (saveButton.disabled) return;

    const chosenSkill = skillSelect.value;
    const candidate = evidenceInput.value.trim();
    const characterCount = Array.from(candidate).length;

    if (chosenSkill === '') {
      evidenceError.textContent = 'Choose a skill before saving.';
      saveStatus.textContent = '';
      skillSelect.focus();
      return;
    }

    if (characterCount < 1 || characterCount > 200) {
      evidenceError.textContent = 'Enter evidence containing 1–200 characters.';
      evidenceInput.setAttribute('aria-invalid', 'true');
      saveStatus.textContent = '';
      evidenceInput.focus();
      return;
    }

    evidenceInput.removeAttribute('aria-invalid');
    evidenceError.textContent = '';

    let saved;
    saveButton.disabled = true;
    try {
      saved = await saveEvidence(selectedPathId, chosenSkill, candidate);
    } catch {
      // The network itself failed (offline, DNS, CORS). fetch throws here
      // rather than returning a response at all, so this is a separate
      // case from the server answering with a 400 or 500.
      evidenceError.textContent = 'Could not reach the server. Check your connection and try again.';
      saveStatus.textContent = '';
      return;
    } finally {
      saveButton.disabled = false;
    }

    if (!saved) return;

    myEvidence.push({ pathId: selectedPathId, skillName: chosenSkill, evidenceText: candidate });
    writeMine();
    try {
      savedEvidence = await loadEvidence();
    } catch {
      // The save went through, but the reload failed: keep the last list.
    }
    renderSkills();
    evidenceInput.value = '';
    skillSelect.value = '';
    fitEvidenceBox();
    evidenceInput.focus();
    if (savedEvidence[evidenceKey(selectedPathId, chosenSkill)] === candidate) {
      showSaved(chosenSkill, candidate);
    } else {
      saveStatus.dataset.state = '';
      saveStatus.textContent = 'Sent, but the server has not confirmed it yet. Reload the page to check before adding more.';
    }
  });

  function generateSummary() {
    const currentPath = findPath(selectedPathId);
    const lines = [];
    lines.push('Skill Summary');
    lines.push('=============');
    lines.push('');
    lines.push('Career path: ' + currentPath.name);
    lines.push('');

    currentPath.skills.forEach(skillName => {
      const storedText = savedEvidence[evidenceKey(selectedPathId, skillName)];
      lines.push('- ' + skillName);
      if (storedText) {
        lines.push('    Status: Evidenced');
        lines.push('    Evidence: ' + storedText);
      } else {
        lines.push('    Status: Not yet evidenced');
      }
      lines.push('');
    });

    const evidencedCount = currentPath.skills.filter(
      skillName => savedEvidence[evidenceKey(selectedPathId, skillName)]
    ).length;

    lines.push('Evidenced skills: ' + evidencedCount + ' of ' + currentPath.skills.length);
    return lines.join('\n');
  }

  exportBtn.addEventListener('click', () => {
    exportError.textContent = '';
    copyStatus.textContent = '';

    if (selectedPathId === '') {
      exportOutput.hidden = true;
      exportError.textContent = 'Choose a career path before exporting.';
      pathSelect.focus();
      return;
    }

    const currentPath = findPath(selectedPathId);
    const hasSkills = currentPath && currentPath.skills.length > 0;
    if (!hasSkills) {
      exportOutput.hidden = true;
      exportError.textContent = 'There are no skills to summarize for this path.';
      return;
    }

    summaryText.value = generateSummary();
    exportOutput.hidden = false;
    summaryText.focus();
    summaryText.select();
  });

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(summaryText.value);
      copyStatus.textContent = 'Copied to clipboard.';
    } catch {
      summaryText.select();
      copyStatus.textContent = 'Could not copy automatically. Select the text and copy manually.';
    }
  });

  async function init() {
    renderPathOptions();
    fitEvidenceBox();
    try {
      savedEvidence = await loadEvidence();
    } catch {
      saveStatus.textContent = 'Could not reach the server. Check your connection and try again.';
      savedEvidence = {};
    }
    renderSkills();
  }

  init();
})();