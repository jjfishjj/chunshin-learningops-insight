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

const targetModifiers = {
  university: {
    signups: 1,
    rates: { arrival: 1, survey: 1, intent: 1, followup: 1, returnRate: 1 },
    bottlenecks: { awareness: 0, motivation: 0, execution: 0, conversion: 0, retention: 0 },
    note: "大學生族群可先用職涯、畢業門檻與同儕活動切入。",
  },
  freshman: {
    signups: 0.86,
    rates: { arrival: 0.94, survey: 1.08, intent: 0.91, followup: 0.88, returnRate: 1.04 },
    bottlenecks: { awareness: 0.4, motivation: 0.8, execution: -0.1, conversion: 0.4, retention: -0.2 },
    note: "大一到大二較早期，適合先建立英文學習好感與低壓力參與。",
  },
  senior: {
    signups: 1.12,
    rates: { arrival: 1.05, survey: 0.98, intent: 1.12, followup: 1.08, returnRate: 0.94 },
    bottlenecks: { awareness: -0.2, motivation: -0.5, execution: 0.3, conversion: 0.8, retention: 0.2 },
    note: "大三到大四職涯壓力較明確，需把活動導向測驗路徑與顧問跟進。",
  },
  enterprise: {
    signups: 0.72,
    rates: { arrival: 1.1, survey: 1.03, intent: 0.94, followup: 1.22, returnRate: 1.1 },
    bottlenecks: { awareness: 0.6, motivation: -0.2, execution: 1.2, conversion: 0.7, retention: 0.1 },
    note: "企業端重點在 HR 採用、主管說服、部門流程與成效回報。",
  },
};

const scaleModifiers = {
  small: {
    signups: 0.52,
    rates: { arrival: 1.12, survey: 1.08, intent: 1.04, followup: 1.18, returnRate: 1.12 },
    bottlenecks: { awareness: -0.2, motivation: -0.1, execution: -0.7, conversion: -0.3, retention: -0.2 },
  },
  medium: {
    signups: 1,
    rates: { arrival: 1, survey: 1, intent: 1, followup: 1, returnRate: 1 },
    bottlenecks: { awareness: 0, motivation: 0, execution: 0, conversion: 0, retention: 0 },
  },
  large: {
    signups: 1.85,
    rates: { arrival: 0.88, survey: 0.91, intent: 0.92, followup: 0.82, returnRate: 0.84 },
    bottlenecks: { awareness: 0.2, motivation: 0.1, execution: 1.1, conversion: 0.7, retention: 0.5 },
  },
};

const listModifiers = {
  none: {
    signups: 0.78,
    rates: { arrival: 0.9, survey: 0.96, intent: 0.92, followup: 0.74, returnRate: 0.82 },
    bottlenecks: { awareness: 0.9, motivation: 0.2, execution: 0.3, conversion: 0.8, retention: 0.5 },
  },
  partial: {
    signups: 1,
    rates: { arrival: 1, survey: 1, intent: 1, followup: 1, returnRate: 1 },
    bottlenecks: { awareness: 0, motivation: 0, execution: 0, conversion: 0, retention: 0 },
  },
  ready: {
    signups: 1.16,
    rates: { arrival: 1.05, survey: 1.04, intent: 1.06, followup: 1.18, returnRate: 1.13 },
    bottlenecks: { awareness: -0.8, motivation: -0.1, execution: -0.2, conversion: -0.5, retention: -0.3 },
  },
};

const goalModifiers = {
  message: {
    bottlenecks: { awareness: 0.9, motivation: 0.1, execution: 0, conversion: 0.2, retention: 0 },
    method: "訊息 A/B 測試與表單開啟率追蹤",
  },
  activity: {
    bottlenecks: { awareness: 0.1, motivation: 0.8, execution: 0.3, conversion: 0.1, retention: 0 },
    method: "兩種活動主題小樣本測試",
  },
  conversion: {
    bottlenecks: { awareness: -0.1, motivation: 0.1, execution: 0.2, conversion: 1, retention: 0.2 },
    method: "活動後測驗路徑 CTA 測試",
  },
  followup: {
    bottlenecks: { awareness: 0, motivation: 0, execution: 0.3, conversion: 0.4, retention: 1 },
    method: "顧問分眾追蹤與 14 天回流測試",
  },
};

