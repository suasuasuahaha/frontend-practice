// // 화면의 여러 군데에 금액을 표시해야하는 상황

// // 조회 페이지
// console.log(`${(1250000).toLocaleString()}원`);
// console.log(`${(48000).toLocaleString()}원`);
// console.log(`${(2500000).toLocaleString()}원`);

// // 내역 페이지
// console.log(`${(1250000).toLocaleString()}원`);
// console.log(`${(48000).toLocaleString()}원`);
// console.log(`${(2500000).toLocaleString()}원`);

// // 개인 페이지
// console.log(`${(1250000).toLocaleString()}원`);
// console.log(`${(48000).toLocaleString()}원`);
// console.log(`${(2500000).toLocaleString()}원`);

// 코드가 중복인 상태, 만약 코드의 포매팅이 변경되면 다 바꿔야 함

// 함수라는 하나의 코드 묶음으로 추출해서 중복을 제거

// formatWon이라는 이름의 함수를 선언
function formatWon(n) { //n은 파라미터
    // let n = 1250000; 이라는 코드 실행
    return `${n.toLocaleString('ko-KR')}원`; // localstring : 국제화
}

// 함수 호출
console.log(formatWon(1250000));  // 함수 호출 : log()
// 1250000이라는 값이 n에 할당됨
console.log(formatWon(48000)); // 값만 바꿔서 재호출 가능
// 코드가 재사용 가능해짐 (함수를 사용하는 이유)

// TODO: 이체할 수 있는지 검증하는 함수
// 이체할 금액과 잔액을 파라미터로 전달받음
// 이체 금액이 잔액을 초과하면 이체 금지

//number인지 확인
//이체할 금액 입력 조건 (ex. 이체할 금액은 1 이상의 숫자, 잔액은 0 이상의 숫자로 입력하세요)
//입금액 확인
//잔액 확인
//있는 타입 다 넣어야 함 (null, 문자, 등등)
//테스트할 때는, 파라미터가 기하급수적으로 늘어남
 


// 이체 검증 함수 (파라미터 확장)
// amount: 금액, balance: 잔액, userTier: 회원등급, memo: 송금메모, currentHour: 현재 시각(0~23)
function checkAdvancedTransfer(amount, balance, userTier = 'NORMAL', memo = '', currentHour = 12) {
  // 1. GREEN 혜택: 일반은 50만 원, GREEN는 100만 원 한도
  const dailyLimit = userTier === 'GREEN' ? 1000000 : 500000;

  // 2. 야간 수수료 계산 (23시 ~ 06시 사이 이체 시 500원 추가)
  const isNight = currentHour >= 23 || currentHour < 6;
  const fee = isNight ? 500 : 0;
  const totalRequired = amount + fee; // 총 필요한 금액 (이체금액 + 수수료)

  console.log(`\n[이체 시도] 요청: ${formatWon(amount)} | 메모: "${memo}" | 시각: ${currentHour}시`);

  // 3. [조건 1] 보안 검증: 금지어 포함 여부
  if (memo.includes('사기') || memo.includes('도박')) {
    console.log(`🚨 [보안 차단] 의심스러운 단어가 포함되어 이체가 거부되었습니다.`);
    return false;
  }

  // 4. [조건 2] 일일 한도 검증
  if (amount > dailyLimit) {
    console.log(`❌ [한도 초과] ${userTier} 등급의 1회 한도는 ${formatWon(dailyLimit)}입니다.`);
    return false;
  }

  // 5. [조건 3] 잔액 검증 (수수료 포함)
  if (totalRequired > balance) {
    console.log(`❌ [잔액 부족] 필요 금액(수수료 포함): ${formatWon(totalRequired)} / 현재 잔액: ${formatWon(balance)}`);
    return false;
  }

  // 모든 조건 통과 시 성공 처리
  if (fee > 0) console.log(`🌙 야간 이체 수수료 ${formatWon(fee)}이 적용되었습니다.`);
  console.log(`✅ [이체 성공] ${formatWon(amount)} 송금 완료! (남은 잔액: ${formatWon(balance - totalRequired)})`);
  return true;
}

// --- 테스트 케이스 ---

let balance = 1250000;

// 케이스 1: 야간 이체 (새벽 1시) -> 수수료 500원 자동 붙음
checkAdvancedTransfer(30000, balance, 'NORMAL', '야식비', 1);

// 케이스 2: 의심 거래 차단 -> 메모에 '도박' 포함
checkAdvancedTransfer(1000000, balance, 'GREEN', '', 02);

// 케이스 3: 등급별 한도 체크 (일반 회원 100만 원 시도 -> 실패)
checkAdvancedTransfer(1000000, balance, 'NORMAL', '월세', 14);

// 케이스 4: 등급별 한도 체크 (GREEN 회원 100만 원 시도 -> 성공)
checkAdvancedTransfer(1000000, balance, 'GREEN', '월세', 14);

function formatWon(n) {
  return `${n.toLocaleString('ko-KR')}원`;
}

function checkTransferSafe(amount, balance) {
  // ----------------------------------------------------
  // [1단계: 입력값 검증 (Guard Clause)]
  // ----------------------------------------------------
  
  // 1. 숫자가 아니거나 NaN인 경우
  if (typeof amount !== 'number' || Number.isNaN(amount)) {
    console.log(`⛔ [입력 오류] 올바른 숫자 금액을 입력해 주세요. (입력값: ${amount})`);
    return false;
  }

  // 2. 0 이하의 금액(0원, 음수)인 경우
  if (amount <= 0) {
    console.log(`⛔ [금액 오류] 이체 금액은 0원보다 크고 양수여야 합니다. (입력값: ${amount})`);
    return false;
  }

  // 3. 소수점이 포함된 경우 (원화 기준)
  if (!Number.isInteger(amount)) {
    console.log(`⛔ [단위 오류] 원화는 정수 단위로만 이체할 수 있습니다.`);
    return false;
  }

  // ----------------------------------------------------
  // [2단계: 실제 비즈니스 로직 (잔액/한도 검사)]
  // ----------------------------------------------------
  if (amount > balance) {
    console.log(`❌ [잔액 부족] 현재 잔액: ${formatWon(balance)} / 요청: ${formatWon(amount)}`);
    return false;
  }

  console.log(`✅ [이체 성공] ${formatWon(amount)} 송금 완료!`);
  return true;
}

// --- 다양한 상황 테스트 ---

let myBalance = 100000;

checkTransferSafe("50000", myBalance); // ⛔ 문자가 들어온 경우 ("50000")
checkTransferSafe("오만원", myBalance);  // ⛔ 한글 문자가 들어온 경우
checkTransferSafe(-10000, myBalance);  // ⛔ 음수가 들어온 경우
checkTransferSafe(0, myBalance);       // ⛔ 0원이 들어온 경우
checkTransferSafe(5000.5, myBalance);  // ⛔ 소수점이 들어온 경우
checkTransferSafe(30000, myBalance);   // ✅ 정상적인 숫자 입력
