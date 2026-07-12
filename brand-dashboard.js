const brandRows = [
  ["gopro", "ecommerce", "Hero launch landing page", "HERO 系列", 1180000, 26800, 0.042, 0.031, 0.18, 2380000, 5.2, 38, 0.24, 0.43],
  ["gopro", "retail", "戶外通路體驗櫃", "套組 / 配件", 420000, 8600, 0.035, 0.044, 0.12, 1420000, 4.1, 52, 0.31, 0.37],
  ["gopro", "partner", "GoPro x 車旅品牌合作", "車旅 / 露營", 310000, 7200, 0.051, 0.049, 0.15, 1280000, 3.9, 61, 0.28, 0.48],
  ["gopro", "social", "創作者短影音挑戰", "內容創作者", 1560000, 47200, 0.067, 0.018, 0.22, 960000, 6.3, 44, 0.2, 0.61],
  ["fabre", "ecommerce", "法鉑馬賽皂日常補貨", "家庭清潔", 520000, 34200, 0.058, 0.052, 0.36, 820000, 3.2, 29, 0.42, 0.34],
  ["fabre", "retail", "百貨生活選品陳列", "香氛 / 沐浴", 260000, 13800, 0.045, 0.063, 0.31, 610000, 3.8, 47, 0.39, 0.29],
  ["fabre", "partner", "企業禮盒 / 飯店備品", "禮盒 / B2B", 180000, 9600, 0.034, 0.071, 0.24, 920000, 2.7, 58, 0.33, 0.25],
  ["fabre", "social", "生活風格內容種草", "質感生活", 680000, 28800, 0.071, 0.041, 0.4, 690000, 4.4, 35, 0.45, 0.52],
].map(([brand, channel, campaign, segment, reach, visits, engagement, conversion, repeatRate, revenue, roas, inventoryDays, bundleRate, awarenessLift]) => ({
  brand,
  channel,
  campaign,
  segment,
  reach,
  visits,
  engagement,
  conversion,
  repeatRate,
  revenue,
  roas,
  inventoryDays,
  bundleRate,
  awarenessLift,
}));

const brandNames = {
  gopro: "GoPro",
  fabre: "法鉑",
};

const channelNames = {
  ecommerce: "官網 / 電商",
  retail: "實體通路",
  partner: "異業 / 企業合作",
  social: "社群內容",
};

const viewNames = {
  campaign: "行銷活動成效",
  product: "商品組合",
  inventory: "庫存與補貨",
  audience: "客群分眾",
};

const periodModifiers = {
  q2: {
    label: "2026 Q2",
    reach: 1,
    visits: 1,
    revenue: 1,
    conversion: 1,
    inventoryDays: 1,
    note: "一般季度適合觀察通路基準值與商品組合效率。",
  },
  summer: {
    label: "暑期檔期",
    reach: 1.18,
    visits: 1.16,
    revenue: 1.22,
    conversion: 1.06,
    inventoryDays: 0.9,
    note: "暑期檔期可放大 GoPro 戶外情境與旅遊內容，也能測生活清潔補貨需求。",
  },
  holiday: {
    label: "年末禮盒檔期",
    reach: 1.1,
    visits: 1.08,
    revenue: 1.28,
    conversion: 1.12,
    inventoryDays: 0.84,
    note: "年末適合觀察法鉑禮盒與企業採購，並同步檢查熱門 SKU 的缺貨風險。",
  },
};

const basketIdeas = {
  gopro: [
    ["GoPro + THULE 車用 / 背包配件", "高客單戶外玩家，適合同捆套組與旅遊情境內容。"],
    ["主機 + 電池 + 記憶卡", "降低第一次購買後的配件遺漏，提升 attach rate。"],
    ["GoPro + Dometic 車旅用品", "適合露營、車宿與長途旅行族群的跨品牌提案。"],
  ],
  fabre: [
    ["馬賽皂 + 香氛 / 沐浴組", "提高生活風格感，適合百貨陳列與禮盒提案。"],
    ["家庭清潔補貨包", "偏高復購，適合會員分層與週期提醒。"],
    ["法鉑 + 葡國老人牌罐頭禮盒", "生活選品組合，可測企業禮贈與節慶檔期。"],
  ],
};

