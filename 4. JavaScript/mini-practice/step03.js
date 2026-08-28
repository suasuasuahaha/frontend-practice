// 이번 달에 얼마 썼지? 거래 내역이 6건이면?
// tx = transaction, 거래 내역
let tx1 = 2500000; // 월급
let tx2 = -48000; // 회식
let tx3 = -12000; // 올영
// ... tx6까지??

// 거래 내역을 하나의 변수로 묶어서 담을 수 없을까?
// 여러 값을 하나의 이름으로 묶어주는 개념 = 배열(Array)

// js에서 배열은 [] 기호 사용
const amounts = [2500000, -48000, -12000, -230000]; // 배열은 대괄호로 묶음

console.log(amounts); // 배열 전체 출력

// 배열 내 값을 확인하고 싶으면? 배열명[인덱스번호]로 접근
console.log(amounts[0]); // 0번째 인덱스 값에 접근(2500000)

console.log(amounts.length); 
// 총 거래 내역 몇 건? - 배열 전체 요소의 개수?

// 가장 최근 거래?? -230000원을 확인하려면?
console.log(amounts[amounts.length - 1]); // 마지막 인덱스 값에 접근(-230000)

// 거래 내역들을 모두 합산하려면?
let total = 0; // 총 거래내역 결과를 담을 변수
total = total + amounts[0]; // 0번째 인덱스 값 더하기
total = total + amounts[1];
total = total + amounts[2];
// ... 7천만 번?

for (let i = 0;  i < amounts.length; i++) { // i++ : 증가 연산자
    // 중괄호 내의 코드가 반복 횟수만큼 실행됨
    total = total + amounts[i]; // 처음에는 i = 0
    console.log(total); // 총 거래 내역 합산 결과 출력  
}

//편하게 작성 방법
//별도의 인덱스 관리 없이 배열의 요소를 모두 순회
for (const amount of amounts) {
    // amount라는 변수에 배열의 요소가 순차적으로 담김 / const = 할당은 가능, 재할당 불가
    total = total + amount;
}

console.log(total); // 반복문 밖이기 때문에 한 번만 실행됨

// 조건문
// 입출금을 구분하고 싶을 경우??
// 합계가 아니라 이번 달 지출 내역만 확인하고 싶다면??

let income = 0; // 수입
let expense = 0; // 지출

// 입금 및 출금 처리 함수
for (const amount of amounts) {
    if (amount > 0) {
        income += amount;
    } else {
        expense += amount;
    }
}

// 출력
console.log(`입금 ${income}원 + 출금 ${expense}원`);

// 조건이 세 가지일 경우? 'else if'

/*
    amount가 천만 원 이상이면 '고액 거래' 출력
    0보다 크면 '일반 입금'
    그렇지 않으면 '출금'
*/

function processTransaction(amount) {
  if (amount >= 10000000) {
    // 1천만 원(10,000,000) 이상인 경우
    income += amount;
    console.log(`[고액 거래] ${amount.toLocaleString()}원이 입금되었습니다.`);
  } else if (amount > 0) {
    // 0보다 큰 경우 (1원 ~ 9,999,999원)
    income += amount;
    console.log(`[일반 입금] ${amount.toLocaleString()}원이 입금되었습니다.`);
  } else {
    // 0 이하인 경우 (출금 금액은 보통 양수로 입력받거나 음수로 들어올 수 있으므로 absolute 값으로 처리)
    const expenseAmount = Math.abs(amount);
    expense += expenseAmount;
    console.log(`[출금] ${expenseAmount.toLocaleString()}원이 출금되었습니다.`);
  }
}

// --- 테스트 실행 ---
processTransaction(15000000); // 천만 원 이상 -> 고액 거래
processTransaction(500000);   // 0보다 큼 -> 일반 입금
processTransaction(-20000);   // 그렇지 않음 -> 출금
