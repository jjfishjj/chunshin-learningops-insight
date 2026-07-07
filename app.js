const metricData = {
  campus: [
    { label: "校園名單轉提案率", value: "41%", delta: "+8 pts" },
    { label: "活動出席轉報名率", value: "27%", delta: "+5 pts" },
    { label: "課程完課率", value: "83%", delta: "+6 pts" },
    { label: "續約風險帳戶", value: "12", delta: "-3" },
  ],
  enterprise: [
    { label: "企業需求訪談完成", value: "36", delta: "+11" },
    { label: "提案平均週期", value: "9.4天", delta: "-2.1天" },
    { label: "主管報表採用率", value: "76%", delta: "+14 pts" },
    { label: "訓練滿意度", value: "4.5", delta: "+0.3" },
  ],
  consumer: [
    { label: "公開場報名轉化率", value: "18%", delta: "+4 pts" },
    { label: "App 啟用率", value: "52%", delta: "+9 pts" },
    { label: "追加報名占比", value: "22%", delta: "+3 pts" },
    { label: "教材交叉銷售", value: "31%", delta: "+7 pts" },
  ],
};

const funnel = [
  { label: "Bridge", value: 100 },
  { label: "TOEIC L/R", value: 68 },
  { label: "TOEIC S/W", value: 31 },
  { label: "TOEFL", value: 18 },
];

const courseHealth = [72, 76, 78, 81, 80, 84, 87, 86];

const priorityItems = [
  {
    title: "北部商管學院 cohort",
    body: "大三到大四轉換期接近，多益焦慮期可搭配求職報告與校園說明會。",
  },
  {
    title: "企業 L&D 新客戶",
    body: "需求訪談完成但尚未回覆提案，可補上 CEFR 分班與主管報表樣板。",
  },
  {
    title: "TOEIC Pal 低活躍考生",
    body: "報名後 7 天內未啟用 App，建議推送口說練習與模擬題庫 onboarding。",
  },
];

const recommendations = {
  university: {
    title: "大專院校方案",
    bullets: [
      "用科系、年級、畢業門檻與就業目標建立分眾標籤。",
      "把說明會、模擬測驗、正式報名與課程出席串成漏斗。",
      "提供院系主管 Power BI 報表：CEFR 分布、進步率、缺席預警、續報建議。",
    ],
  },
  enterprise: {
    title: "企業 HR / L&D 方案",
    bullets: [
      "先用職能需求訪談建立部門語言任務地圖。",
      "搭配 TOEIC / TOEFL 評量、課程排程與主管視角的成效儀表板。",
      "用訓練前後測、出席率、部門完成率支援續約提案。",
    ],
  },
  highschool: {
    title: "高中職 / 技職體系方案",
    bullets: [
      "將 TOEIC Bridge、英文活動與升學職涯情境整合成校園專案。",
      "用班級層級報表協助老師看到弱點題型與學習資源推薦。",
      "以低門檻活動激活學生，再導向後續測驗與課程。",
    ],
  },
};

const campaignData = {
  toeic: {
    title: "TOEIC Career Quest",
    hook: "不要從考試壓力切入，而是從求職、交換、實習、畢業門檻與同儕挑戰切入。",
    flow: ["3 分鐘英語職涯雷達", "TOEIC 分數與職缺情境對照", "7 天 App / 題庫挑戰", "校園公開場報名導流"],
    content: ["AI 履歷英文檢查", "多益弱點題型小測", "學長姐分數故事", "系所排行榜或社團挑戰"],
    data: ["測驗意願率", "講座到場率", "App 啟用率", "正式報名轉換"],
    metrics: ["45% 意願", "68% 到場", "52% 啟用", "18% 報名"],
  },
  lecture: {
    title: "AI 時代語言力講座",
    hook: "把語言學習從背單字改成 AI 時代的職涯能力：簡報、面試、跨國協作與口說表達。",
    flow: ["校園前測問卷", "AI 英文履歷 / 口說示範", "CEFR 與 TOEIC 路線說明", "現場產出個人學習計畫"],
    content: ["ChatGPT 英文面試練習", "30 秒英文自介", "多益分數與企業需求", "學習型態與記憶策略"],
    data: ["報名來源", "現場互動率", "學習計畫完成率", "後續諮詢名單"],
    metrics: ["120 報名", "74% 互動", "63% 完成", "38 名單"],
  },
  club: {
    title: "TOEIC Club Ambassador",
    hook: "從社團進入校園，不用硬推測驗，而是讓社團幹部把多益變成活動任務和成就徽章。",
    flow: ["招募社團大使", "設計社團限定任務", "每週口說 / 單字挑戰", "期末模擬測驗與成果牆"],
    content: ["社團專屬報名碼", "限時挑戰榜", "系際合作活動", "企業職涯小講堂"],
    data: ["社團觸及人數", "任務完成率", "推薦碼轉換", "校園口碑內容數"],
    metrics: ["12 社團", "57% 完成", "24% 轉換", "80 貼文"],
  },
  memory: {
    title: "MemoLingua 記憶學習工作坊",
    hook: "用記憶法降低英文學習門檻，讓學生先覺得自己學得起來，再導向多益測驗與課程。",
    flow: ["記憶天份小測", "場景 / 聲音 / 間隔複習練習", "多益單字與情境任務", "7 天複習節奏追蹤"],
    content: ["3 秒場景記憶法", "Shadowing 節奏練習", "錯題故事化", "個人複習節奏表"],
    data: ["工作坊完成率", "7 天回訪率", "單字記憶提升", "測驗諮詢轉換"],
    metrics: ["88% 完成", "46% 回訪", "+22% 記憶", "31% 諮詢"],
  },
};

