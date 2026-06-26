"use strict";

const STORAGE_KEY = "site_quiz_progress";
const STORAGE_VERSION = 1;

const state = {
  visibleModule: 0,
  scores: {},
  completedModules: new Set(),
  moduleResults: {}
};

const els = {
  moduleMap: document.getElementById("module-map"),
  modulesTrack: document.getElementById("modules-track"),
  courseCompleteMsg: document.getElementById("course-complete-msg"),
  resetBtn: document.getElementById("reset-progress-btn")
};

let scrollObserver = null;

function shortModuleTitle(title) {
  const words = title.split(/\s+/);
  if (words.length <= 4) {
    return title;
  }
  return words.slice(0, 4).join(" ") + "…";
}

function init() {
  loadProgress();
  renderAllModules();
  restoreModuleProgress();
  renderModuleMap();
  setupScrollSpy();
  els.resetBtn?.addEventListener("click", resetProgress);
}

function resetProgress() {
  const confirmed = window.confirm(
    "Réinitialiser toute la progression ?\n\nScores, corrections et cours débloqués seront effacés."
  );
  if (!confirmed) {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("Impossible d'effacer la progression :", error);
  }

  state.visibleModule = 0;
  state.scores = {};
  state.completedModules = new Set();
  state.moduleResults = {};

  renderAllModules();
  renderModuleMap();
  setupScrollSpy();

  els.courseCompleteMsg.hidden = true;
  getModuleSection(0)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }

    const data = JSON.parse(raw);
    if (data.version !== STORAGE_VERSION) {
      return;
    }

    state.scores = data.scores || {};
    state.completedModules = new Set(
      (data.completedModules || []).filter(
        (id) => Number.isInteger(id) && id >= 0 && id < modulesData.length
      )
    );
    state.moduleResults = data.moduleResults || {};
  } catch (error) {
    console.warn("Impossible de charger la progression :", error);
  }
}

function saveProgress() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: STORAGE_VERSION,
        scores: state.scores,
        completedModules: [...state.completedModules],
        moduleResults: state.moduleResults
      })
    );
  } catch (error) {
    console.warn("Impossible de sauvegarder la progression :", error);
  }
}

function formatScoreDisplay(correct, total) {
  return Number.isInteger(correct)
    ? `${correct}/${total}`
    : `${Math.floor(correct)}/${total} (+ bonus partiel)`;
}

function formatScoreText(moduleId, score) {
  return `Module ${moduleId} : ${formatScoreDisplay(score.correct, score.total)}`;
}

function restoreModuleProgress() {
  modulesData.forEach((mod) => {
    if (!state.completedModules.has(mod.id)) {
      return;
    }

    const section = getModuleSection(mod.id);
    const saved = state.moduleResults[mod.id];
    const score = state.scores[mod.id];

    if (!section || !saved || !score) {
      return;
    }

    const scoreEl = section.querySelector(".module-score");
    if (scoreEl) {
      scoreEl.textContent = formatScoreText(mod.id, score);
    }

    const results = saved.results.map((entry) => ({
      ...entry,
      question: mod.questions[entry.qIndex]
    }));

    renderCorrection(results, mod, section);
    renderKnowledge(mod, section);
    unlockCourse(mod.id);
  });

  const allDone = modulesData.every((m) => state.completedModules.has(m.id));
  els.courseCompleteMsg.hidden = !allDone;
}

function getModuleSection(moduleId) {
  return document.getElementById(`module-${moduleId}`);
}