const difficultyModifiers = {
  engagement: {
    label: "學生參與度不足",
    bottlenecks: { awareness: 0.1, motivation: 0.9, execution: 0.1, conversion: 0.2, retention: 0.2 },
    rates: { arrival: 0.97, survey: 0.98, intent: 0.93, followup: 0.96, returnRate: 0.96 },
  },
  registration: {
    label: "報名轉換率低",
    bottlenecks: { awareness: 0.3, motivation: 0.3, execution: 0.1, conversion: 0.9, retention: 0.1 },
    rates: { arrival: 0.98, survey: 1, intent: 0.94, followup: 0.95, returnRate: 0.96 },
  },
  reach: {
    label: "訊息觸及不足",
    bottlenecks: { awareness: 0.9, motivation: 0.1, execution: 0.2, conversion: 0.2, retention: 0 },
    signups: 0.9,
    rates: { arrival: 0.98, survey: 1, intent: 0.98, followup: 0.97, returnRate: 0.98 },
  },
  measurement: {
    label: "活動成效不明",
    bottlenecks: { awareness: 0, motivation: 0.2, execution: 0.8, conversion: 0.5, retention: 0.4 },
    rates: { arrival: 1, survey: 0.94, intent: 0.97, followup: 0.92, returnRate: 0.94 },
  },
  resource: {
    label: "資源 / 預算有限",
    bottlenecks: { awareness: 0.1, motivation: 0, execution: 0.9, conversion: 0.3, retention: 0.3 },
    signups: 0.92,
    rates: { arrival: 1.03, survey: 1.02, intent: 1.01, followup: 0.97, returnRate: 0.98 },
  },
  other: {
    label: "其他",
    bottlenecks: { awareness: 0.2, motivation: 0.2, execution: 0.2, conversion: 0.2, retention: 0.2 },
    rates: { arrival: 1, survey: 1, intent: 1, followup: 1, returnRate: 1 },
  },
};

const pushMethodModifiers = {
  lecture: {
    label: "講座 / 說明會",
    signups: 1.08,
    rates: { arrival: 1.02, survey: 1.01, intent: 1.03, followup: 1, returnRate: 0.98 },
    boost: { "AI 英文履歷工作坊": 2, "多益落點診斷問卷": 1 },
  },
  class: {
    label: "班級推薦",
    signups: 1.04,
    rates: { arrival: 1.06, survey: 1.02, intent: 1.01, followup: 1.02, returnRate: 1 },
    boost: { "記憶法多益單字挑戰": 1, "多益落點診斷問卷": 1 },
  },
  contest: {
    label: "競賽 / 挑戰賽",
    signups: 1.06,
    rates: { arrival: 0.98, survey: 1, intent: 1.05, followup: 0.98, returnRate: 1.03 },
    boost: { "記憶法多益單字挑戰": 3 },
  },
  online: {
    label: "線上活動",
    signups: 1.14,
    rates: { arrival: 0.93, survey: 1.06, intent: 1.01, followup: 1.04, returnRate: 1.07 },
    boost: { "多益落點診斷問卷": 2 },
  },
  club: {
    label: "社團聯合",
    signups: 1.08,
    rates: { arrival: 1.03, survey: 1.01, intent: 1.02, followup: 1.03, returnRate: 1.04 },
    boost: { "記憶法多益單字挑戰": 2, "AI 英文履歷工作坊": 1 },
  },
  other: {
    label: "其他",
    signups: 1,
    rates: { arrival: 1, survey: 1, intent: 1, followup: 1, returnRate: 1 },
    boost: {},
  },
};

const methodProfiles = {
  "記憶法多益單字挑戰": {
    icon: "ABC",
    fit: { awareness: 2, motivation: 4, execution: 2, conversion: 1, retention: 2 },
    reason: "單字是入門門檻，遊戲化挑戰可快速吸引學生參與，降低初始學習阻力。",
    observation: "參與率、每日活躍率、單字測驗完成率與分享率。",
    audience: "大一新生、對英文學習缺乏信心、喜歡輕量與遊戲化活動的學生。",
    materials: "單字題庫、挑戰規則、報名後獎勵機制與社團協作素材。",
    scores: [5, 3, 3, 4],
  },
  "AI 英文履歷工作坊": {
    icon: "CV",
    fit: { awareness: 2, motivation: 3, execution: 3, conversion: 4, retention: 3 },
    reason: "結合職涯需求，讓學生看見英文學習與未來工作之間的直接關聯。",
    observation: "報名率、出席率、履歷產出率、後續諮詢或課程轉換率。",
    audience: "大二到大四、關注實習與求職、需要履歷優化的學生。",
    materials: "履歷範本、AI 履歷診斷工具、教學簡報與案例分享。",
    scores: [4, 3, 4, 4],
  },
  "多益落點診斷問卷": {
    icon: "Q",
    fit: { awareness: 3, motivation: 2, execution: 4, conversion: 5, retention: 4 },
    reason: "透過短問卷讓學生了解自己的程度落點，建立學習動機並引導後續課程推薦。",
    observation: "問卷完成率、診斷報告開啟率、課程推薦點擊率與預約率。",
    audience: "所有年級、尚未考過多益或想了解自身程度的學生。",
    materials: "診斷問卷、結果頁面、課程推薦內容與顧問追蹤腳本。",
    scores: [3, 4, 5, 5],
  },
};

