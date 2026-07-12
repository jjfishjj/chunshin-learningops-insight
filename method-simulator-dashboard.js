const scenarioData = {
  campus: {
    label: "校園推廣",
    description: "模擬大學校園推廣情境，提升學生參與與報名成效。",
    bottlenecks: { awareness: 3.3, motivation: 8.7, execution: 4.1, conversion: 3.8, retention: 4.2 },
    main: "學習動機不足",
    secondary: "活動後追蹤不明確",
    avoid: "直接硬推報名或一次開很多活動主題",
    methods: ["記憶法多益單字挑戰", "AI 英文履歷工作坊", "多益落點診斷問卷"],
    kpis: { signups: 1248, arrival: 0.587, survey: 0.724, intent: 0.639, followup: 0.382, returnRate: 0.221 },
  },
  enterprise: {
    label: "企業團測",
    description: "模擬企業團測與 HR 語言能力管理需求。",
    bottlenecks: { awareness: 5.2, motivation: 5.8, execution: 7.6, conversion: 4.4, retention: 3.9 },
    main: "企業內部推進流程不清",
    secondary: "HR 缺少可說服主管的資料",
    avoid: "只提供測驗資訊，沒有職務情境與成效回報",
    methods: ["職務英語需求盤點", "部門分層團測提案", "主管報告模板"],
    kpis: { signups: 420, arrival: 0.72, survey: 0.81, intent: 0.58, followup: 0.49, returnRate: 0.28 },
  },
  activity: {
    label: "活動成效",
    description: "模擬講座、工作坊、挑戰賽等活動投入與回饋。",
    bottlenecks: { awareness: 6.4, motivation: 7.2, execution: 5.5, conversion: 4.6, retention: 4.8 },
    main: "活動吸引力足夠但轉換設計不足",
    secondary: "活動後缺少清楚下一步",
    avoid: "活動結束後只看到場率，沒有意願與回流追蹤",
    methods: ["活動前落點問卷", "現場微挑戰", "活動後 14 天追蹤"],
    kpis: { signups: 860, arrival: 0.63, survey: 0.76, intent: 0.61, followup: 0.34, returnRate: 0.19 },
  },
  consultant: {
    label: "顧問推進",
    description: "模擬顧問如何根據資料判斷下一步與優先名單。",
    bottlenecks: { awareness: 4.8, motivation: 6.1, execution: 6.9, conversion: 5.7, retention: 5.2 },
    main: "顧問缺少優先順序與素材",
    secondary: "客戶狀態尚未被標籤化",
    avoid: "只靠顧問記憶追蹤，沒有下一步行動依據",
    methods: ["客戶狀態表", "下一步行動建議", "提案素材組合"],
    kpis: { signups: 318, arrival: 0.66, survey: 0.69, intent: 0.52, followup: 0.58, returnRate: 0.33 },
  },
  student: {
    label: "學生學習",
    description: "模擬學生端學習動機、落點診斷與路徑推薦。",
    bottlenecks: { awareness: 4.0, motivation: 8.1, execution: 3.7, conversion: 4.2, retention: 5.6 },
    main: "知道多益重要，但缺少開始學的入口",
    secondary: "不知道自己適合哪一種測驗或學習路徑",
    avoid: "只給單字表或報名連結，沒有降低心理門檻",
    methods: ["多益落點診斷問卷", "個人路徑推薦", "7 天微學習任務"],
    kpis: { signups: 980, arrival: 0.54, survey: 0.82, intent: 0.67, followup: 0.41, returnRate: 0.26 },
  },
};

const topicRows = [
  { topic: "英文學習痛點", value: 687 },
  { topic: "多益備考技巧", value: 312 },
  { topic: "留學申請準備", value: 187 },
  { topic: "職場英語應用", value: 62 },
];

const pathRows = [
  { label: "Bridge", value: 202, color: "#1f6fd1" },
  { label: "L&R", value: 224, color: "#0b8c86" },
  { label: "S&W", value: 103, color: "#e87817" },
];

const trendRows = [
  { day: "Day 1", personal: 168, material: 89, consult: 28 },
  { day: "Day 3", personal: 142, material: 81, consult: 26 },
  { day: "Day 5", personal: 118, material: 67, consult: 23 },
  { day: "Day 7", personal: 101, material: 55, consult: 20 },
  { day: "Day 10", personal: 86, material: 46, consult: 17 },
  { day: "Day 14", personal: 70, material: 34, consult: 12 },
];

const consultantRows = [
  ["陳同學", "國立台北大學", "待聯繫", "發送測驗介紹與時程"],
  ["李同學", "輔仁大學", "已回覆", "預約落點諮詢"],
  ["王同學", "東吳大學", "已回覆", "提供測驗方案建議"],
  ["張同學", "淡江大學", "待追蹤", "3 天內再次聯繫"],
  ["林同學", "中原大學", "已預約", "確認測驗日期與地點"],
];