const brandSelect = document.querySelector("#brandSelect");
const channelSelect = document.querySelector("#channelSelect");
const viewSelect = document.querySelector("#viewSelect");
const periodSelect = document.querySelector("#periodSelect");
const insightStrip = document.querySelector("#insightStrip");
const kpiGrid = document.querySelector("#kpiGrid");
const primaryTitle = document.querySelector("#primaryTitle");
const primaryChart = document.querySelector("#primaryChart");
const decisionList = document.querySelector("#decisionList");
const funnelLabel = document.querySelector("#funnelLabel");
const funnelChart = document.querySelector("#funnelChart");
const basketGrid = document.querySelector("#basketGrid");
const dataTable = document.querySelector("#dataTable");
const rowCount = document.querySelector("#rowCount");
const reportList = document.querySelector("#reportList");
const exportCsv = document.querySelector("#exportCsv");

function number(value) {
  return Number.isFinite(Number(value)) ? Number(value) : 0;
}

function pct(value) {
  return `${Math.round(number(value) * 1000) / 10}%`;
}

function money(value) {
  return `NT$${Math.round(number(value)).toLocaleString("zh-TW")}`;
}

function activeRows() {
  const period = periodModifiers[periodSelect.value];
  return brandRows
    .filter((row) => brandSelect.value === "all" || row.brand === brandSelect.value)
    .filter((row) => channelSelect.value === "all" || row.channel === channelSelect.value)
    .map((row) => ({
      ...row,
      reach: Math.round(row.reach * period.reach),
      visits: Math.round(row.visits * period.visits),
      conversion: Math.min(row.conversion * period.conversion, 0.18),
      revenue: Math.round(row.revenue * period.revenue),
      inventoryDays: Math.round(row.inventoryDays * period.inventoryDays),
    }));
}

function average(rows, key) {
  if (!rows.length) return 0;
  return rows.reduce((sum, row) => sum + number(row[key]), 0) / rows.length;
}

function weightedAverage(rows, valueKey, weightKey) {
  const weight = rows.reduce((sum, row) => sum + number(row[weightKey]), 0);
  if (!weight) return average(rows, valueKey);
  return rows.reduce((sum, row) => sum + number(row[valueKey]) * number(row[weightKey]), 0) / weight;
}

function summarize(rows) {
  const reach = rows.reduce((sum, row) => sum + row.reach, 0);
  const visits = rows.reduce((sum, row) => sum + row.visits, 0);
  const revenue = rows.reduce((sum, row) => sum + row.revenue, 0);
  const purchases = rows.reduce((sum, row) => sum + Math.round(row.visits * row.conversion), 0);
  return {
    reach,
    visits,
    revenue,
    purchases,
    engagement: weightedAverage(rows, "engagement", "reach"),
    conversion: visits ? purchases / visits : 0,
    repeatRate: weightedAverage(rows, "repeatRate", "visits"),
    roas: average(rows, "roas"),
    inventoryDays: average(rows, "inventoryDays"),
    bundleRate: weightedAverage(rows, "bundleRate", "visits"),
    awarenessLift: weightedAverage(rows, "awarenessLift", "reach"),
  };
}

function groupRows(rows, key) {
  return rows.reduce((groups, row) => {
    const label = row[key] || "未分類";
    groups[label] = groups[label] || [];
    groups[label].push(row);
    return groups;
  }, {});
}

function chartRows(rows) {
  const keyMap = {
    campaign: "campaign",
    product: "segment",
    inventory: "channel",
    audience: "segment",
  };
  const key = keyMap[viewSelect.value];
  return Object.entries(groupRows(rows, key)).map(([label, group]) => {
    const summary = summarize(group);
    return {
      label: channelNames[label] || label,
      reach: summary.reach,
      revenue: summary.revenue,
      purchases: summary.purchases,
      conversion: summary.conversion,
      inventoryDays: summary.inventoryDays,
      bundleRate: summary.bundleRate,
      awarenessLift: summary.awarenessLift,
      roas: summary.roas,
    };
  });
}