const chartSets = {
  activity: {
    topicTitle: "不同主題報名人數",
    donutTitle: "推薦測驗路徑分布",
    funnelTitle: "報名到意願轉換漏斗",
    trendTitle: "活動後 14 天追蹤互動趨勢",
  },
  stage: {
    topicTitle: "各轉換階段人數",
    donutTitle: "意願等級分布",
    funnelTitle: "完整轉換階段漏斗",
    trendTitle: "階段留存趨勢",
  },
  channel: {
    topicTitle: "不同觸及渠道成效",
    donutTitle: "渠道來源占比",
    funnelTitle: "渠道觸及到報名漏斗",
    trendTitle: "渠道互動衰退趨勢",
  },
};

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
const campusTargetSelect = document.querySelector("#campusTargetSelect");
const campusGoalSelect = document.querySelector("#campusGoalSelect");
const campusInputSummary = document.querySelector("#campusInputSummary");
const campusReminder = document.querySelector("#campusReminder");
const saveCampusDraft = document.querySelector("#saveCampusDraft");
const runCampusAnalysis = document.querySelector("#runCampusAnalysis");
const methodRecommendationLead = document.querySelector("#methodRecommendationLead");
const methodCards = document.querySelector("#methodCards");
const priorityOrder = document.querySelector("#priorityOrder");
const methodMatrix = document.querySelector("#methodMatrix");
const goDashboard = document.querySelector("#goDashboard");

let activeScenario = "campus";