const manpowerBase = {
  small: [
    ["專案負責 / 方法學統籌", 18],
    ["語言學習顧問", 16],
    ["資料分析 / Dashboard", 14],
    ["活動企劃執行", 18],
    ["內容設計", 12],
  ],
  medium: [
    ["專案負責 / 方法學統籌", 30],
    ["語言學習顧問", 28],
    ["資料分析 / Dashboard", 24],
    ["校園 BD / 顧問推進", 30],
    ["活動企劃執行", 32],
    ["內容設計", 20],
  ],
  large: [
    ["專案負責 / 方法學統籌", 46],
    ["語言學習顧問", 42],
    ["資料分析 / Dashboard", 38],
    ["校園 BD / 顧問推進", 52],
    ["活動企劃執行", 56],
    ["內容設計", 32],
    ["前端 / 系統串接", 28],
  ],
};

const scenarioCards = document.querySelector("#scenarioCards");
const setupSummary = document.querySelector("#setupSummary");
const targetSelect = document.querySelector("#targetSelect");
const scaleSelect = document.querySelector("#scaleSelect");
const listSelect = document.querySelector("#listSelect");
const goalSelect = document.querySelector("#goalSelect");
const bottleneckBars = document.querySelector("#bottleneckBars");
const judgementCard = document.querySelector("#judgementCard");
const methodList = document.querySelector("#methodList");
const kpiStrip = document.querySelector("#kpiStrip");
const funnelChart = document.querySelector("#funnelChart");
const topicChart = document.querySelector("#topicChart");
const pathDonut = document.querySelector("#pathDonut");
const trendChart = document.querySelector("#trendChart");
const consultantTable = document.querySelector("#consultantTable");
const insights = document.querySelector("#insights");
const reportBlocks = document.querySelector("#reportBlocks");
const howList = document.querySelector("#howList");
const planList = document.querySelector("#planList");
const staffList = document.querySelector("#staffList");
const viewSelect = document.querySelector("#viewSelect");
const copyReport = document.querySelector("#copyReport");
const downloadSummary = document.querySelector("#downloadSummary");
const startSimulation = document.querySelector("#startSimulation");

let activeScenario = "campus";

function pct(value) {
  return `${Math.round(value * 1000) / 10}%`;
}

function renderScenarioCards() {
  scenarioCards.innerHTML = Object.entries(scenarioData)
    .map(
      ([key, item]) => `
        <button class="scenario-card ${key === activeScenario ? "active" : ""}" type="button" data-scenario="${key}">
          <strong>${item.label}</strong>
          <p>${item.description}</p>
        </button>
      `,
    )
    .join("");
  scenarioCards.querySelectorAll(".scenario-card").forEach((card) => {
    card.addEventListener("click", () => {
      activeScenario = card.dataset.scenario;
      renderAll();
      document.querySelector("#diagnosis").scrollIntoView({ behavior: "smooth" });
    });
  });
}

function renderSetup() {
  const scenario = scenarioData[activeScenario];
  const targetText = targetSelect.options[targetSelect.selectedIndex].text;
  const scaleText = scaleSelect.options[scaleSelect.selectedIndex].text;
  const listText = listSelect.options[listSelect.selectedIndex].text;
  const goalText = goalSelect.options[goalSelect.selectedIndex].text;
  setupSummary.innerHTML = `
    <div><dt>推進情境</dt><dd>${scenario.label}</dd></div>
    <div><dt>推廣對象</dt><dd>${targetText}</dd></div>
    <div><dt>活動規模</dt><dd>${scaleText}</dd></div>
    <div><dt>名單基礎</dt><dd>${listText}</dd></div>
    <div><dt>最想驗證</dt><dd>${goalText}</dd></div>
  `;
}

function renderDiagnosis() {
  const scenario = scenarioData[activeScenario];
  const labels = {
    awareness: "認知",
    motivation: "動機",
    execution: "行動",
    conversion: "轉換",
    retention: "回流",
  };
  bottleneckBars.innerHTML = Object.entries(scenario.bottlenecks)
    .map(([key, value]) => {
      const color = value > 7 ? "#c83f3b" : value > 5 ? "#e87817" : "#0b8c86";
      return `
        <div class="bar-row">
          <div class="bar-label">${labels[key]}</div>
          <div class="bar-track"><div class="bar-fill" style="width:${value * 10}%; background:${color}"></div></div>
          <strong>${value.toFixed(1)}</strong>
        </div>
      `;
    })
    .join("");
  judgementCard.innerHTML = `
    <strong>系統判斷：${scenario.main}</strong>
    <p>次要卡點：${scenario.secondary}</p>
    <p>不建議先做：${scenario.avoid}</p>
  `;
  methodList.innerHTML = scenario.methods.map((method) => `<li>${method}</li>`).join("");
}

