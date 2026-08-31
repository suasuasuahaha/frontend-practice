/* =========================================================
   미니 계좌 대시보드 — STEP 4 시작점 (수강생 배포용)

   STEP 1~3에서 콘솔로 함께 만든 결과가 이미 들어 있습니다.
   지금부터 이 데이터를 화면에 그리고(STEP 4),
   서버에서 불러옵니다(STEP 5).

   TODO 주석이 있는 자리를 함께 채웁니다.
   ========================================================= */

/* ---------------------------------------------------------
   STEP 1 — 계좌 상태와 계산 규칙
   --------------------------------------------------------- */
let accountNo = "110-234-567890";
let ownerName = "김민준";
let balance = 1250000;

const FEE_RATE_NORMAL = 0.005;   // 일반 수수료 0.5% (비율은 1 = 100% 기준)
const FEE_RATE_PRIME = 0.002;    // 우대 수수료 0.2%
const DAILY_LIMIT = 10000000;    // 1회 이체 한도

/* ---------------------------------------------------------
   STEP 2~3 — 데이터와 규칙
   --------------------------------------------------------- */
let transactions = [
  { id: "TX-001", date: "08-01", type: "deposit",  amount: 2500000, memo: "8월 급여" },
  { id: "TX-002", date: "08-03", type: "withdraw", amount: 48000,   memo: "관리비" },
  { id: "TX-003", date: "08-05", type: "withdraw", amount: 12500,   memo: "편의점" },
];

const signedAmount = (tx) => (tx.type === "deposit" ? tx.amount : -tx.amount);

const formatWon = (n) => `${n.toLocaleString("ko-KR")}원`;

const calculateFee = (amount, rate = FEE_RATE_NORMAL) => Math.floor(amount * rate);

function validateTransfer(amount, currentBalance) {
  if (Number.isNaN(amount)) return "숫자만 입력할 수 있습니다";
  if (amount <= 0) return "0원보다 큰 금액을 입력해주세요";
  if (amount > DAILY_LIMIT) return "1회 이체 한도를 초과했습니다";

  const total = amount + calculateFee(amount);
  if (total > currentBalance) return `수수료 포함 ${formatWon(total)}이 필요합니다`;

  return null;
}