function pct(value) {
  return `${Math.round(value * 1000) / 10}%`;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function rate(value) {
  return clamp(value, 0.05, 0.96);
}

function checkedValues(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map((input) => input.value);
}

function selectedRadioValue(name) {
  return document.querySelector(`input[name="${name}"]:checked`)?.value;
}

function combinedModifier(values, source) {
  return values.reduce(
    (combined, value) => {
      const modifier = source[value];
      if (!modifier) return combined;
      combined.signups *= modifier.signups || 1;
      Object.entries(modifier.rates || {}).forEach(([key, factor]) => {
        combined.rates[key] = (combined.rates[key] || 1) * factor;
      });
      Object.entries(modifier.bottlenecks || {}).forEach(([key, delta]) => {
        combined.bottlenecks[key] = (combined.bottlenecks[key] || 0) + delta;
      });
      return combined;
    },
    {
      signups: 1,
      rates: { arrival: 1, survey: 1, intent: 1, followup: 1, returnRate: 1 },
      bottlenecks: { awareness: 0, motivation: 0, execution: 0, conversion: 0, retention: 0 },
    },
  );
}

function selectedDifficultyModifier() {
  return combinedModifier(checkedValues("difficulty"), difficultyModifiers);
}

function selectedPushModifier() {
  return combinedModifier(checkedValues("pushMethod"), pushMethodModifiers);
}

function currentModifiers() {
  return [
    targetModifiers[targetSelect.value],
    scaleModifiers[scaleSelect.value],
    listModifiers[listSelect.value],
    goalModifiers[goalSelect.value],
    selectedDifficultyModifier(),
    selectedPushModifier(),
  ];
}

function adjustedBottlenecks() {
  const base = scenarioData[activeScenario].bottlenecks;
  const adjusted = { ...base };
  currentModifiers().forEach((modifier) => {
    Object.entries(modifier.bottlenecks || {}).forEach(([key, delta]) => {
      adjusted[key] = clamp((adjusted[key] || 0) + delta, 1, 10);
    });
  });
  return adjusted;
}

function strongestBottleneck() {
  const labels = {
    awareness: "認知不足",
    motivation: "主動動機不足",
    execution: "推進流程不清",
    conversion: "轉換設計不足",
    retention: "後續回流不足",
  };
  const entries = Object.entries(adjustedBottlenecks()).sort((a, b) => b[1] - a[1]);
  return { key: entries[0][0], label: labels[entries[0][0]], score: entries[0][1], second: labels[entries[1][0]] };
}

function suggestedAvoidText(key) {
  const avoidMap = {
    awareness: "直接辦大型活動，卻沒有先確認訊息是否能吸引目標族群",
    motivation: "直接硬推報名，沒有先降低學生對英文與測驗的心理門檻",
    execution: "一次整合太多流程，造成校方、顧問與活動端難以執行",
    conversion: "活動結束後只給報名連結，沒有設計下一步與測驗路徑",
    retention: "只做單次活動，沒有 7 到 14 天的回流與顧問追蹤",
  };
  return avoidMap[key];
}

function recommendedMethodRows() {
  const strongest = strongestBottleneck();
  const selectedMethods = checkedValues("pushMethod");
  const pushBoost = selectedMethods.reduce((boosts, value) => {
    Object.entries(pushMethodModifiers[value]?.boost || {}).forEach(([method, boost]) => {
      boosts[method] = (boosts[method] || 0) + boost;
    });
    return boosts;
  }, {});
  const goalBoost = {
    message: { "多益落點診斷問卷": 1, "記憶法多益單字挑戰": 1 },
    activity: { "記憶法多益單字挑戰": 2, "AI 英文履歷工作坊": 1 },
    conversion: { "多益落點診斷問卷": 2, "AI 英文履歷工作坊": 2 },
    followup: { "多益落點診斷問卷": 2, "AI 英文履歷工作坊": 1 },
  }[goalSelect.value];
  return Object.entries(methodProfiles)
    .map(([name, profile]) => ({
      name,
      ...profile,
      rankScore: (profile.fit[strongest.key] || 0) + (pushBoost[name] || 0) + (goalBoost[name] || 0),
    }))
    .sort((a, b) => b.rankScore - a.rankScore)
    .slice(0, 3);
}

function stars(score) {
  return `${"★".repeat(score)}${"☆".repeat(5 - score)}`;
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
      document.querySelector("#campus-settings").scrollIntoView({ behavior: "smooth" });
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

function syncCampusControls() {
  if (campusTargetSelect.value !== targetSelect.value) campusTargetSelect.value = targetSelect.value;
  if (campusGoalSelect.value !== goalSelect.value) campusGoalSelect.value = goalSelect.value;
  const scaleRadio = document.querySelector(`input[name="campusScale"][value="${scaleSelect.value}"]`);
  if (scaleRadio && !scaleRadio.checked) scaleRadio.checked = true;
  const listRadio = document.querySelector(`input[name="campusList"][value="${listSelect.value}"]`);
  if (listRadio && !listRadio.checked) listRadio.checked = true;
}

function renderCampusSettings() {
  syncCampusControls();
  const targetText = campusTargetSelect.options[campusTargetSelect.selectedIndex].text;
  const goalText = campusGoalSelect.options[campusGoalSelect.selectedIndex].text;
  const listText = document.querySelector(`input[name="campusList"][value="${listSelect.value}"]`)?.parentElement.textContent.trim() || "";
  const scaleText = document.querySelector(`input[name="campusScale"][value="${scaleSelect.value}"]`)?.parentElement.textContent.trim() || "";
  const difficulties = checkedValues("difficulty").map((value) => difficultyModifiers[value].label);
  const methods = checkedValues("pushMethod").map((value) => pushMethodModifiers[value].label);
  const strongest = strongestBottleneck();
  campusInputSummary.innerHTML = `
    <div><dt>推廣對象</dt><dd>${targetText}</dd></div>
    <div><dt>主要困難</dt><dd>${difficulties.join("、") || "尚未選擇"}</dd></div>
    <div><dt>推動形式</dt><dd>${methods.join("、") || "尚未選擇"}</dd></div>
    <div><dt>名單基礎</dt><dd>${listText}</dd></div>
    <div><dt>最想驗證</dt><dd>${goalText}</dd></div>
    <div><dt>活動規模</dt><dd>${scaleText}</dd></div>
  `;
  campusReminder.innerHTML = `
    <strong>系統提醒</strong>
    <ul>
      <li>目前最強卡點為「${strongest.label}」，下方卡點結構已同步更新。</li>
      <li>${targetModifiers[targetSelect.value].note}</li>
      <li>建議先選 1-2 個推動形式做小規模測試，再擴大到全校或跨系活動。</li>
    </ul>
  `;
}

function renderDiagnosis() {
  const scenario = scenarioData[activeScenario];
  const bottlenecks = adjustedBottlenecks();
  const strongest = strongestBottleneck();
  const labels = {
    awareness: "認知",
    motivation: "動機",
    execution: "行動",
    conversion: "轉換",
    retention: "回流",
  };
  bottleneckBars.innerHTML = Object.entries(bottlenecks)
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
    <strong>系統判斷：${strongest.label}</strong>
    <p>次要卡點：${strongest.second}</p>
    <p>參數影響：${targetModifiers[targetSelect.value].note}</p>
    <p>不建議先做：${suggestedAvoidText(strongest.key) || scenario.avoid}</p>
  `;
  const methods = [goalModifiers[goalSelect.value].method, ...recommendedMethodRows().map((method) => method.name), ...scenario.methods].filter(
    (method, index, arr) => arr.indexOf(method) === index,
  );
  methodList.innerHTML = methods.slice(0, 4).map((method) => `<li>${method}</li>`).join("");
}

function renderRecommendationMethods() {
  const rows = recommendedMethodRows();
  const strongest = strongestBottleneck();
  methodRecommendationLead.textContent = `以下方法依據目前「${scenarioData[activeScenario].label}」情境與「${strongest.label}」卡點排序，建議優先測試並用數據驗證成效。`;
  methodCards.innerHTML = rows
    .map(
      (method, index) => `
        <article class="method-card ${index === 0 ? "recommended" : ""}">
          <div class="method-icon">${method.icon}</div>
          <h3>${method.name}</h3>
          <div class="method-meta">
            <div>
              <strong>適用原因</strong>
              <p>${method.reason}</p>
            </div>
            <div>
              <strong>預期觀察</strong>
              <p>${method.observation}</p>
            </div>
            <div>
              <strong>適合族群</strong>
              <p>${method.audience}</p>
            </div>
            <div>
              <strong>需要準備的素材</strong>
              <p>${method.materials}</p>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
  priorityOrder.innerHTML = rows
    .map(
      (method, index) => `
        <li>
          <span>${index + 1}</span>
          <div>
            <strong>${method.name}</strong>
            <small>${method.reason}</small>
          </div>
        </li>
      `,
    )
    .join("");
  methodMatrix.innerHTML = `
    <thead>
      <tr>
        <th>評估面向</th>
        <th>吸引力（對學生）</th>
        <th>執行難度（對校方）</th>
        <th>後續轉換（課程 / 活動）</th>
        <th>資料可追蹤性</th>
      </tr>
    </thead>
    <tbody>
      ${rows
        .map(
          (method) => `
            <tr>
              <td><strong>${method.name}</strong></td>
              ${method.scores.map((score) => `<td><span class="score-stars">${stars(score)}</span></td>`).join("")}
            </tr>
          `,
        )
        .join("")}
    </tbody>
  `;
}

function adjustedKpis() {
  const base = scenarioData[activeScenario].kpis;
  const modifiers = currentModifiers();
  const signupFactor = modifiers.reduce((factor, modifier) => factor * (modifier.signups || 1), 1);
  const rateFactor = (key) => modifiers.reduce((factor, modifier) => factor * ((modifier.rates && modifier.rates[key]) || 1), 1);
  const signups = Math.round(base.signups * signupFactor);
  const arrival = rate(base.arrival * rateFactor("arrival"));
  const survey = rate(base.survey * rateFactor("survey"));
  const intent = rate(base.intent * rateFactor("intent"));
  const followup = rate(base.followup * rateFactor("followup"));
  const returnRate = rate(base.returnRate * rateFactor("returnRate"));
  return {
    signups,
    arrival,
    survey,
    intent,
    followup,
    returnRate,
    arrived: Math.round(signups * arrival),
    completed: Math.round(signups * arrival * survey),
    interested: Math.round(signups * arrival * survey * intent),
    followups: Math.round(signups * arrival * survey * intent * followup),
    returned: Math.round(signups * arrival * survey * intent * followup * returnRate),
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

function renderChartTitles() {
  const titles = chartSets[viewSelect.value];
  const cards = document.querySelectorAll(".chart-grid article h3");
  if (cards[0]) cards[0].textContent = titles.funnelTitle;
  if (cards[1]) cards[1].textContent = titles.topicTitle;
  if (cards[2]) cards[2].textContent = titles.donutTitle;
  if (cards[3]) cards[3].textContent = titles.trendTitle;
}

function renderFunnel() {
  const kpi = adjustedKpis();
  const stagesByView = {
    activity: [
      ["報名數", kpi.signups],
      ["到場數", kpi.arrived],
      ["問卷完成", kpi.completed],
      ["有意願進一步了解", kpi.interested],
    ],
    stage: [
      ["表單開啟", Math.round(kpi.signups * 1.42)],
      ["報名數", kpi.signups],
      ["到場數", kpi.arrived],
      ["問卷完成", kpi.completed],
      ["顧問跟進", kpi.followups],
      ["回流互動", kpi.returned],
    ],
    channel: [
      ["社群 / 校園觸及", Math.round(kpi.signups * 4.8)],
      ["表單開啟", Math.round(kpi.signups * 2.1)],
      ["活動報名", kpi.signups],
      ["到場互動", kpi.arrived],
    ],
  };
  const stages = stagesByView[viewSelect.value];
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

function adjustedTopicRows() {
  const kpi = adjustedKpis();
  const activityFactor = kpi.signups / scenarioData[activeScenario].kpis.signups;
  const view = viewSelect.value;
  if (view === "stage") {
    return [
      { topic: "報名", value: kpi.signups },
      { topic: "到場", value: kpi.arrived },
      { topic: "問卷完成", value: kpi.completed },
      { topic: "有意願", value: kpi.interested },
      { topic: "顧問跟進", value: kpi.followups },
      { topic: "回流", value: kpi.returned },
    ];
  }
  if (view === "channel") {
    const channelBase = [
      ["校園官方信件", 0.32],
      ["社團 / 系學會", 0.27],
      ["講座現場 QR", 0.22],
      ["同儕推薦", 0.13],
      ["廣告 / 貼文", 0.06],
    ];
    return channelBase.map(([topic, share]) => ({ topic, value: Math.round(kpi.signups * share) }));
  }
  return topicRows.map((row, index) => {
    const goalBoost = goalSelect.value === "activity" && index < 2 ? 1.16 : 1;
    const targetBoost = targetSelect.value === "senior" && row.topic.includes("職場") ? 2.4 : 1;
    return { topic: row.topic, value: Math.round(row.value * activityFactor * goalBoost * targetBoost) };
  });
}

function renderTopicChart() {
  const rows = adjustedTopicRows();
  const max = Math.max(...rows.map((row) => row.value), 1);
  topicChart.innerHTML = rows
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

function adjustedDonutRows() {
  const kpi = adjustedKpis();
  if (viewSelect.value === "stage") {
    return [
      { label: "高意願", value: Math.max(kpi.followups, 1), color: "#1f6fd1" },
      { label: "中意願", value: Math.max(kpi.interested - kpi.followups, 1), color: "#0b8c86" },
      { label: "待培養", value: Math.max(kpi.completed - kpi.interested, 1), color: "#e87817" },
    ];
  }
  if (viewSelect.value === "channel") {
    return [
      { label: "校園官方", value: Math.round(kpi.signups * 0.34), color: "#1f6fd1" },
      { label: "社團轉發", value: Math.round(kpi.signups * 0.28), color: "#0b8c86" },
      { label: "講座現場", value: Math.round(kpi.signups * 0.24), color: "#e87817" },
      { label: "同儕推薦", value: Math.round(kpi.signups * 0.14), color: "#7155b7" },
    ];
  }
  const pathFactor = kpi.completed / 529;
  return pathRows.map((row) => ({ ...row, value: Math.max(Math.round(row.value * pathFactor), 1) }));
}

function renderDonut() {
  const rows = adjustedDonutRows();
  const total = rows.reduce((sum, row) => sum + row.value, 0);
  let offset = 25;
  const circles = rows
    .map((row) => {
      const share = (row.value / total) * 100;
      const circle = `<circle r="72" cx="115" cy="115" fill="transparent" stroke="${row.color}" stroke-width="30" stroke-dasharray="${share} ${100 - share}" stroke-dashoffset="${offset}" />`;
      offset -= share;
      return circle;
    })
    .join("");
  const centerLabel = viewSelect.value === "activity" ? "總計" : viewSelect.value === "stage" ? "意願" : "渠道";
  pathDonut.innerHTML = `
    <svg viewBox="0 0 520 245" role="img" aria-label="Recommended TOEIC path distribution">
      <g transform="rotate(-90 115 115)">${circles}</g>
      <text x="115" y="110" text-anchor="middle" font-size="20" font-weight="900" fill="#172033">${centerLabel}</text>
      <text x="115" y="136" text-anchor="middle" font-size="17" fill="#627085">${total} 份問卷</text>
      ${rows
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
  const kpi = adjustedKpis();
  const trendFactor = kpi.signups / scenarioData[activeScenario].kpis.signups;
  const series = [
    ["personal", "#1f6fd1"],
    ["material", "#0b8c86"],
    ["consult", "#e87817"],
  ];
  const max = Math.max(
    80,
    ...trendRows.flatMap((row) =>
      series.map(([key]) => {
        const viewFactor = viewSelect.value === "channel" && key === "material" ? 1.22 : viewSelect.value === "stage" && key === "consult" ? 1.28 : 1;
        return row[key] * trendFactor * viewFactor;
      }),
    ),
  );
  const polylines = series
    .map(([key, color]) => {
      const points = trendRows
        .map((row, index) => {
          const x = 28 + (index / (trendRows.length - 1)) * (width - 56);
          const viewFactor = viewSelect.value === "channel" && key === "material" ? 1.22 : viewSelect.value === "stage" && key === "consult" ? 1.28 : 1;
          const y = height - 28 - ((row[key] * trendFactor * viewFactor) / max) * (height - 58);
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
  const rows = consultantRows.map((row, index) => {
    const next = [...row];
    if (goalSelect.value === "followup" && index < 2) next[2] = "優先聯繫";
    if (listSelect.value === "none" && index > 2) next[3] = "先補來源標籤與聯絡同意";
    if (targetSelect.value === "enterprise") {
      next[0] = ["HR 王小姐", "L&D 林經理", "部門主管", "訓練窗口", "人資專員"][index];
      next[1] = ["科技製造", "金融服務", "跨國業務", "企業實習", "內訓名單"][index];
    }
    return next;
  });
  consultantTable.innerHTML = `
    <thead><tr><th>對象</th><th>來源</th><th>狀態</th><th>下一步</th></tr></thead>
    <tbody>
      ${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}
    </tbody>
  `;
}

function renderInsights() {
  const scenario = scenarioData[activeScenario];
  const kpi = adjustedKpis();
  const strongest = strongestBottleneck();
  const viewText = viewSelect.options[viewSelect.selectedIndex].text;
  const items = [
    ["主要卡點", `${strongest.label} 目前分數 ${strongest.score.toFixed(1)}，建議把活動起點放在該卡點的低風險驗證。`],
    ["資料判讀", `目前模擬有 ${kpi.interested} 人具備進一步了解意願，其中 ${kpi.followups} 人可交由顧問分批追蹤。`],
    ["圖表視角", `目前使用「${viewText}」觀察資料，圖表已同步切換資料維度。`],
    ["建議關注", "不要只看報名數，需同時追蹤到場、問卷完成、測驗意願、回流與顧問下一步。"],
  ];
  insights.innerHTML = items.map(([title, body]) => `<div class="insight"><strong>${title}</strong><span>${body}</span></div>`).join("");
}

function renderReport() {
  const scenario = scenarioData[activeScenario];
  const kpi = adjustedKpis();
  const strongest = strongestBottleneck();
  const recommendations = recommendedMethodRows().map((method) => method.name);
  const blocks = [
    ["一、情境摘要", `目前模擬情境為「${scenario.label}」，推廣對象為 ${targetSelect.options[targetSelect.selectedIndex].text}。`],
    ["二、主要卡點判斷", `依目前參數重算後，主要卡點是「${strongest.label}」，次要卡點是「${strongest.second}」。`],
    ["三、建議測試方法", `建議先測：${recommendations.join("、")}。`],
    ["四、追蹤指標", `報名 ${kpi.signups}、到場率 ${pct(kpi.arrival)}、問卷完成率 ${pct(kpi.survey)}、測驗意願率 ${pct(kpi.intent)}、顧問跟進 ${kpi.followups} 人。`],
    ["五、下一步建議", "先做小範圍驗證，再依資料判讀決定是否擴大，不以短期營收承諾作為提案主軸。"],
  ];
  reportBlocks.innerHTML = blocks.map(([title, body]) => `<div class="report-block"><strong>${title}</strong><span>${body}</span></div>`).join("");
}

function renderExecutionSummary() {
  const scenario = scenarioData[activeScenario];
  const strongest = strongestBottleneck();
  const firstMethod = recommendedMethodRows()[0]?.name || scenario.methods[0];
  howList.innerHTML = [
    "先選一個明確情境與目標族群。",
    `用問卷或小型活動驗證「${strongest.label}」是否真的是主要卡點。`,
    "用 Dashboard 判斷哪個主題、說法與活動入口值得擴大。",
    "把結果轉成顧問行動清單與下一輪測試。",
  ]
    .map((item) => `<li>${item}</li>`)
    .join("");
  planList.innerHTML = [
    `設計「${firstMethod}」作為第一個驗證活動。`,
    "建立報名、到場、問卷、意願、跟進、回流欄位。",
    "產出活動後 14 天追蹤報表。",
    "整理顧問話術、名單狀態與下一步建議。",
  ]
    .map((item) => `<li>${item}</li>`)
    .join("");
  staffList.innerHTML = manpowerBase[scaleSelect.value]
    .map(([role, hours]) => {
      const extra = goalSelect.value === "followup" && role.includes("顧問") ? 8 : listSelect.value === "none" && role.includes("Dashboard") ? 6 : 0;
      return `<div class="staff-row"><strong>${role}</strong><span>${hours + extra}h</span></div>`;
    })
    .join("");
}

function reportText() {
  const scenario = scenarioData[activeScenario];
  const kpi = adjustedKpis();
  const strongest = strongestBottleneck();
  const recommendations = recommendedMethodRows().map((method) => method.name);
  return [
    "多益推進方法學模擬摘要",
    `情境：${scenario.label}`,
    `主要卡點：${strongest.label}`,
    `圖表視角：${viewSelect.options[viewSelect.selectedIndex].text}`,
    `建議方法：${recommendations.join("、")}`,
    `模擬 KPI：報名 ${kpi.signups}、到場率 ${pct(kpi.arrival)}、問卷完成率 ${pct(kpi.survey)}、測驗意願率 ${pct(kpi.intent)}、顧問跟進 ${kpi.followups} 人`,
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
  renderCampusSettings();
  renderDiagnosis();
  renderRecommendationMethods();
  renderKpis();
  renderChartTitles();
  renderFunnel();
  renderTopicChart();
  renderDonut();
  renderTrend();
  renderConsultants();
  renderInsights();
  renderReport();
  renderExecutionSummary();
}

function handleCoreControlChange() {
  if (targetSelect.value === "enterprise") activeScenario = "enterprise";
  if (targetSelect.value !== "enterprise" && activeScenario === "enterprise") activeScenario = "campus";
  renderAll();
}

[targetSelect, scaleSelect, listSelect, goalSelect, viewSelect].forEach((control) => {
  control.addEventListener("change", handleCoreControlChange);
});

campusTargetSelect.addEventListener("change", () => {
  targetSelect.value = campusTargetSelect.value;
  if (campusTargetSelect.value === "enterprise") activeScenario = "enterprise";
  if (campusTargetSelect.value !== "enterprise") activeScenario = "campus";
  renderAll();
});

campusGoalSelect.addEventListener("change", () => {
  goalSelect.value = campusGoalSelect.value;
  renderAll();
});

document.querySelectorAll('input[name="campusScale"]').forEach((input) => {
  input.addEventListener("change", () => {
    scaleSelect.value = selectedRadioValue("campusScale");
    renderAll();
  });
});

document.querySelectorAll('input[name="campusList"]').forEach((input) => {
  input.addEventListener("change", () => {
    listSelect.value = selectedRadioValue("campusList");
    renderAll();
  });
});

document.querySelectorAll('input[name="difficulty"], input[name="pushMethod"]').forEach((input) => {
  input.addEventListener("change", renderAll);
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
saveCampusDraft.addEventListener("click", () => {
  saveCampusDraft.textContent = "已儲存";
  setTimeout(() => {
    saveCampusDraft.textContent = "儲存草稿";
  }, 1200);
});
runCampusAnalysis.addEventListener("click", () => document.querySelector("#diagnosis").scrollIntoView({ behavior: "smooth" }));
goDashboard.addEventListener("click", () => document.querySelector("#dashboard").scrollIntoView({ behavior: "smooth" }));

renderAll();