function renderAllModules() {
  els.modulesTrack.innerHTML = "";

  modulesData.forEach((mod, index) => {
    const section = document.createElement("section");
    section.id = `module-${mod.id}`;
    section.className = "module-section module-level";
    section.dataset.moduleId = String(mod.id);

    const header = document.createElement("header");
    header.className = "module-header";

    const score = document.createElement("p");
    score.className = "module-score";
    score.dataset.moduleScore = String(mod.id);
    score.setAttribute("aria-live", "polite");

    const title = document.createElement("h2");
    title.textContent = `Module ${mod.id} — ${mod.title}`;

    header.appendChild(score);
    header.appendChild(title);

    const quizPanel = document.createElement("article");
    quizPanel.className = "panel quiz-panel";

    const quizLabel = document.createElement("div");
    quizLabel.className = "panel-label";
    quizLabel.innerHTML =
      '<span class="panel-label-dot" aria-hidden="true"></span><h3>Quiz</h3>';

    const instruction = document.createElement("p");
    instruction.className = "quiz-instruction";
    instruction.textContent = "Réponds avant de descendre — le cours reste verrouillé jusqu'à la soumission.";

    const form = document.createElement("form");
    form.className = "quiz-form";
    form.dataset.moduleId = String(mod.id);
    form.noValidate = true;
    form.addEventListener("submit", handleQuizSubmit);

    renderQuizIntoForm(form, mod);

    quizPanel.appendChild(quizLabel);
    quizPanel.appendChild(instruction);
    quizPanel.appendChild(form);

    const coursePanel = document.createElement("article");
    coursePanel.className = "panel course-panel locked";
    coursePanel.setAttribute("aria-hidden", "true");

    const lockBanner = document.createElement("div");
    lockBanner.className = "lock-banner";
    lockBanner.innerHTML =
      '<span class="lock-icon" aria-hidden="true"></span><p>Cours verrouillé — soumets le quiz pour débloquer</p>';

    const courseContent = document.createElement("div");
    courseContent.className = "course-content";
    courseContent.hidden = true;

    const correctionSection = document.createElement("div");
    correctionSection.className = "correction-section";
    correctionSection.hidden = true;
    correctionSection.innerHTML =
      '<div class="panel-label"><span class="panel-label-dot panel-label-dot--success" aria-hidden="true"></span><h3>Correction</h3></div>';
    const correctionList = document.createElement("ol");
    correctionList.className = "correction-list";
    correctionSection.appendChild(correctionList);

    const knowledgeSection = document.createElement("div");
    knowledgeSection.className = "knowledge-section";
    knowledgeSection.hidden = true;
    knowledgeSection.innerHTML =
      '<div class="panel-label"><span class="panel-label-dot panel-label-dot--success" aria-hidden="true"></span><h3>Points de connaissance</h3></div>';
    const knowledgeList = document.createElement("ul");
    knowledgeList.className = "knowledge-list";
    const takeaway = document.createElement("blockquote");
    takeaway.className = "takeaway";
    knowledgeSection.appendChild(knowledgeList);
    knowledgeSection.appendChild(takeaway);

    courseContent.appendChild(correctionSection);
    courseContent.appendChild(knowledgeSection);
    coursePanel.appendChild(lockBanner);
    coursePanel.appendChild(courseContent);

    section.appendChild(header);
    section.appendChild(quizPanel);
    section.appendChild(coursePanel);

    if (index < modulesData.length - 1) {
      const scrollHint = document.createElement("p");
      scrollHint.className = "scroll-hint";
      scrollHint.textContent = "Scroll pour le module suivant ↓";
      section.appendChild(scrollHint);
    }

    els.modulesTrack.appendChild(section);
  });
}

function renderModuleMap() {
  els.moduleMap.innerHTML = "";
  modulesData.forEach((mod) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "module-map-btn";
    btn.title = mod.title;
    btn.setAttribute("aria-label", `Module ${mod.id} : ${mod.title}`);
    btn.dataset.moduleId = String(mod.id);

    const num = document.createElement("span");
    num.className = "module-num";
    num.textContent = String(mod.id).padStart(2, "0");

    const label = document.createElement("span");
    label.className = "module-label";

    const short = document.createElement("span");
    short.className = "module-short";
    short.textContent = shortModuleTitle(mod.title);

    const status = document.createElement("span");
    status.className = "module-status";
    status.dataset.moduleStatus = String(mod.id);
    status.textContent = moduleStatusLabel(mod.id);

    label.appendChild(short);
    label.appendChild(status);
    btn.appendChild(num);
    btn.appendChild(label);

    if (mod.id === state.visibleModule) {
      btn.classList.add("active");
    }
    if (state.completedModules.has(mod.id)) {
      btn.classList.add("completed");
    }

    btn.addEventListener("click", () => {
      getModuleSection(mod.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    li.appendChild(btn);
    els.moduleMap.appendChild(li);
  });
}

function moduleStatusLabel(moduleId) {
  if (state.completedModules.has(moduleId)) {
    return "Complété";
  }
  if (moduleId === state.visibleModule) {
    return "En cours";
  }
  return "À faire";
}

function setupScrollSpy() {
  if (scrollObserver) {
    scrollObserver.disconnect();
  }

  const sections = document.querySelectorAll(".module-level");
  scrollObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) {
        return;
      }

      const moduleId = Number(visible.target.dataset.moduleId);
      if (moduleId !== state.visibleModule) {
        state.visibleModule = moduleId;
        updateModuleMapActive(moduleId);
      }
    },
    { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.15, 0.35, 0.55] }
  );

  sections.forEach((section) => scrollObserver.observe(section));
}