const briefContent = {
  pain: {
    title: "顧問團隊需要的是可行動的決策支援",
    intro:
      "忠欣教育事業處的資料價值，藏在校園開發、測驗報名、App 學習、課務執行與續約回報之間。brief UI 先把痛點變成可以和主管討論的需求地圖。",
    cards: [
      ["帳戶優先順序", "校園與企業名單很多，但需要用活動、提案階段、潛在價值和續約機率排序。"],
      ["語言方案證據", "提案要能說清楚學員基線、CEFR 目標、課程設計、評量與預期成果。"],
      ["課務即時預警", "出席、講師紀錄、教材、滿意度與測驗結果要能在專案中途就看到風險。"],
      ["學習旅程轉化", "TOEIC / TOEFL 不只看單次報名，而是 Bridge、L/R、S/W、TOEFL 的生命週期。"],
      ["BI 治理基礎", "Power BI 需要標準指標、權限、去識別化、資料品質檢查和穩定資料來源。"],
    ],
  },
  system: {
    title: "五層架構把 Markdown brief 變成系統藍圖",
    intro:
      "這個介面把原本的文字 brief 拆成 CRM、學習旅程、課務、BI 語意層與顧問行動建議，面試時可以逐層說明自己如何落地。",
    layers: [
      ["顧問 CRM", ["學校 / 企業", "聯絡人", "活動紀錄", "提案階段", "續約機率"]],
      ["學習旅程", ["學員輪廓", "測驗紀錄", "CEFR 目標", "App 行為", "複測結果"]],
      ["課務營運", ["開班", "課表", "出席", "講師紀錄", "教材", "滿意度"]],
      ["BI 語意層", ["Pipeline", "學習成效", "課務健康", "App 留存", "主管 KPI"]],
      ["顧問行動", ["優先拜訪", "續約提醒", "缺席預警", "App 激活", "提案素材"]],
    ],
  },
  roadmap: {
    title: "六週 MVP 讓提案從概念走到 pilot",
    intro:
      "不用一開始就整合所有系統。先選一個校園或企業專案試跑，確認資料可用、指標可信、顧問真的會採用。",
    steps: [
      ["1", "資料盤點", "盤點 CRM、報名、課表、出席、App 事件、問卷與財務資料。"],
      ["2", "指標字典", "定義名單轉提案率、報名轉換、完課率、App 啟用、續約率。"],
      ["3", "SQL views", "建立帳戶 pipeline、學員旅程、課務健康度和主管 KPI views。"],
      ["4", "Power BI", "交付主管、顧問、課務、講師可用的 dashboard 雛形。"],
      ["5-6", "Pilot", "用一個校園或企業帳戶比較導入前後的行動與轉化。"],
    ],
  },
};

const kpiGrid = document.querySelector("#kpiGrid");
const scenarioSelect = document.querySelector("#scenarioSelect");
const funnelChart = document.querySelector("#funnelChart");
const courseChart = document.querySelector("#courseChart");
const priorityList = document.querySelector("#priorityList");
const clientType = document.querySelector("#clientType");
const recommendation = document.querySelector("#recommendation");
const briefTabs = document.querySelectorAll(".brief-tab");
const briefPanel = document.querySelector("#briefPanel");
const campaignType = document.querySelector("#campaignType");
const campaignDetail = document.querySelector("#campaignDetail");

