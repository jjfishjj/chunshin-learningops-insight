const segmentModels = {
  career: {
    label: "求職衝刺型",
    baseUsers: 8800,
    retention: [0.74, 0.48, 0.31, 0.22],
    health: 74,
    examIntent: 0.42,
    personaBias: "職涯目標明確，適合用履歷、面試、外商職缺來帶動練習與報名。",
  },
  campus: {
    label: "校園活動型",
    baseUsers: 12400,
    retention: [0.68, 0.39, 0.24, 0.17],
    health: 63,
    examIntent: 0.34,
    personaBias: "容易被社團、講座與同儕活動帶動，但需要更清楚的下一步任務。",
  },
  self: {
    label: "自學備考型",
    baseUsers: 6200,
    retention: [0.79, 0.56, 0.38, 0.29],
    health: 81,
    examIntent: 0.46,
    personaBias: "自我驅動較強，適合給錯題包、模考排程與進步預測。",
  },
  lowConfidence: {
    label: "低信心起步型",
    baseUsers: 5400,
    retention: [0.58, 0.28, 0.15, 0.1],
    health: 46,
    examIntent: 0.22,
    personaBias: "需要低壓力任務、鼓勵式回饋與短週期成就感，避免一開始就推正式測驗。",
  },
};

const sourceModifiers = {
  campus: { label: "校園講座", users: 1.16, activation: 1.04, intent: 1.08, retention: 1.02 },
  organic: { label: "自然下載", users: 1, activation: 0.92, intent: 0.9, retention: 0.94 },
  advisor: { label: "顧問推薦", users: 0.78, activation: 1.18, intent: 1.24, retention: 1.12 },
  social: { label: "社群內容", users: 1.24, activation: 0.97, intent: 0.96, retention: 0.9 },
};

const windowModifiers = {
  short: { label: "考前 14 天", activation: 1.08, intent: 1.22, retention: 0.92, health: 1.04 },
  mid: { label: "考前 30 天", activation: 1, intent: 1, retention: 1, health: 1 },
  long: { label: "考前 60 天", activation: 0.94, intent: 0.88, retention: 1.13, health: 1.08 },
};

const goalText = {
  job: "求職 / 履歷",
  graduate: "畢業門檻",
  global: "外商 / 國際職場",
  study: "交換 / 留學準備",
};

const segmentSelect = document.querySelector("#segmentSelect");
const sourceSelect = document.querySelector("#sourceSelect");
const examWindowSelect = document.querySelector("#examWindowSelect");
const scoreInput = document.querySelector("#scoreInput");
const goalSelect = document.querySelector("#goalSelect");
const appKpis = document.querySelector("#appKpis");
const retentionGrid = document.querySelector("#retentionGrid");
const actionList = document.querySelector("#actionList");
const appFunnel = document.querySelector("#appFunnel");
const riskTable = document.querySelector("#riskTable");
const personaTitle = document.querySelector("#personaTitle");
const personaDescription = document.querySelector("#personaDescription");
const scoreDisplay = document.querySelector("#scoreDisplay");
const scoreBandLabel = document.querySelector("#scoreBandLabel");
const benchmark = document.querySelector("#benchmark");
const dnaBars = document.querySelector("#dnaBars");
const unlockGrid = document.querySelector("#unlockGrid");
const taskGrid = document.querySelector("#taskGrid");
const copyReport = document.querySelector("#copyReport");
const printReport = document.querySelector("#printReport");

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function pct(value) {
  return `${Math.round(value * 1000) / 10}%`;
}

function currentAppModel() {
  const segment = segmentModels[segmentSelect.value];
  const source = sourceModifiers[sourceSelect.value];
  const window = windowModifiers[examWindowSelect.value];
  const users = Math.round(segment.baseUsers * source.users);
  const activation = clamp(0.62 * source.activation * window.activation, 0.1, 0.96);
  const retention = segment.retention.map((value) => clamp(value * source.retention * window.retention, 0.03, 0.96));
  const health = Math.round(clamp(segment.health * window.health, 1, 100));
  const examIntent = clamp(segment.examIntent * source.intent * window.intent, 0.03, 0.9);
  const diagnosis = Math.round(users * activation);
  const learning = Math.round(diagnosis * retention[1]);
  const mockExam = Math.round(learning * 0.48);
  const registration = Math.round(mockExam * examIntent);
  return { segment, source, window, users, activation, retention, health, examIntent, diagnosis, learning, mockExam, registration };
}