function updateModuleMapActive(moduleId) {
  els.moduleMap.querySelectorAll(".module-map-btn").forEach((btn) => {
    const id = Number(btn.dataset.moduleId);
    btn.classList.toggle("active", id === moduleId);
    const statusEl = btn.querySelector(".module-status");
    if (statusEl) {
      statusEl.textContent = moduleStatusLabel(id);
    }
  });
}

function lockCourse(moduleId) {
  const section = getModuleSection(moduleId);
  if (!section) {
    return;
  }

  const coursePanel = section.querySelector(".course-panel");
  const lockBanner = section.querySelector(".lock-banner");
  const courseContent = section.querySelector(".course-content");
  const correctionSection = section.querySelector(".correction-section");
  const knowledgeSection = section.querySelector(".knowledge-section");

  coursePanel.classList.add("locked");
  coursePanel.classList.remove("unlocked");
  coursePanel.setAttribute("aria-hidden", "true");
  lockBanner.setAttribute("aria-hidden", "false");
  courseContent.hidden = true;
  correctionSection.hidden = true;
  knowledgeSection.hidden = true;
}

function unlockCourse(moduleId) {
  const section = getModuleSection(moduleId);
  if (!section) {
    return;
  }

  const coursePanel = section.querySelector(".course-panel");
  const lockBanner = section.querySelector(".lock-banner");
  const courseContent = section.querySelector(".course-content");
  const correctionSection = section.querySelector(".correction-section");
  const knowledgeSection = section.querySelector(".knowledge-section");

  coursePanel.classList.remove("locked");
  coursePanel.classList.add("unlocked");
  coursePanel.setAttribute("aria-hidden", "false");
  lockBanner.setAttribute("aria-hidden", "true");
  courseContent.hidden = false;
  correctionSection.hidden = false;
  knowledgeSection.hidden = false;
}

function renderQuizIntoForm(form, mod) {
  form.innerHTML = "";

  mod.questions.forEach((q, qIndex) => {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "question-block";

    const legend = document.createElement("legend");
    legend.className = "question-text";
    legend.textContent = `${qIndex + 1}. ${q.text}`;
    fieldset.appendChild(legend);

    const inputName = `q-${mod.id}-${qIndex}`;

    if (q.type === "qcm" || q.type === "truefalse") {
      const ul = document.createElement("ul");
      ul.className = "options-list";
      ul.setAttribute("role", "radiogroup");
      ul.setAttribute("aria-labelledby", inputName);

      const options = q.type === "truefalse" ? ["Vrai", "Faux"] : q.options;

      options.forEach((opt, optIndex) => {
        const li = document.createElement("li");
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = inputName;
        input.id = `${inputName}-${optIndex}`;
        input.value = String(optIndex);
        input.required = true;

        const span = document.createElement("span");
        span.textContent = q.type === "truefalse"
          ? opt
          : `${String.fromCharCode(97 + optIndex)}) ${opt}`;

        label.htmlFor = input.id;
        label.appendChild(input);
        label.appendChild(span);
        li.appendChild(label);
        ul.appendChild(li);
      });

      fieldset.appendChild(ul);
    } else if (q.type === "open") {
      const label = document.createElement("label");
      label.htmlFor = inputName;
      label.textContent = "Ta réponse :";
      label.className = "sr-only";

      const textarea = document.createElement("textarea");
      textarea.id = inputName;
      textarea.name = inputName;
      textarea.className = "open-answer";
      textarea.required = true;
      textarea.setAttribute("aria-label", `Réponse ouverte question ${qIndex + 1}`);

      fieldset.appendChild(label);
      fieldset.appendChild(textarea);
    }

    form.appendChild(fieldset);
  });

  const actions = document.createElement("div");
  actions.className = "form-actions";

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.className = "btn btn-primary";
  submitBtn.textContent = "Soumettre mes réponses";

  actions.appendChild(submitBtn);
  form.appendChild(actions);
}

