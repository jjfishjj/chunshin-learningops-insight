const builtInRows = [
  ["campus", "toeic", "北部商管學院", "大三 / 大四", 420, 92, 0.56, 0.82, 4.4, 276000, 0.28, 84],
  ["campus", "lecture", "中央管理學院", "商管菁英", 360, 75, 0.49, 0.78, 4.3, 225000, 0.34, 71],
  ["campus", "club", "北商社團聯盟", "社團幹部", 280, 58, 0.61, 0.74, 4.2, 174000, 0.38, 63],
  ["campus", "memory", "技職英語專案", "技職學生", 310, 64, 0.44, 0.8, 4.5, 192000, 0.31, 76],
  ["enterprise", "toeic", "科技製造 HR", "工程師", 220, 48, 0.39, 0.76, 4.1, 336000, 0.42, 58],
  ["enterprise", "lecture", "金融 L&D", "儲備幹部", 180, 46, 0.53, 0.84, 4.6, 368000, 0.24, 89],
  ["enterprise", "memory", "跨國業務團隊", "業務 / PM", 150, 38, 0.58, 0.81, 4.5, 304000, 0.27, 92],
  ["enterprise", "club", "企業實習專案", "實習生", 130, 26, 0.35, 0.69, 3.9, 156000, 0.51, 42],
  ["consumer", "toeic", "公開場考生", "求職者", 520, 108, 0.52, 0.71, 4.0, 324000, 0.45, 55],
  ["consumer", "lecture", "App 新會員", "口說提升", 410, 86, 0.63, 0.73, 4.2, 258000, 0.36, 67],
  ["consumer", "memory", "記憶學習挑戰", "自學者", 340, 72, 0.66, 0.77, 4.5, 216000, 0.29, 80],
  ["consumer", "club", "校園口碑轉介", "同儕推薦", 260, 55, 0.57, 0.7, 4.1, 165000, 0.43, 49],
].map(([scenario, campaign, account, segment, learners, registrations, app_active_rate, attendance_rate, satisfaction, revenue, risk_score, score_lift]) => ({
  scenario,
  campaign,
  account,
  segment,
  learners,
  registrations,
  app_active_rate,
  attendance_rate,
  satisfaction,
  revenue,
  risk_score,
  score_lift,
}));

const scenarioNames = {
  campus: "校園深耕",
  enterprise: "企業專案",
  consumer: "大眾考生",
};

const campaignNames = {
  toeic: "多益興趣啟動",
  lecture: "XX 語言講座",
  club: "社團合作企劃",
  memory: "記憶學習工作坊",
};

let activeRows = builtInRows;
let sourceLabel = "內建模擬資料";

const scenarioFilter = document.querySelector("#scenarioFilter");
const campaignFilter = document.querySelector("#campaignFilter");
const chartType = document.querySelector("#chartType");
const fileInput = document.querySelector("#fileInput");
const kpiGrid = document.querySelector("#kpiGrid");
const chartStage = document.querySelector("#chartStage");
const chartTitle = document.querySelector("#chartTitle");
const decisionOutput = document.querySelector("#decisionOutput");
const dataTable = document.querySelector("#dataTable");
const rowCount = document.querySelector("#rowCount");
const dataStatus = document.querySelector("#dataStatus");
const exportCsv = document.querySelector("#exportCsv");
const printReport = document.querySelector("#printReport");
const downloadReport = document.querySelector("#downloadReport");