function currentAbility() {
  const score = clamp(Number(scoreInput.value) || 620, 10, 990);
  const listen = clamp(38 + score * 0.055 + (goalSelect.value === "global" ? 8 : 0), 5, 98);
  const vocab = clamp(34 + score * 0.058 + (goalSelect.value === "job" ? 8 : 0), 5, 98);
  const reading = clamp(28 + score * 0.06 + (goalSelect.value === "study" ? 8 : 0), 5, 98);
  const grammar = clamp(36 + score * 0.052, 5, 98);
  const inference = clamp(25 + score * 0.058, 5, 98);
  const workplace = clamp(30 + score * 0.06 + (goalSelect.value === "job" ? 6 : 0), 5, 98);
  const percentile = clamp(Math.round((score - 250) / 7.2), 8, 96);
  return { score, listen, vocab, reading, grammar, inference, workplace, percentile };
}

function personaFor(score) {
  if (score >= 860) return ["國際職場溝通者", "你已能處理多數職場英文任務，下一步應該轉向口說、寫作與真實工作輸出。", "CEFR B2-C1 區間"];
  if (score >= 730) return ["外商履歷衝刺者", "你具備進入國際職場的基礎，適合把能力包裝成履歷、面試與職務情境。", "CEFR B2 區間"];
  if (score >= 550) return ["職場會議觀察者", "你能理解常見商務情境，但仍需要提升閱讀耐力與快速聽力反應。", "CEFR B1-B2 區間"];
  if (score >= 350) return ["英文信心建立者", "你已經有起步基礎，適合用短任務建立信心，不要一開始就被長篇閱讀壓垮。", "CEFR A2-B1 區間"];
  return ["低壓力起步者", "你需要更小單位的任務和即時回饋，先建立每日練習習慣會比追分更重要。", "CEFR A1-A2 區間"];
}

function renderAppKpis(model) {
  const kpis = [
    ["安裝用戶", model.users.toLocaleString("zh-TW"), model.source.label],
    ["完成診斷", model.diagnosis.toLocaleString("zh-TW"), pct(model.activation)],
    ["D7 留存", pct(model.retention[1]), "核心黏著"],
    ["D30 留存", pct(model.retention[3]), "長期留存"],
    ["學習健康分", model.health, "Health Score"],
    ["預估報名", model.registration.toLocaleString("zh-TW"), pct(model.examIntent)],
  ];
  appKpis.innerHTML = kpis.map(([label, value, note]) => `<article class="kpi"><span>${label}</span><strong>${value}</strong><span>${note}</span></article>`).join("");
}

function renderRetention(model) {
  const rows = [
    ["D1", model.retention[0]],
    ["D7", model.retention[1]],
    ["D14", model.retention[2]],
    ["D30", model.retention[3]],
  ];
  retentionGrid.innerHTML = rows
    .map(
      ([label, value]) => `
        <div class="cohort-card">
          <strong>${label} 留存</strong>
          <div class="cohort-bar"><div class="cohort-fill" style="width:${value * 100}%"></div></div>
          <p>${pct(value)} 用戶回到 App 練習或查看報告</p>
        </div>
      `,
    )
    .join("");
}

function renderActions(model) {
  const actions = [
    ["低信心用戶", "推 7 天低壓力單字任務，先建立完成感。"],
    ["高意願用戶", "推模考排程與正式測驗日期提醒。"],
    ["D3 未回訪", "推送個人弱點摘要，不直接催報名。"],
    ["完成模考", "產出英語力報告並導到顧問諮詢或教材包。"],
  ];
  if (model.health > 75) actions.unshift(["高健康分族群", "適合測試進階模考、S&W 或職涯工作坊轉換。"]);
  actionList.innerHTML = actions.map(([title, body]) => `<div class="action-card"><strong>${title}</strong><span>${body}</span></div>`).join("");
}

function renderFunnel(model) {
  const stages = [
    ["App 安裝", model.users],
    ["完成落點診斷", model.diagnosis],
    ["開始學習任務", model.learning],
    ["完成模考", model.mockExam],
    ["點擊正式報名", model.registration],
  ];
  const max = stages[0][1] || 1;
  appFunnel.innerHTML = stages
    .map(
      ([label, value]) => `
        <div class="funnel-row">
          <strong>${label}</strong>
          <div class="funnel-bar"><div class="funnel-fill" style="width:${(value / max) * 100}%"></div></div>
          <span>${value.toLocaleString("zh-TW")}</span>
        </div>
      `,
    )
    .join("");
}

function renderRisk(model) {
  const riskRows = [
    ["只看報告未練習", model.retention[1] < 0.42 ? "高" : "中", "給 3 題弱點快測，不直接推長任務。"],
    ["錯題率高且未回訪", model.health < 60 ? "高" : "中", "推錯題整理與低壓提示。"],
    ["完成模考未報名", model.examIntent > 0.38 ? "低" : "中", "推測驗日期、考場與優惠提醒。"],
    ["連續學習 5 天以上", "低", "推進階模考、口說或履歷工作坊。"],
  ];
  riskTable.innerHTML = riskRows
    .map(([title, risk, body]) => {
      const color = risk === "高" ? "var(--red)" : risk === "中" ? "var(--orange)" : "var(--teal)";
      return `<div class="risk-row"><div><strong>${title}</strong><span>${body}</span></div><span class="risk-tag" style="background:${color}">${risk}風險</span></div>`;
    })
    .join("");
}