function normalizeText(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function gradeOpenAnswer(answer, question) {
  const normalized = normalizeText(answer);
  if (normalized.length < 10) {
    return { correct: false, partial: false };
  }
  const matched = question.keywords.filter((kw) =>
    normalized.includes(normalizeText(kw))
  );
  if (matched.length >= 2) {
    return { correct: true, partial: false };
  }
  if (matched.length >= 1 || normalized.length >= 30) {
    return { correct: false, partial: true };
  }
  return { correct: false, partial: false };
}

function handleQuizSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const moduleId = Number(form.dataset.moduleId);
  const mod = modulesData[moduleId];
  const formData = new FormData(form);
  const results = [];
  let correctCount = 0;

  mod.questions.forEach((q, qIndex) => {
    const inputName = `q-${mod.id}-${qIndex}`;
    let userAnswer;
    let isCorrect = false;
    let isPartial = false;
    let displayAnswer = "";

    if (q.type === "qcm") {
      userAnswer = formData.get(inputName);
      isCorrect = Number(userAnswer) === q.correct;
      displayAnswer = q.options[Number(userAnswer)] || "(non répondu)";
    } else if (q.type === "truefalse") {
      userAnswer = formData.get(inputName);
      const userBool = userAnswer === "0";
      isCorrect = userBool === q.correct;
      displayAnswer = userBool ? "Vrai" : "Faux";
    } else if (q.type === "open") {
      userAnswer = formData.get(inputName) || "";
      displayAnswer = userAnswer;
      const grade = gradeOpenAnswer(userAnswer, q);
      isCorrect = grade.correct;
      isPartial = grade.partial;
    }

    if (isCorrect) {
      correctCount += 1;
    } else if (isPartial) {
      correctCount += 0.5;
    }

    results.push({
      question: q,
      qIndex,
      isCorrect,
      isPartial,
      displayAnswer
    });
  });

  const total = mod.questions.length;
  const scoreDisplay = formatScoreDisplay(correctCount, total);

  state.scores[mod.id] = { correct: correctCount, total };
  state.completedModules.add(mod.id);
  state.moduleResults[mod.id] = {
    results: results.map(({ qIndex, isCorrect, isPartial, displayAnswer }) => ({
      qIndex,
      isCorrect,
      isPartial,
      displayAnswer
    }))
  };

  const section = getModuleSection(mod.id);
  const scoreEl = section?.querySelector(".module-score");
  if (scoreEl) {
    scoreEl.textContent = formatScoreText(mod.id, state.scores[mod.id]);
  }

  renderCorrection(results, mod, section);
  renderKnowledge(mod, section);
  unlockCourse(mod.id);
  renderModuleMap();
  saveProgress();

  const allDone = modulesData.every((m) => state.completedModules.has(m.id));
  els.courseCompleteMsg.hidden = !allDone;

  section?.querySelector(".course-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderCorrection(results, mod, section) {
  const correctionList = section.querySelector(".correction-list");
  correctionList.innerHTML = "";

  results.forEach((r) => {
    const li = document.createElement("li");
    li.className = "correction-item";

    let statusClass;
    let statusText;

    if (r.isCorrect) {
      statusClass = "correct";
      statusText = "✓ Juste";
    } else if (r.isPartial) {
      statusClass = "partial";
      statusText = "~ Partiellement juste";
    } else {
      statusClass = "incorrect";
      statusText = "✗ Faux";
    }

    li.classList.add(statusClass);

    const status = document.createElement("p");
    status.className = `correction-status ${statusClass}`;
    status.textContent = statusText;

    const question = document.createElement("p");
    question.innerHTML = `<strong>Q${r.qIndex + 1}.</strong> ${r.question.text}`;

    const answer = document.createElement("p");
    answer.innerHTML = `<strong>Ta réponse :</strong> ${escapeHtml(String(r.displayAnswer))}`;

    const explanation = document.createElement("p");
    explanation.className = "correction-explanation";
    explanation.textContent = r.question.explanation;

    if (r.question.type === "open" && !r.isCorrect) {
      const sample = document.createElement("p");
      sample.className = "correction-explanation";
      sample.innerHTML = `<strong>Exemple de réponse :</strong> ${escapeHtml(r.question.sampleAnswer)}`;
      li.appendChild(status);
      li.appendChild(question);
      li.appendChild(answer);
      li.appendChild(explanation);
      li.appendChild(sample);
    } else {
      li.appendChild(status);
      li.appendChild(question);
      li.appendChild(answer);
      li.appendChild(explanation);
    }

    correctionList.appendChild(li);
  });
}

function renderKnowledge(mod, section) {
  const knowledgeList = section.querySelector(".knowledge-list");
  const takeaway = section.querySelector(".takeaway");
  knowledgeList.innerHTML = "";

  mod.knowledgePoints.forEach((point) => {
    const li = document.createElement("li");
    const definition = point.definition || "";
    const example = point.example || "";
    li.innerHTML = `
      <strong>${escapeHtml(point.concept)}</strong>
      <p class="knowledge-definition"><em>Définition :</em> ${escapeHtml(definition)}</p>
      <p class="knowledge-example"><em>Exemple :</em> ${escapeHtml(example)}</p>
      <p class="trade-off"><strong>Trade-off :</strong> ${escapeHtml(point.tradeOff)}</p>
    `;
    knowledgeList.appendChild(li);
  });

  takeaway.innerHTML = `<strong>À retenir —</strong> ${escapeHtml(mod.takeaway)}`;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

document.addEventListener("DOMContentLoaded", init);
