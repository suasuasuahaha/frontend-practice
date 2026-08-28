// 데이터 타입

// 사용자가 화면에 값을 입력하기 위해 30,000원 입력함
// 화면에서는 값을 받아서 처리를 해야 함
// 그대로 연산에 적용할 경우? 어떻게 될까?

const inputValue = '300000'; // 사용자가 입력한 값
// 처음 가입이라 1000원 증정
console.log(inputValue + 1000); // 300001000??
// -> 문자 + 숫자 = 문자로 연산됨

// typeof - 데이터의 타입 확인 연산자
console.log(typeof inputValue); // String이라는 문자열 타입
console.log(typeof 1000); // Number라는 숫자 타입

// 어떻게 해결?? - 타입 변환으로 해결
const amount = Number(inputValue); // inputValue를 Number타입으로 변환
// 변환하고나서 amount라는 상수에 할당

console.log(amount + 1000); // 31000, 제대로 연산됨
console.log(typeof amount);

// 아래가 왜 다른지 콘솔에서 확인하고, 결과를 각각 적어보세요 / = : 할당연산자, == : 동등연산자, === : 일치연산자
console.log("5" + 3);
console.log(Number("5") + 3);
console.log("5" == 5); // true (타입 변환 후 비교)
// 실행시점에 "5"를 js가 암묵적으로 변환하여 비교했기 때문에
console.log("5" === 5); // false (타입자체를 엄격하게 비교)

// 수수료율 계산한 결과 뽑기
const feeRate = 0.005; // 수수료율 0.5%

// 원 단위는 절사해서 계산하고 싶을 경우?
const fee = amount * feeRate; // 수수료율 계산 후 소수점 절사
const totalCost = amount + fee;

console.log('이체 금액은', totalCost + '원' + '수수료는 ' + fee + '원'); // fee는 ''에 있으면 문자열로 인식
// 쓰기 불편함

console.log(`이체 ${amount}원 + 수수료 ${fee}원 = 총 ${totalCost}원`); // 백틱(`)을 이용한 문자열 보간법

// 이체가 가능한지 판단하고 싶을 때?
// 이체 비용이 잔액보다 적을 경우에만 이체 가능

// 이체 가능한지? 라는 의미의 변수
const balance = 50000;
const canTransfer = totalCost <= balance; // true or false
console.log(canTransfer); // true or false

// 사용자에게 메시지 출력
// canTransfer가 true면 이체 가능, false면 이체 불가

const message = canTransfer ? '이체 가능' : '이체 불가'; 
// 삼항연산자, 조건식 ? 참일때 : 거짓일때

console.log(`잔액 ${balance}원 / 필요 ${totalCost}원 -> ${message}`); // 잔액 50000 / 필요 51500원 -> 이체 불가

// 이체한도 내에서의 조건도 추가해서 작성하려면? (&&)
const DAILY_LIMIT = 10000000; // 하루 이체 한도 1000만원

// 이체 가능할까?
// 변수에 담을 값이 true or false인 경우, 보통 의문문 형태로 네이밍
const isValid = amount > 0 && amount <= 
                DAILY_LIMIT && balance >= totalCost;


// 가독성을 높인 코드 예시
/*
    // 1. 개별 유효성 조건 분리
const isPositiveAmount = amount > 0;
const isWithinDailyLimit = amount <= DAILY_LIMIT;
const hasSufficientBalance = balance >= totalCost;

// 2. 최종 조건 결합
const isValid = isPositiveAmount && isWithinDailyLimit && hasSufficientBalance;
*/