function todayLabel() {
  const d = new Date();
  return `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/* ---------------------------------------------------------
   STEP 4 — 화면에 그리기
   --------------------------------------------------------- */

// TODO 4-1. 화면 요소를 먼저 찾아둡니다 (getElementById)
// TODO 4-1. 화면 요소를 먼저 찾아둡니다 (getElementById)
const accountNoEl  = document.getElementById("accountNo");
const balanceEl    = document.getElementById("balance");
const listEl       = document.getElementById("txList");
const filtersEl    = document.getElementById("filters");
const formEl       = document.getElementById("transferForm");
const amountInput  = document.getElementById("amountInput");
const submitBtn    = document.getElementById("submitBtn");
const formErrorEl  = document.getElementById("formError");
const formNoticeEl = document.getElementById("formNotice");

let currentFilter = "all";

// TODO 4-2. 계좌 정보와 잔액을 화면에 표시하는 함수
function renderAccount() {
  accountNoEl.textContent = `${accountNo} · ${ownerName}`;
  balanceEl.textContent = formatWon(balance);        // STEP 3의 함수 재사용
  balanceEl.classList.toggle("negative", balance < 0);
}

// TODO 4-3. 현재 필터에 맞는 거래만 골라내는 함수 (filter)
function getVisibleTransactions() {
  if (currentFilter === "all") return transactions;              // "all"만 예외 — 통째로 반환
  return transactions.filter((tx) => tx.type === currentFilter); // data-filter 값 === tx.type 이라 비교 한 줄로 끝
}  

// TODO 4-4. 거래내역 목록을 그리는 함수 (createElement / textContent / prepend)
function renderList() {
  const list = getVisibleTransactions();        // 입금인지, 출금인지 판별
  listEl.textContent = "";                      // 이전 내용 비우기 (초기화)

  if (list.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "표시할 거래가 없습니다";
    listEl.appendChild(empty);
    return;
  }

  list.forEach((tx) => {       // 콜백함수
    console.log(tx); // tx가 뭐지?

    const li = document.createElement("li");     // 1. li 태그 생성
    li.className = tx.type;                      //    (deposit / withdraw → 초록·빨강)
    li.dataset.id = tx.id;                       //    나중에 클릭할 때 쓸 표식

    const left = document.createElement("div");  // div - 블럭

    const memo = document.createElement("div");
    memo.className = "tx-memo";                  // memo 블럭 
    memo.textContent = tx.memo;                  // 2. 채우고 (textContent!)

    const meta = document.createElement("div");
    meta.className = "tx-meta";                  // meta 날짜, 아이디
    meta.textContent = `${tx.date} · ${tx.id}`;

    left.append(memo, meta);

    const signed = signedAmount(tx);             // STEP 3의 함수 재사용 (signed = 부호포함 / unsigned = 부호 미포함 / 입금, 출금에 따른 부호 활용)
    const amountEl = document.createElement("div");
    amountEl.className = "tx-amount";
    amountEl.textContent = `${signed > 0 ? "+" : ""}${formatWon(signed)}`;

    li.append(left, amountEl);                   // left + right(signed)
    listEl.prepend(li);                          // 3. 넣어야 보인다 (맨 위 = 최신순)
  });
}

function render() {    // 함수 호출
  renderAccount();
  renderList();
}

// TODO 4-5. 필터 버튼 — 부모에 한 번만 등록 (이벤트 위임)
filtersEl.addEventListener("click", (e) => {
  // closest = 자기 자신부터 부모 방향으로 올라가며 처음 일치하는 요소를 반환 (없으면 null)
  // 버튼 안 글자를 눌러도 e.target은 그 글자 위(부모)로 올라가 <button>을 집어냄
  const btn = e.target.closest("button");  // e = event
  if (!btn) return;                        // 버튼 사이 여백 클릭 → null → 여기서 중단 (없으면 다음 줄에서 에러 발생 가능)

  currentFilter = btn.dataset.filter;      // data-filter="deposit" → "deposit".
  filtersEl.querySelectorAll("button").forEach((b) => {
    // toggle의 2번째 인자는 "토글"이 아니라 강제 지정: true면 add, false면 remove
    // b === btn 은 참조 비교 → 클릭된 버튼만 true → 항상 정확히 하나만 active
    b.classList.toggle("active", b === btn);
  });
  renderList();                            // 직접 li를 숨기지 않음, 상태만 바꾸고 화면에 다시 렌더링
});

// TODO 4-6. 이체 금액 입력 — input 이벤트로 실시간 검증
amountInput.addEventListener("input", (e) => {
  const raw = e.target.value;
  const amount = Number(raw);                                  // STEP 1: 입력값은 문자열!
  const error = raw === "" ? "금액을 입력해주세요" : validateTransfer(amount, balance);

  formErrorEl.textContent = raw === "" ? "" : (error || "");
  submitBtn.disabled = Boolean(error);                         // 문제가 있으면 버튼 잠금
  formNoticeEl.textContent = error
    ? ""
    : `수수료 ${formatWon(calculateFee(amount))} 포함 ${formatWon(amount + calculateFee(amount))} 출금됩니다`;
});

// TODO 4-7. 이체 폼 제출 — preventDefault 후 직접 처리
// form 태그가 가진 기본 기능인 화면 새로고침 기능을 비활성화해야 함
formEl.addEventListener("submit", (e) => {
  e.preventDefault();  // 새로고침 기능 비활성화

  const amount = Number(amountInput.value);
  const error = validateTransfer(amount, balance);
  if (error) {
    formErrorEl.textContent = error;
    return;
  }

  const fee = calculateFee(amount);
  balance = balance - amount - fee;

  // 원본을 직접 밀어넣지 않고 새 배열을 만든다
  transactions = [
    ...transactions,  // transactions 배열의 요소들을 풀어헤침 -> {tx-1}, {tx-2}, {tx-3}
    {
      id: `TX-${String(transactions.length + 1).padStart(3, "0")}`,   // ex) 3번 -> 003번
      date: todayLabel(),
      type: "withdraw",
      amount: amount + fee,
      memo: "이체",
    },
  ];

  // 입력값 부분 초기화 처리
  amountInput.value = "";   // 금액 입력 값 -> 공백으로 초기화
  submitBtn.disabled = true;    // 이체 버튼 활성화 초기화
  formErrorEl.textContent = "";   // 에러 메시지 비워두기
  formNoticeEl.textContent = `${formatWon(amount)} 이체 완료 (수수료 ${formatWon(fee)})`;
  render();
});

/* ---------------------------------------------------------
   STEP 5 — 서버에서 불러오기
   --------------------------------------------------------- */

// TODO 5-1. async 함수로 transactions.json 을 fetch
// TODO 5-2. response.ok 를 직접 확인
// TODO 5-3. try / catch / finally 로 에러와 로딩 처리

render();