function renderInsight(rows) {
  const summary = summarize(rows);
  const brandText = brandSelect.value === "all" ? "雙品牌" : brandNames[brandSelect.value];
  const period = periodModifiers[periodSelect.value];
  const score = Math.round((summary.conversion * 220 + summary.bundleRate * 90 + Math.min(summary.roas, 8) * 8 + summary.awarenessLift * 55) * 10) / 10;
  insightStrip.innerHTML = `
    <div>
      <strong>${brandText}：${viewNames[viewSelect.value]}重點判讀</strong>
      <p>${period.note} 目前模擬顯示營收 ${money(summary.revenue)}、組合銷售率 ${pct(summary.bundleRate)}、平均庫存天數 ${Math.round(summary.inventoryDays)} 天。</p>
    </div>
    <div class="score-pill">
      <span>Growth Signal</span>
      <strong>${score}</strong>
    </div>
  `;
}

function renderKpis(rows) {
  const summary = summarize(rows);
  const items = [
    ["觸及人次", summary.reach.toLocaleString("zh-TW")],
    ["互動率", pct(summary.engagement)],
    ["購買 / 線索", summary.purchases.toLocaleString("zh-TW")],
    ["轉換率", pct(summary.conversion)],
    ["營收", money(summary.revenue)],
    ["平均 ROAS", `${Math.round(summary.roas * 10) / 10}x`],
  ];
  kpiGrid.innerHTML = items.map(([label, value]) => `<article class="kpi"><span>${label}</span><strong>${value}</strong></article>`).join("");
}

function renderPrimaryChart(rows) {
  const data = chartRows(rows);
  const view = viewSelect.value;
  primaryTitle.textContent =
    view === "inventory" ? "庫存天數與風險" : view === "product" ? "商品組合營收" : view === "audience" ? "客群分眾轉換" : "行銷活動成效";
  if (!data.length) {
    primaryChart.innerHTML = "<p>目前篩選條件沒有資料。</p>";
    return;
  }
  if (view === "inventory") renderHeatmap(data);
  else if (view === "audience") renderLine(data);
  else if (view === "product") renderDonut(data);
  else renderBar(data);
}

