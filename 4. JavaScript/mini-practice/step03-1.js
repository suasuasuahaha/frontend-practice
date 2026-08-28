// 교안에서는 STEP3

// 거래 내역
// const amounts =  [2500000, -48000, -12500, -230000, 150000, -8900];

// const 거래처 = [월급, 회식, 택시비,];

// 월급 내역 출력?
// console.log(`${거래처[0]}: ${amounts[0]}`);

// -> 이대로 관리하면 값의 매핑이 꼬일 수 있다.
// 일시적인 네트워크 에러 등으로 인한 시스템 장애

// 관련있는 값들을 묶어서 하나의 의미단위로 관리할 수 없을까? -> 객체(Object)

// 한건의 거래를 객체로 만들어보자 - {} 기호 사용
// const tx = {}; // 아무 값도 없는 빈 객체 생성됨
// console.log(tx);

// 객체 안에 여러 개의 변수를 선언하고 값을 할당할 수 있음
const tx = {
    id: 'TX-001', // id라는 변수에 TX-001이라는 문자열값 할당
    date: '270828',
    type: 'withdraw', // 입금? 출금?
    amount: 48000,
    memo: '관리비'
};
console.log(tx);
// 내가 궁금한건 이 거래의 식별자(id) 값이 궁금할 경우?
// -> 특정 프로퍼티에 접근
console.log(tx.id);

// 두 번째 거래 내역
const tx2 = {
    id: 'TX-002',
    date: '270828',
    type: 'deposit', // 입금
    amount: 500000,
    memo: '알바비'
};
console.log(tx2);
// 내가 궁금한건 이 거래의 식별자(id) 값이 궁금할 경우?
// -> 특정 프로퍼티에 접근
console.log(tx2.id);

// 이제는 거래 내역이라는 객체 단위로 데이터를 관리할 수 있음
const transactions = [tx, tx2];
// TODO: transactions 배열을 활용해서 조건, 반복, 특정 원하는 포맷으로 출력해보기
//1년 동안 계속 같은 금액으로 들어온다고 할 때, 얼마 저축할 수 있는지 만들어줘.

let monthlyIncome = 0;  // 한 달 총수입
let monthlyExpense = 0; // 한 달 총지출

// transactions 배열을 순회하면서 한 달 수입/지출 집계
for (const item of transactions) {
  if (item.type === 'deposit') {
    monthlyIncome += item.amount;  // monthlyIncome = monthlyIncome + item.amount
  } else if (item.type === 'withdraw') {
    monthlyExpense += item.amount; // monthlyExpense = monthlyExpense + item.amount
  }
}

// 월 순수익 (수입 - 지출)
const monthlySavings = monthlyIncome - monthlyExpense;

// 1년(12개월) 총 저축 예상액
const yearlySavings = monthlySavings * 12;

// 결과 출력
console.log('=== 월간 내역 ===');
console.log(`월 수입: ${monthlyIncome.toLocaleString()}원`);
console.log(`월 지출: ${monthlyExpense.toLocaleString()}원`);
console.log(`월 저축 가능액: ${monthlySavings.toLocaleString()}원`);

console.log('\n=== 1년(12개월) 예상 저축액 ===');
console.log(`1년 동안 총 ${yearlySavings.toLocaleString()}원을 저축할 수 있습니다!`);