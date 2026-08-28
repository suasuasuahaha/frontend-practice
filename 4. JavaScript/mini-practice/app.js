/* =========================================================
   미니 계좌 대시보드 — script.js
   ========================================================= */

/* ---------------------------------------------------------
   STEP 1 — 계좌 상태와 계산 규칙
   --------------------------------------------------------- */
let accountNo = "110-234-567890";
let ownerName = "김민준";
let balance = 3350000;

const FEE_RATE_NORMAL = 0.005;   // 일반 수수료 0.5%
const DAILY_LIMIT = 10000000;    // 1회 이체 한도

/* ---------------------------------------------------------
   STEP 2 — 데이터 및 유틸 함수
   --------------------------------------------------------- */
let transactions = [
  { id: "TX-001", date: "08-01", type: "deposit", amount: 3000000, memo: "8월 급여" },
  { id: "TX-002", date: "08-11", type: "deposit", amount: 150000,  memo: "보험금 환급" },
  { id: "TX-003", date: "08-28", type: "deposit", amount: 200000,  memo: "중고거래 정산" },
];

const formatWon = (n) => `${n.toLocaleString("ko-KR")}원`;
const calculateFee = (amount, rate = FEE_RATE_NORMAL) => Math.floor(amount * rate);

function todayLabel() {
  const d = new Date();
  return `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function validateTransfer(amount, currentBalance) {
  if (Number.isNaN(amount) || amount === 0) return "금액을 입력해 주세요.";
  if (amount < 0) return "0원보다 큰 금액을 입력해 주세요.";
  if (amount > DAILY_LIMIT) return "1회 이체 한도를 초과했습니다.";

  const fee = calculateFee(amount);
  const totalRequired = amount + fee;

  if (totalRequired > currentBalance) {
    return `잔액이 부족합니다. (수수료 포함 ${formatWon(totalRequired)} 필요)`;
  }

  return null;
}

/* ---------------------------------------------------------
   STEP 3 — HTML 엘리먼트 가져오기 및 메모 입력칸 동적 추가
   --------------------------------------------------------- */
const accountNoEl = document.getElementById("accountNo");
const balanceEl = document.getElementById("balance");
const filtersEl = document.getElementById("filters");
const txListEl = document.getElementById("txList");

const transferFormEl = document.getElementById("transferForm");
const amountInputEl = document.getElementById("amountInput");
const submitBtnEl = document.getElementById("submitBtn");
const formErrorEl = document.getElementById("formError");
const formNoticeEl = document.getElementById("formNotice");

const formRowEl = transferFormEl ? transferFormEl.querySelector(".form-row") : null;
let memoInputEl = null;

if (formRowEl) {
  memoInputEl = document.createElement("input");
  memoInputEl.type = "text";
  memoInputEl.id = "memoInput";
  memoInputEl.placeholder = "이체 메모 (예: 월세)";
  
  formRowEl.insertBefore(memoInputEl, submitBtnEl);
}

let currentFilter = "all";

/* ---------------------------------------------------------
   STEP 4 — 화면 렌더링 함수
   --------------------------------------------------------- */
function renderAccount() {
  if (accountNoEl) accountNoEl.textContent = `${accountNo} (${ownerName})`;
  if (balanceEl) balanceEl.textContent = formatWon(balance);
}

function getVisibleTransactions() {
  if (currentFilter === "all") return transactions;
  return transactions.filter((tx) => tx.type === currentFilter);
}

// ✨ 디스플레이 레이아웃 및 색상 지정 렌더링 함수
function renderList() {
  if (!txListEl) return;
  txListEl.innerHTML = ""; 

  const visibleTxs = getVisibleTransactions();

  visibleTxs.forEach((tx) => {
    const li = document.createElement("li");
    const isDeposit = tx.type === "deposit";
    const sign = isDeposit ? "+" : "-";

    // 1. Flexbox 설정: 왼쪽(메모+날짜/번호)과 오른쪽(금액)으로 정렬
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";
    li.style.padding = "10px 0";
    li.style.borderBottom = "1px solid #f0f0f0";

    // 2. 금액 입출금 색상 지정 (입금: 초록색, 출금: 빨간색)
    const amountColor = isDeposit ? "#2e7d32" : "#d32f2f";

    // 3. HTML 내부 구조 생성
    li.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 3px;">
        <span style="font-size: 15px; font-weight: 600; color: #333;">${tx.memo}</span>
        <span style="font-size: 12px; color: #888;">${tx.date} · ${tx.id}</span>
      </div>
      <div style="font-weight: 700; font-size: 15px; color: ${amountColor};">
        ${sign}${formatWon(tx.amount)}
      </div>
    `;

    li.className = tx.type;
    txListEl.prepend(li);
  });
}

function render() {
  renderAccount();
  renderList();
}

/* ---------------------------------------------------------
   STEP 5 — 이벤트 제어
   --------------------------------------------------------- */

if (filtersEl) {
  filtersEl.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      filtersEl.querySelectorAll("button").forEach((btn) => btn.classList.remove("active"));
      e.target.classList.add("active");
      currentFilter = e.target.dataset.filter || "all";
      renderList();
    }
  });
}

if (amountInputEl) {
  amountInputEl.addEventListener("input", (e) => {
    const amount = Number(e.target.value);
    const errorMsg = validateTransfer(amount, balance);

    if (errorMsg) {
      if (formErrorEl) formErrorEl.textContent = errorMsg;
      if (formNoticeEl) formNoticeEl.textContent = "";
      if (submitBtnEl) submitBtnEl.disabled = true;
    } else {
      const fee = calculateFee(amount);
      if (formErrorEl) formErrorEl.textContent = "";
      if (formNoticeEl) formNoticeEl.textContent = `이체 가능 (수수료 0.5%: ${formatWon(fee)})`;
      if (submitBtnEl) submitBtnEl.disabled = false;
    }
  });
}

if (transferFormEl) {
  transferFormEl.addEventListener("submit", (e) => {
    e.preventDefault();

    const amount = Number(amountInputEl.value);
    const memo = (memoInputEl && memoInputEl.value.trim() !== "") ? memoInputEl.value.trim() : "이체";

    const errorMsg = validateTransfer(amount, balance);

    if (errorMsg) {
      if (formErrorEl) formErrorEl.textContent = errorMsg;
      return;
    }

    const fee = calculateFee(amount);
    const totalRequired = amount + fee;
    balance -= totalRequired;

    transactions.push({
      id: `TX-${String(transactions.length + 1).padStart(3, "0")}`,
      date: todayLabel(),
      type: "withdraw",
      amount: amount,
      memo: memo,
    });

    render();

    amountInputEl.value = "";
    if (memoInputEl) memoInputEl.value = "";
    if (formNoticeEl) formNoticeEl.textContent = "";
    if (formErrorEl) formErrorEl.textContent = "";
    if (submitBtnEl) submitBtnEl.disabled = true;

    alert(`[${memo}] ${formatWon(amount)} 이체가 완료되었습니다!\n(차감 금액: ${formatWon(totalRequired)} / 수수료 포함)`);
  });
}

render();