function renderBar(data) {
  const max = Math.max(...data.map((row) => row.revenue), 1);
  primaryChart.innerHTML = `
    <div>
      ${data
        .map(
          (row) => `
            <div class="bar-row">
              <div class="bar-label">${row.label}</div>
              <div class="bar-track"><div class="bar-fill" style="width:${(row.revenue / max) * 100}%"></div></div>
              <strong>${money(row.revenue)}</strong>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderLine(data) {
  const width = 860;
  const height = 360;
  const max = Math.max(...data.map((row) => row.conversion), 0.01);
  const points = data
    .map((row, index) => {
      const x = data.length === 1 ? width / 2 : 40 + (index / (data.length - 1)) * (width - 80);
      const y = height - 38 - (row.conversion / max) * (height - 82);
      return `${x},${y}`;
    })
    .join(" ");
  primaryChart.innerHTML = `
    <svg class="line-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Audience conversion line chart">
      <line x1="40" y1="312" x2="820" y2="312" stroke="#d9e2ee" stroke-width="2" />
      <line x1="40" y1="206" x2="820" y2="206" stroke="#d9e2ee" stroke-width="2" />
      <line x1="40" y1="100" x2="820" y2="100" stroke="#d9e2ee" stroke-width="2" />
      <polyline points="${points}" fill="none" stroke="#0b8f88" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
      ${data
        .map((row, index) => {
          const x = data.length === 1 ? width / 2 : 40 + (index / (data.length - 1)) * (width - 80);
          const y = height - 38 - (row.conversion / max) * (height - 82);
          return `<circle cx="${x}" cy="${y}" r="7" fill="#142033"><title>${row.label}: ${pct(row.conversion)}</title></circle>`;
        })
        .join("")}
    </svg>
  `;
}

function renderDonut(data) {
  const total = data.reduce((sum, row) => sum + row.revenue, 0) || 1;
  const palette = ["#245f99", "#0b8f88", "#b27b24", "#477a3d", "#bd3d37", "#6954a5"];
  let offset = 25;
  const circles = data
    .map((row, index) => {
      const share = (row.revenue / total) * 100;
      const circle = `<circle r="86" cx="150" cy="150" fill="transparent" stroke="${palette[index % palette.length]}" stroke-width="38" stroke-dasharray="${share} ${100 - share}" stroke-dashoffset="${offset}" />`;
      offset -= share;
      return circle;
    })
    .join("");
  primaryChart.innerHTML = `
    <svg class="donut-svg" viewBox="0 0 720 320" role="img" aria-label="Product revenue donut chart">
      <g transform="rotate(-90 150 150)">${circles}</g>
      <text x="150" y="144" text-anchor="middle" font-size="24" font-weight="900" fill="#142033">營收</text>
      <text x="150" y="174" text-anchor="middle" font-size="18" fill="#637086">${money(total)}</text>
      ${data
        .map((row, index) => {
          const y = 72 + index * 34;
          return `<rect x="330" y="${y - 16}" width="18" height="18" fill="${palette[index % palette.length]}" /><text x="360" y="${y}" font-size="18" fill="#142033">${row.label} ${Math.round((row.revenue / total) * 100)}%</text>`;
        })
        .join("")}
    </svg>
  `;
}

function renderHeatmap(data) {
  primaryChart.innerHTML = `
    <div class="heatmap">
      ${data
        .map((row) => {
          const risk = row.inventoryDays < 28 ? "缺貨風險" : row.inventoryDays > 55 ? "滯銷風險" : "健康";
          const color = row.inventoryDays < 28 ? "#bd3d37" : row.inventoryDays > 55 ? "#b27b24" : "#0b8f88";
          return `
            <div class="heat-cell" style="background:${color}">
              <span>${row.label}</span>
              <strong>${risk}</strong>
              <span>${Math.round(row.inventoryDays)} 天庫存 / ROAS ${Math.round(row.roas * 10) / 10}x</span>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderFunnel(rows) {
  const summary = summarize(rows);
  const stages = [
    ["品牌觸及", summary.reach],
    ["站內 / 門市互動", summary.visits],
    ["購買 / 銷售線索", summary.purchases],
    ["組合購買", Math.round(summary.purchases * summary.bundleRate)],
    ["復購 / 再行銷名單", Math.round(summary.purchases * summary.repeatRate)],
  ];
  const max = stages[0][1] || 1;
  funnelLabel.textContent = `${periodModifiers[periodSelect.value].label} / ${brandSelect.value === "all" ? "雙品牌" : brandNames[brandSelect.value]}`;
  funnelChart.innerHTML = stages
    .map(
      ([label, value]) => `
        <div class="funnel-row">
          <div class="bar-label">${label}</div>
          <div class="bar-track"><div class="bar-fill" style="width:${(value / max) * 100}%"></div></div>
          <strong>${Math.round(value).toLocaleString("zh-TW")}</strong>
        </div>
      `,
    )
    .join("");
}

function renderBasket() {
  const keys = brandSelect.value === "all" ? ["gopro", "fabre"] : [brandSelect.value];
  basketGrid.innerHTML = keys
    .flatMap((key) => basketIdeas[key].map(([title, body]) => ({ title, body, brand: brandNames[key] })))
    .map((item) => `<div class="basket-card"><strong>${item.brand}：${item.title}</strong><span>${item.body}</span></div>`)
    .join("");
}

function renderDecisions(rows) {
  const summary = summarize(rows);
  const brandText = brandSelect.value === "all" ? "雙品牌" : brandNames[brandSelect.value];
  const decisions = [];
  if (brandSelect.value === "gopro") {
    decisions.push(["GoPro 重點", "把創作者內容與戶外通路體驗串成同一個漏斗，並追蹤配件 attach rate，避免只看聲量不看套組營收。"]);
  }
  if (brandSelect.value === "fabre") {
    decisions.push(["法鉑重點", "把一次性購買轉成補貨週期，搭配禮盒與生活選品組合，觀察復購率與會員分層。"]);
  }
  if (brandSelect.value === "all") {
    decisions.push(["跨品牌綜效", "GoPro 負責拉高戶外生活聲量，法鉑負責提高日常復購與禮盒轉換，可用會員標籤找出高潛跨買族群。"]);
  }
  if (summary.inventoryDays < 32) {
    decisions.push(["補貨預警", `${brandText} 平均庫存天數偏低，若接下來有檔期曝光，需先檢查熱門 SKU 安全庫存。`]);
  }
  if (summary.bundleRate < 0.34) {
    decisions.push(["提升商品組合", "組合銷售率仍可提升，建議在電商 PDP、結帳頁與門市陳列加入套組推薦。"]);
  }
  if (summary.roas >= 4.5) {
    decisions.push(["放大有效素材", "ROAS 已具放大條件，可把高轉換素材複製到相似通路與相似客群。"]);
  }
  decisionList.innerHTML = decisions.map(([title, body]) => `<div class="decision"><strong>${title}</strong><span>${body}</span></div>`).join("");
}

function renderTable(rows) {
  const headers = ["brand", "channel", "campaign", "segment", "reach", "visits", "engagement", "conversion", "repeatRate", "revenue", "roas", "inventoryDays", "bundleRate", "awarenessLift"];
  rowCount.textContent = `${rows.length} rows`;
  dataTable.innerHTML = `
    <thead><tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead>
    <tbody>
      ${rows
        .map(
          (row) => `
            <tr>
              ${headers
                .map((header) => {
                  const value = row[header];
                  if (header === "brand") return `<td>${brandNames[value]}</td>`;
                  if (header === "channel") return `<td>${channelNames[value]}</td>`;
                  if (["engagement", "conversion", "repeatRate", "bundleRate", "awarenessLift"].includes(header)) return `<td>${pct(value)}</td>`;
                  if (header === "revenue") return `<td>${money(value)}</td>`;
                  if (["reach", "visits"].includes(header)) return `<td>${value.toLocaleString("zh-TW")}</td>`;
                  return `<td>${value ?? ""}</td>`;
                })
                .join("")}
            </tr>
          `,
        )
        .join("")}
    </tbody>
  `;
}

function renderReport(rows) {
  const summary = summarize(rows);
  const brandText = brandSelect.value === "all" ? "GoPro / 法鉑雙品牌" : brandNames[brandSelect.value];
  const reports = [
    ["品牌整合行銷報表", `針對 ${brandText} 追蹤觸及、互動、轉換、營收、ROAS 與品牌知名度提升。`],
    ["通路營運報表", "比較官網、實體、異業合作與社群內容的投放效率，判斷下一輪預算配置。"],
    ["商品與庫存報表", `目前平均庫存 ${Math.round(summary.inventoryDays)} 天，可用於補貨、滯銷與檔期安全庫存判斷。`],
    ["會員與交叉銷售報表", `組合銷售率 ${pct(summary.bundleRate)}，可追蹤套組推薦、禮盒、跨品牌購買與復購週期。`],
  ];
  reportList.innerHTML = reports.map(([title, body]) => `<div class="report-card"><strong>${title}</strong><span>${body}</span></div>`).join("");
}

function summaryCsv() {
  const headers = ["brand", "channel", "campaign", "reach", "visits", "conversion", "revenue", "roas", "inventoryDays", "bundleRate"];
  return [
    headers.join(","),
    ...activeRows().map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          return typeof value === "string" ? `"${value.replace(/"/g, '""')}"` : value;
        })
        .join(","),
    ),
  ].join("\n");
}

function download(filename, text, type = "text/plain") {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function renderAll() {
  const rows = activeRows();
  renderInsight(rows);
  renderKpis(rows);
  renderPrimaryChart(rows);
  renderDecisions(rows);
  renderFunnel(rows);
  renderBasket();
  renderTable(rows);
  renderReport(rows);
}

[brandSelect, channelSelect, viewSelect, periodSelect].forEach((control) => control.addEventListener("change", renderAll));
exportCsv.addEventListener("click", () => download("chunshin-brand-dashboard-summary.csv", summaryCsv(), "text/csv"));

renderAll();