function adjustedKpis() {
  const base = scenarioData[activeScenario].kpis;
  const scaleFactor = { small: 0.52, medium: 1, large: 1.85 }[scaleSelect.value];
  const listFactor = { none: 0.78, partial: 1, ready: 1.16 }[listSelect.value];
  const signups = Math.round(base.signups * scaleFactor * listFactor);
  return {
    signups,
    arrival: base.arrival,
    survey: base.survey,
    intent: base.intent,
    followup: base.followup,
    returnRate: base.returnRate,
    arrived: Math.round(signups * base.arrival),
    completed: Math.round(signups * base.arrival * base.survey),
    interested: Math.round(signups * base.arrival * base.survey * base.intent),
  };
}

function renderKpis() {
  const kpi = adjustedKpis();
  const items = [
    ["報名數", kpi.signups.toLocaleString("zh-TW"), "模擬"],
    ["到場率", pct(kpi.arrival), "較前期"],
    ["問卷完成率", pct(kpi.survey), "可判讀"],
    ["測驗意願率", pct(kpi.intent), "核心"],
    ["顧問跟進率", pct(kpi.followup), "追蹤"],
    ["回流率", pct(kpi.returnRate), "後續"],
  ];
  kpiStrip.innerHTML = items
    .map(([label, value, note]) => `<article class="kpi"><span>${label}</span><strong>${value}</strong><span>${note}</span></article>`)
    .join("");
}

function renderFunnel() {
  const kpi = adjustedKpis();
  const stages = [
    ["報名數", kpi.signups],
    ["到場數", kpi.arrived],
    ["問卷完成", kpi.completed],
    ["有意願進一步了解", kpi.interested],
  ];
  const max = stages[0][1] || 1;
  funnelChart.innerHTML = stages
    .map(
      ([label, value]) => `
        <div class="funnel-stage">
          <strong>${label}</strong>
          <div class="bar-track"><div class="funnel-fill" style="width:${(value / max) * 100}%"></div></div>
          <span>${value}</span>
        </div>
      `,
    )
    .join("");
}

function renderTopicChart() {
  const max = Math.max(...topicRows.map((row) => row.value));
  topicChart.innerHTML = topicRows
    .map(
      (row) => `
        <div class="topic-row">
          <strong>${row.topic}</strong>
          <div class="bar-track"><div class="bar-fill" style="width:${(row.value / max) * 100}%"></div></div>
          <span>${row.value}</span>
        </div>
      `,
    )
    .join("");
}

function renderDonut() {
  const total = pathRows.reduce((sum, row) => sum + row.value, 0);
  let offset = 25;
  const circles = pathRows
    .map((row) => {
      const share = (row.value / total) * 100;
      const circle = `<circle r="72" cx="115" cy="115" fill="transparent" stroke="${row.color}" stroke-width="30" stroke-dasharray="${share} ${100 - share}" stroke-dashoffset="${offset}" />`;
      offset -= share;
      return circle;
    })
    .join("");
  pathDonut.innerHTML = `
    <svg viewBox="0 0 520 245" role="img" aria-label="Recommended TOEIC path distribution">
      <g transform="rotate(-90 115 115)">${circles}</g>
      <text x="115" y="110" text-anchor="middle" font-size="20" font-weight="900" fill="#172033">總計</text>
      <text x="115" y="136" text-anchor="middle" font-size="17" fill="#627085">${total} 份問卷</text>
      ${pathRows
        .map((row, index) => {
          const y = 72 + index * 34;
          return `<rect x="260" y="${y - 15}" width="16" height="16" fill="${row.color}" /><text x="286" y="${y}" fill="#172033" font-size="16">${row.label} ${pct(row.value / total)}</text>`;
        })
        .join("")}
    </svg>
  `;
}

