const experiments = {
  memory: {
    title: "記憶法多益單字挑戰",
    claim: "用場景記憶、聲音節奏與間隔複習降低英文抗拒，先讓學生覺得自己學得起來。",
    flow: ["3 分鐘記憶入口小測", "多益高頻單字場景化", "7 天複習節奏", "回收測驗興趣與後續同意"],
    materials: ["短影音貼文", "單字挑戰卡", "複習節奏表", "落點診斷 CTA"],
    metrics: ["挑戰完成率", "7 天回訪", "單字記憶自評", "測驗資訊同意"],
  },
  resume: {
    title: "AI 英文履歷工作坊",
    claim: "從求職與實習切入，讓多益不只是分數，而是職涯溝通與英文能力管理的一部分。",
    flow: ["英文履歷前測", "AI 修改示範", "職缺英語需求對照", "推薦 TOEIC / S&W 路徑"],
    materials: ["履歷 prompt", "面試自介模板", "企業英語需求卡", "顧問追蹤名單"],
    metrics: ["報名與到場", "履歷完成率", "多益路徑點擊", "顧問諮詢意願"],
  },
  diagnosis: {
    title: "多益落點診斷問卷",
    claim: "用低門檻診斷取代硬銷測驗，先讓學生知道自己在哪裡、下一步可以去哪裡。",
    flow: ["學習目標問卷", "Bridge / L&R / S&W 分流", "個人建議路徑", "後續資源與場次查詢"],
    materials: ["問卷表單", "路徑建議文案", "分眾標籤", "Dashboard 欄位"],
    metrics: ["問卷完成", "分流比例", "場次查詢", "後續訊息回覆"],
  },
};

const checklistItems = [
  "首頁是否改為多益學習轉換方法學，而不是 LearningOps 過重技術感？",
  "是否刪除快速成功、短期營收保證與過度承諾？",
  "是否明確寫出多益作為成熟檢定的市場現實與代理邊界？",
  "是否把忠欣職缺轉譯成校園、企業、講座、工作坊、顧問、數據需求？",
  "是否加入校園合作、講座、工作坊與推廣經驗的能力模組？",
  "是否寫出實際怎麼做、如何開始、要追哪些欄位？",
  "是否包含觸及、參與、意願、轉換、回流五層驗證？",
  "是否寫出短期、中期、長期效益，但沒有保證營收？",
  "是否保留費用依活動規模、資料串接、素材製作另行規劃？",
  "是否讓忠欣看完覺得這是一套可採購、可測試、可交接的方法？",
];

const experimentSelect = document.querySelector("#experimentSelect");
const experimentCard = document.querySelector("#experimentCard");
const checklist = document.querySelector("#checklist");
const resetChecks = document.querySelector("#resetChecks");

function renderExperiment(key) {
  const item = experiments[key];
  experimentCard.innerHTML = `
    <p class="eyebrow">Validation Topic</p>
    <h3>${item.title}</h3>
    <p>${item.claim}</p>
    <div class="experiment-grid">
      <div>
        <strong>流程</strong>
        <ul>${item.flow.map((point) => `<li>${point}</li>`).join("")}</ul>
      </div>
      <div>
        <strong>素材</strong>
        <ul>${item.materials.map((point) => `<li>${point}</li>`).join("")}</ul>
      </div>
      <div>
        <strong>指標</strong>
        <ul>${item.metrics.map((point) => `<li>${point}</li>`).join("")}</ul>
      </div>
    </div>
  `;
}

function renderChecklist() {
  checklist.innerHTML = checklistItems
    .map(
      (item, index) => `
        <label>
          <input type="checkbox" data-check-index="${index}" />
          <span>${item}</span>
        </label>
      `,
    )
    .join("");
}

experimentSelect.addEventListener("change", (event) => renderExperiment(event.target.value));
resetChecks.addEventListener("click", () => {
  document.querySelectorAll("#checklist input").forEach((input) => {
    input.checked = false;
  });
});

renderExperiment("memory");
renderChecklist();