function renderAbility(ability, model) {
  const [title, desc, band] = personaFor(ability.score);
  personaTitle.textContent = title;
  personaDescription.textContent = `${desc} ${model.segment.personaBias}`;
  scoreDisplay.textContent = ability.score;
  scoreBandLabel.textContent = band;
  benchmark.innerHTML = `
    <div class="benchmark-row">
      <strong>同齡百分位</strong>
      <div class="benchmark-track"><div class="benchmark-fill" style="width:${ability.percentile}%"></div></div>
      <span>${ability.percentile}%</span>
    </div>
    <p>你的整體英語力高於模擬同齡族群 ${ability.percentile}% 的學習者。這個比較可作為報告分享與顧問討論入口。</p>
  `;
  const dna = [
    ["聽力反應", ability.listen],
    ["商務單字", ability.vocab],
    ["閱讀耐力", ability.reading],
    ["文法穩定", ability.grammar],
    ["推論理解", ability.inference],
    ["職場應用", ability.workplace],
  ];
  dnaBars.innerHTML = dna
    .map(
      ([label, value]) => `
        <div class="dna-row">
          <strong>${label}</strong>
          <div class="dna-track"><div class="dna-fill" style="width:${value}%"></div></div>
          <span>${Math.round(value)}</span>
        </div>
      `,
    )
    .join("");
  const unlocks = [
    ["讀懂基礎 email", 350, "能掌握常見通知、短訊息與簡單職場往來。"],
    ["理解會議大意", 550, "能理解會議主題、任務分派與常見商務對話。"],
    ["處理英文履歷", 650, "可把英文能力轉成履歷與面試素材。"],
    ["閱讀商務文件", 730, "能處理較長文件、專案摘要與跨部門溝通內容。"],
    ["外商面試準備", 800, "適合銜接口說、寫作與情境演練。"],
    ["國際職場輸出", 860, "可往簡報、談判、跨國協作與 S&W 方向延伸。"],
  ];
  unlockGrid.innerHTML = unlocks
    .map(([title, threshold, body]) => {
      const unlocked = ability.score >= threshold;
      return `<div class="unlock-card ${unlocked ? "" : "locked"}"><strong>${unlocked ? "已解鎖" : "待解鎖"}：${title}</strong><span>${body}</span></div>`;
    })
    .join("");
}

function renderTasks(ability) {
  const weak = [
    ["聽力反應", ability.listen],
    ["商務單字", ability.vocab],
    ["閱讀耐力", ability.reading],
    ["推論理解", ability.inference],
  ].sort((a, b) => a[1] - b[1]);
  const tasks = [
    [`7 天 ${weak[0][0]} 快修`, "每天 10 分鐘，先做短題與即時回饋，建立回訪習慣。"],
    [`14 天 ${weak[1][0]} 任務`, "搭配錯題收藏與間隔複習，觀察正確率是否連續提升。"],
    ["21 天模考衝刺", "完成一次完整模考，產出新版英語力報告並引導正式報名。"],
  ];
  taskGrid.innerHTML = tasks.map(([title, body]) => `<div class="task-card"><strong>${title}</strong><span>${body}</span></div>`).join("");
}

function reportText(model, ability) {
  const [title] = personaFor(ability.score);
  return [
    "TOEIC Pal 留存與英語力報告摘要",
    `用戶分群：${model.segment.label}`,
    `來源渠道：${model.source.label}`,
    `D7 留存：${pct(model.retention[1])}`,
    `學習健康分：${model.health}`,
    `預估正式報名：${model.registration}`,
    `英語力角色：${title}`,
    `目前 TOEIC 分數：${ability.score}`,
    `同齡百分位：${ability.percentile}%`,
    `目標情境：${goalText[goalSelect.value]}`,
  ].join("\n");
}

function renderAll() {
  const model = currentAppModel();
  const ability = currentAbility();
  renderAppKpis(model);
  renderRetention(model);
  renderActions(model);
  renderFunnel(model);
  renderRisk(model);
  renderAbility(ability, model);
  renderTasks(ability);
}

[segmentSelect, sourceSelect, examWindowSelect, scoreInput, goalSelect].forEach((control) => control.addEventListener("input", renderAll));
printReport.addEventListener("click", () => window.print());
copyReport.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(reportText(currentAppModel(), currentAbility()));
    copyReport.textContent = "已複製";
  } catch {
    copyReport.textContent = "複製失敗";
  }
  setTimeout(() => {
    copyReport.textContent = "複製報告摘要";
  }, 1200);
});

renderAll();