function numberValue(value) {
  if (typeof value === "number") return value;
  if (value == null || value === "") return 0;
  const normalized = String(value).replace(/[%,$,\s]/g, "");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function percent(value) {
  return `${Math.round(numberValue(value) * 100)}%`;
}

function money(value) {
  return `NT$${Math.round(numberValue(value)).toLocaleString("zh-TW")}`;
}

function filteredRows() {
  return activeRows.filter((row) => {
    const scenarioMatch = scenarioFilter.value === "all" || row.scenario === scenarioFilter.value;
    const campaignMatch = campaignFilter.value === "all" || row.campaign === campaignFilter.value;
    return scenarioMatch && campaignMatch;
  });
}

function summarize(rows) {
  const learners = rows.reduce((sum, row) => sum + numberValue(row.learners), 0);
  const registrations = rows.reduce((sum, row) => sum + numberValue(row.registrations), 0);
  const revenue = rows.reduce((sum, row) => sum + numberValue(row.revenue), 0);
  const appActive = weightedAverage(rows, "app_active_rate", "learners");
  const attendance = weightedAverage(rows, "attendance_rate", "learners");
  const satisfaction = average(rows, "satisfaction");
  const risk = average(rows, "risk_score");
  const scoreLift = average(rows, "score_lift");
  return { learners, registrations, revenue, appActive, attendance, satisfaction, risk, scoreLift };
}

function average(rows, key) {
  if (!rows.length) return 0;
  return rows.reduce((sum, row) => sum + numberValue(row[key]), 0) / rows.length;
}

function weightedAverage(rows, valueKey, weightKey) {
  const totalWeight = rows.reduce((sum, row) => sum + numberValue(row[weightKey]), 0);
  if (!totalWeight) return average(rows, valueKey);
  const total = rows.reduce((sum, row) => sum + numberValue(row[valueKey]) * numberValue(row[weightKey]), 0);
  return total / totalWeight;
}

function groupRows(rows, key) {
  return rows.reduce((groups, row) => {
    const label = row[key] || "未分類";
    groups[label] = groups[label] || [];
    groups[label].push(row);
    return groups;
  }, {});
}

function renderKpis(rows) {
  const summary = summarize(rows);
  const conversion = summary.learners ? summary.registrations / summary.learners : 0;
  const kpis = [
    ["觸及學員", summary.learners.toLocaleString("zh-TW")],
    ["報名 / 意願", summary.registrations.toLocaleString("zh-TW")],
    ["轉換率", percent(conversion)],
    ["App 啟用", percent(summary.appActive)],
    ["預估營收", money(summary.revenue)],
  ];
  kpiGrid.innerHTML = kpis
    .map(([label, value]) => `<article class="kpi"><span>${label}</span><strong>${value}</strong></article>`)
    .join("");
}

function chartData(rows) {
  const groupKey = campaignFilter.value === "all" ? "campaign" : "account";
  const groups = groupRows(rows, groupKey);
  return Object.entries(groups).map(([key, group]) => ({
    label: campaignNames[key] || key,
    learners: group.reduce((sum, row) => sum + numberValue(row.learners), 0),
    registrations: group.reduce((sum, row) => sum + numberValue(row.registrations), 0),
    revenue: group.reduce((sum, row) => sum + numberValue(row.revenue), 0),
    risk: average(group, "risk_score"),
    attendance: weightedAverage(group, "attendance_rate", "learners"),
  }));
}

function renderChart(rows) {
  const data = chartData(rows);
  const type = chartType.value;
  const titleMap = {
    bar: "報名 / 意願量比較",
    line: "專案成效趨勢示意",
    donut: "營收占比",
    heatmap: "風險與優先處理熱圖",
  };
  chartTitle.textContent = titleMap[type];
  if (!data.length) {
    chartStage.innerHTML = "<p>目前篩選條件沒有資料。</p>";
    return;
  }
  if (type === "line") renderLine(data);
  if (type === "donut") renderDonut(data);
  if (type === "heatmap") renderHeatmap(data);
  if (type === "bar") renderBar(data);
}

function renderBar(data) {
  const max = Math.max(...data.map((item) => item.registrations), 1);
  chartStage.innerHTML = `
    <div>
      ${data
        .map(
          (item) => `
            <div class="bar-row">
              <div class="bar-label">${item.label}</div>
              <div class="bar-track">
                <div class="bar-fill" style="width:${(item.registrations / max) * 100}%"></div>
              </div>
              <strong>${item.registrations}</strong>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderLine(data) {
  const width = 840;
  const height = 360;
  const max = Math.max(...data.map((item) => item.attendance), 1);
  const points = data
    .map((item, index) => {
      const x = data.length === 1 ? width / 2 : 32 + (index / (data.length - 1)) * (width - 64);
      const y = height - 34 - (item.attendance / max) * (height - 72);
      return `${x},${y}`;
    })
    .join(" ");
  chartStage.innerHTML = `
    <svg class="line-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Attendance trend">
      <line x1="32" y1="310" x2="808" y2="310" stroke="#d9e2ee" stroke-width="2" />
      <line x1="32" y1="210" x2="808" y2="210" stroke="#d9e2ee" stroke-width="2" />
      <line x1="32" y1="110" x2="808" y2="110" stroke="#d9e2ee" stroke-width="2" />
      <polyline points="${points}" fill="none" stroke="#0b8f88" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
      ${data
        .map((item, index) => {
          const x = data.length === 1 ? width / 2 : 32 + (index / (data.length - 1)) * (width - 64);
          const y = height - 34 - (item.attendance / max) * (height - 72);
          return `<circle cx="${x}" cy="${y}" r="7" fill="#102033"><title>${item.label}: ${percent(item.attendance)}</title></circle>`;
        })
        .join("")}
    </svg>
  `;
}

function renderDonut(data) {
  const total = data.reduce((sum, item) => sum + item.revenue, 0) || 1;
  let offset = 25;
  const palette = ["#255f99", "#0b8f88", "#b28024", "#467a3d", "#be3a34", "#6954a5"];
  const segments = data
    .map((item, index) => {
      const value = (item.revenue / total) * 100;
      const segment = `<circle r="86" cx="150" cy="150" fill="transparent" stroke="${palette[index % palette.length]}" stroke-width="38" stroke-dasharray="${value} ${100 - value}" stroke-dashoffset="${offset}" />`;
      offset -= value;
      return segment;
    })
    .join("");
  chartStage.innerHTML = `
    <svg class="donut-svg" viewBox="0 0 720 320" role="img" aria-label="Revenue share">
      <g transform="rotate(-90 150 150)">${segments}</g>
      <text x="150" y="144" text-anchor="middle" font-size="24" font-weight="900" fill="#102033">營收</text>
      <text x="150" y="174" text-anchor="middle" font-size="18" fill="#647386">${money(total)}</text>
      ${data
        .map((item, index) => {
          const y = 72 + index * 34;
          return `<rect x="330" y="${y - 16}" width="18" height="18" fill="${palette[index % palette.length]}" /><text x="360" y="${y}" font-size="18" fill="#102033">${item.label} ${Math.round((item.revenue / total) * 100)}%</text>`;
        })
        .join("")}
    </svg>
  `;
}

function renderHeatmap(data) {
  chartStage.innerHTML = `
    <div class="heatmap">
      ${data
        .map((item) => {
          const risk = Math.min(Math.max(item.risk, 0), 1);
          const color = risk > 0.45 ? "#be3a34" : risk > 0.32 ? "#b28024" : "#0b8f88";
          return `
            <div class="heat-cell" style="background:${color}">
              <span>${item.label}</span>
              <strong>風險 ${percent(risk)}</strong>
              <span>出席 ${percent(item.attendance)} / 報名 ${item.registrations}</span>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderDecisions(rows) {
  const summary = summarize(rows);
  const conversion = summary.learners ? summary.registrations / summary.learners : 0;
  const decisions = [];
  if (conversion < 0.2) {
    decisions.push(["提升報名轉換", "目前轉換率偏低，建議把講座 CTA 改成 7 天挑戰或限時模擬測驗，降低第一次行動門檻。"]);
  } else {
    decisions.push(["放大有效活動", "轉換率已有基礎，建議把高轉換活動複製到相似科系、企業部門或社團節點。"]);
  }
  if (summary.appActive < 0.55) {
    decisions.push(["強化 App 啟用", "報名後 24 小時內推送 TOEIC Pal onboarding，搭配口說練習或弱點題型任務。"]);
  }
  if (summary.risk > 0.38) {
    decisions.push(["降低專案風險", "風險分數偏高，需檢查缺席、滿意度與提案階段，優先安排顧問回訪。"]);
  }
  if (summary.scoreLift > 70) {
    decisions.push(["產出成功案例", "分數提升訊號佳，可包裝成校園案例、學長姐故事或企業續約成果報告。"]);
  }
  decisionOutput.innerHTML = decisions
    .map(([title, body]) => `<div class="decision"><strong>${title}</strong><span>${body}</span></div>`)
    .join("");
}

function renderTable(rows) {
  const headers = ["scenario", "campaign", "account", "segment", "learners", "registrations", "app_active_rate", "attendance_rate", "satisfaction", "revenue", "risk_score", "score_lift"];
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
                  if (["app_active_rate", "attendance_rate", "risk_score"].includes(header)) return `<td>${percent(value)}</td>`;
                  if (header === "revenue") return `<td>${money(value)}</td>`;
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

function renderAll() {
  const rows = filteredRows();
  renderKpis(rows);
  renderChart(rows);
  renderDecisions(rows);
  renderTable(rows);
  dataStatus.innerHTML = `<span>資料來源：${sourceLabel}</span><span>目前篩選：${rows.length} / ${activeRows.length} rows</span>`;
}

function normalizeUploadedRows(rows) {
  return rows
    .filter((row) => Object.values(row).some((value) => value !== null && value !== undefined && value !== ""))
    .map((row, index) => {
      const lower = Object.fromEntries(Object.entries(row).map(([key, value]) => [String(key).trim().toLowerCase(), value]));
      return {
        scenario: String(lower.scenario || lower.情境 || "campus").toLowerCase(),
        campaign: String(lower.campaign || lower.活動 || "toeic").toLowerCase(),
        account: lower.account || lower.帳戶 || lower.學校 || lower.公司 || `Uploaded ${index + 1}`,
        segment: lower.segment || lower.分眾 || lower.族群 || "未分類",
        learners: numberValue(lower.learners || lower.觸及學員 || lower.users || lower.students),
        registrations: numberValue(lower.registrations || lower.報名 || lower.conversions || lower.leads),
        app_active_rate: toRate(lower.app_active_rate || lower.app啟用率 || lower.app || lower.activation),
        attendance_rate: toRate(lower.attendance_rate || lower.出席率 || lower.attendance),
        satisfaction: numberValue(lower.satisfaction || lower.滿意度 || lower.rating),
        revenue: numberValue(lower.revenue || lower.營收 || lower.amount),
        risk_score: toRate(lower.risk_score || lower.風險 || lower.risk),
        score_lift: numberValue(lower.score_lift || lower.分數提升 || lower.lift),
      };
    });
}

function toRate(value) {
  const raw = numberValue(value);
  if (raw > 1) return raw / 100;
  return raw;
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = splitCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = splitCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
  });
}

function splitCsvLine(line) {
  const values = [];
  let current = "";
  let quoted = false;
  for (const char of line) {
    if (char === '"') quoted = !quoted;
    else if (char === "," && !quoted) {
      values.push(current.trim());
      current = "";
    } else current += char;
  }
  values.push(current.trim());
  return values;
}

async function handleFile(file) {
  if (!file) return;
  const extension = file.name.split(".").pop().toLowerCase();
  if (extension === "csv") {
    const text = await file.text();
    activeRows = normalizeUploadedRows(parseCsv(text));
  } else {
    if (!window.XLSX) {
      alert("Excel 解析套件尚未載入，請確認網路或改上傳 CSV。");
      return;
    }
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    activeRows = normalizeUploadedRows(XLSX.utils.sheet_to_json(firstSheet));
  }
  sourceLabel = `上傳檔案：${file.name}`;
  scenarioFilter.value = "all";
  campaignFilter.value = "all";
  renderAll();
}

function summaryCsv() {
  const rows = chartData(filteredRows());
  const headers = ["label", "learners", "registrations", "revenue", "risk", "attendance"];
  return [headers.join(","), ...rows.map((row) => headers.map((header) => row[header]).join(","))].join("\n");
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

scenarioFilter.addEventListener("change", renderAll);
campaignFilter.addEventListener("change", renderAll);
chartType.addEventListener("change", renderAll);
fileInput.addEventListener("change", (event) => handleFile(event.target.files[0]));
exportCsv.addEventListener("click", () => download("chunshin-bi-summary.csv", summaryCsv(), "text/csv"));
printReport.addEventListener("click", () => window.print());
downloadReport.addEventListener("click", () => download("chunshin-bi-report.html", document.documentElement.outerHTML, "text/html"));

renderAll();