function renderTrend() {
  const width = 520;
  const height = 245;
  const max = 180;
  const series = [
    ["personal", "#1f6fd1"],
    ["material", "#0b8c86"],
    ["consult", "#e87817"],
  ];
  const polylines = series
    .map(([key, color]) => {
      const points = trendRows
        .map((row, index) => {
          const x = 28 + (index / (trendRows.length - 1)) * (width - 56);
          const y = height - 28 - (row[key] / max) * (height - 58);
          return `${x},${y}`;
        })
        .join(" ");
      return `<polyline points="${points}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />`;
    })
    .join("");
  trendChart.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="14 day follow-up trend">
      <line x1="28" y1="205" x2="492" y2="205" stroke="#dbe4ef" />
      <line x1="28" y1="135" x2="492" y2="135" stroke="#dbe4ef" />
      <line x1="28" y1="65" x2="492" y2="65" stroke="#dbe4ef" />
      ${polylines}
    </svg>
  `;
}

function renderConsultants() {
  consultantTable.innerHTML = `
    <thead><tr><th>對象</th><th>來源</th><th>狀態</th><th>下一步</th></tr></thead>
    <tbody>
      ${consultantRows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}
    </tbody>
  `;
}

function renderInsights() {
  const scenario = scenarioData[activeScenario];
  const kpi = adjustedKpis();
  const items = [
    ["主要卡點", `${scenario.main}，建議把活動起點放在降低參與門檻與建立學習信心。`],
    ["資料判讀", `目前模擬有 ${kpi.interested} 人具備進一步了解意願，可交由顧問分批追蹤。`],
    ["建議關注", "不要只看報名數，需同時追蹤到場、問卷完成、測驗意願、回流與顧問下一步。"],
  ];
  insights.innerHTML = items.map(([title, body]) => `<div class="insight"><strong>${title}</strong><span>${body}</span></div>`).join("");
}

function renderReport() {
  const scenario = scenarioData[activeScenario];
  const kpi = adjustedKpis();
  const blocks = [
    ["一、情境摘要", `目前模擬情境為「${scenario.label}」，推廣對象為 ${targetSelect.options[targetSelect.selectedIndex].text}。`],
    ["二、主要卡點判斷", `主要卡點是「${scenario.main}」，次要卡點是「${scenario.secondary}」。`],
    ["三、建議測試方法", `建議先測：${scenario.methods.join("、")}。`],
    ["四、追蹤指標", `報名 ${kpi.signups}、到場率 ${pct(kpi.arrival)}、問卷完成率 ${pct(kpi.survey)}、測驗意願率 ${pct(kpi.intent)}。`],
    ["五、下一步建議", "先做小範圍驗證，再依資料判讀決定是否擴大，不以短期營收承諾作為提案主軸。"],
  ];
  reportBlocks.innerHTML = blocks.map(([title, body]) => `<div class="report-block"><strong>${title}</strong><span>${body}</span></div>`).join("");
}

function renderExecutionSummary() {
  const scenario = scenarioData[activeScenario];
  howList.innerHTML = [
    "先選一個明確情境與目標族群。",
    "用問卷或小型活動收集卡點與意願資料。",
    "用 Dashboard 判斷哪個主題、說法與活動入口值得擴大。",
    "把結果轉成顧問行動清單與下一輪測試。",
  ]
    .map((item) => `<li>${item}</li>`)
    .join("");
  planList.innerHTML = [
    `設計「${scenario.methods[0]}」作為第一個驗證活動。`,
    "建立報名、到場、問卷、意願、跟進、回流欄位。",
    "產出活動後 14 天追蹤報表。",
    "整理顧問話術、名單狀態與下一步建議。",
  ]
    .map((item) => `<li>${item}</li>`)
    .join("");
  staffList.innerHTML = manpowerBase[scaleSelect.value]
    .map(([role, hours]) => `<div class="staff-row"><strong>${role}</strong><span>${hours}h</span></div>`)
    .join("");
}

function reportText() {
  const scenario = scenarioData[activeScenario];
  const kpi = adjustedKpis();
  return [
    "多益推進方法學模擬摘要",
    `情境：${scenario.label}`,
    `主要卡點：${scenario.main}`,
    `建議方法：${scenario.methods.join("、")}`,
    `模擬 KPI：報名 ${kpi.signups}、到場率 ${pct(kpi.arrival)}、問卷完成率 ${pct(kpi.survey)}、測驗意願率 ${pct(kpi.intent)}`,
    "下一步：先做小範圍方法學驗證，再依資料結果決定是否擴大。",
  ].join("\n");
}

function download(filename, text) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function renderAll() {
  renderScenarioCards();
  renderSetup();
  renderDiagnosis();
  renderKpis();
  renderFunnel();
  renderTopicChart();
  renderDonut();
  renderTrend();
  renderConsultants();
  renderInsights();
  renderReport();
  renderExecutionSummary();
}

[targetSelect, scaleSelect, listSelect, goalSelect, viewSelect].forEach((control) => {
  control.addEventListener("change", renderAll);
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

copyReport.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(reportText());
    copyReport.textContent = "已複製";
  } catch {
    download("toeic-method-simulator-summary.txt", reportText());
    copyReport.textContent = "已下載";
  }
  setTimeout(() => {
    copyReport.textContent = "複製摘要";
  }, 1200);
});

downloadSummary.addEventListener("click", () => download("toeic-method-simulator-summary.txt", reportText()));
startSimulation.addEventListener("click", () => document.querySelector("#scenario").scrollIntoView({ behavior: "smooth" }));

renderAll();