function renderKpis(key) {
  kpiGrid.innerHTML = metricData[key]
    .map(
      (metric) => `
        <article class="kpi-card">
          <div class="label">${metric.label}</div>
          <div class="value">${metric.value}</div>
          <div class="delta">${metric.delta}</div>
        </article>
      `,
    )
    .join("");
}

function renderFunnel() {
  funnelChart.innerHTML = funnel
    .map(
      (item) => `
        <div class="bar-row">
          <div class="bar-label">${item.label}</div>
          <div class="bar-track">
            <div class="bar-fill" style="width:${item.value}%"></div>
          </div>
          <div class="bar-value">${item.value}%</div>
        </div>
      `,
    )
    .join("");
}

function renderCourseHealth() {
  const width = 520;
  const height = 220;
  const max = 100;
  const points = courseHealth
    .map((value, index) => {
      const x = (index / (courseHealth.length - 1)) * (width - 30) + 15;
      const y = height - (value / max) * (height - 30) - 15;
      return `${x},${y}`;
    })
    .join(" ");

  courseChart.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Course health trend">
      <line x1="15" y1="190" x2="505" y2="190" stroke="#dbe3ee" stroke-width="2" />
      <line x1="15" y1="130" x2="505" y2="130" stroke="#dbe3ee" stroke-width="2" />
      <line x1="15" y1="70" x2="505" y2="70" stroke="#dbe3ee" stroke-width="2" />
      <polyline points="${points}" fill="none" stroke="#0f8b8d" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
      ${courseHealth
        .map((value, index) => {
          const x = (index / (courseHealth.length - 1)) * (width - 30) + 15;
          const y = height - (value / max) * (height - 30) - 15;
          return `<circle cx="${x}" cy="${y}" r="6" fill="#132238"><title>${value}%</title></circle>`;
        })
        .join("")}
    </svg>
  `;
}

function renderPriorityList() {
  priorityList.innerHTML = priorityItems
    .map((item) => `<li><strong>${item.title}</strong><span>${item.body}</span></li>`)
    .join("");
}

function renderRecommendation(key) {
  const item = recommendations[key];
  recommendation.innerHTML = `
    <strong>${item.title}</strong>
    <ul>
      ${item.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
    </ul>
  `;
}

function renderBrief(key) {
  const item = briefContent[key];
  if (key === "system") {
    briefPanel.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.intro}</p>
      <div class="layer-map">
        ${item.layers
          .map(
            ([name, chips]) => `
              <div class="layer-row">
                <strong>${name}</strong>
                <div class="chip-list">
                  ${chips.map((chip) => `<span>${chip}</span>`).join("")}
                </div>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
    return;
  }

  if (key === "roadmap") {
    briefPanel.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.intro}</p>
      <div class="roadmap">
        ${item.steps
          .map(
            ([week, title, body]) => `
              <div class="roadmap-step">
                <span>${week}</span>
                <strong>${title}</strong>
                <p>${body}</p>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
    return;
  }

  briefPanel.innerHTML = `
    <h3>${item.title}</h3>
    <p>${item.intro}</p>
    <div class="brief-card-grid">
      ${item.cards
        .map(
          ([title, body]) => `
            <div class="brief-card">
              <strong>${title}</strong>
              <p>${body}</p>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderCampaign(key) {
  const item = campaignData[key];
  campaignDetail.innerHTML = `
    <div class="campaign-hero">
      <h4>${item.title}</h4>
      <p>${item.hook}</p>
    </div>
    <div class="campaign-columns">
      <div class="campaign-column">
        <strong>活動流程</strong>
        <ul>${item.flow.map((point) => `<li>${point}</li>`).join("")}</ul>
      </div>
      <div class="campaign-column">
        <strong>內容鉤子</strong>
        <ul>${item.content.map((point) => `<li>${point}</li>`).join("")}</ul>
      </div>
      <div class="campaign-column">
        <strong>追蹤資料</strong>
        <ul>${item.data.map((point) => `<li>${point}</li>`).join("")}</ul>
      </div>
    </div>
    <div class="metric-strip">
      ${item.metrics.map((metric) => `<div>${metric}<span>示意 KPI</span></div>`).join("")}
    </div>
  `;
}

scenarioSelect.addEventListener("change", (event) => renderKpis(event.target.value));
clientType.addEventListener("change", (event) => renderRecommendation(event.target.value));
campaignType.addEventListener("change", (event) => renderCampaign(event.target.value));
briefTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    briefTabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    renderBrief(tab.dataset.briefTab);
  });
});

renderBrief("pain");
renderKpis("campus");
renderFunnel();
renderCourseHealth();
renderPriorityList();
renderRecommendation("university");
renderCampaign("toeic");
