// open server 켜서 f12>console에서 확인
//계좌 조회 목적으로 출력
console.log('110-234-56789');

//계좌 이체를 하고 싶음
//계좌 번호 값이 '또 필요함'
console.log('110-234-56789');

//어딘가에서 또 사용
console.log('110-234-56789');

//변수라는 공간에 값을 담아두고 재사용
let accountNO = '110-234-56789';
// -> accountNO라는 변수에 '110-234-56349'라는 값을 담아두고 재사용 가능
console.log(accountNO); //변수명으로 출력하면 동일한 값 확인 가능 // accountNO = 주소

console.log(accountNO); 
console.log(accountNO); 

let ownerName = '김민준'; // 이름 / let = 변할 수 있는 값 > 정책적으로 이름을 바꿀 수 있나? / ai로 인한 오류로 이름이 바뀐다면, 다시 쉽게 바꿀 수 있도록 (사고방지)
let balance = 1250000; // 잔액

balance = balance - 50000; // 잔액에서 5만원을 차감
console.log(balance); // 잔액 확인

// 수수료율 책정 (정책상 고정된 값이라고 가정)
// constant의 줄임말 (고정)
const FEE_RATE_NORMAL = 0.005; // 수수료율 0.5% // 대문자 = 고정된 값 / 소문자 = 변할 수 있는 값
const FEE_RATE_PRIME = 0.002; // 우대수수료율 0.2%
const DAILY_LIMIT = 10000000; // 하루 이체 한도 1000만원
console.log(DAILY_LIMIT); // 상수는 변수와 달리 재할당 불가
DAILY_LIMIT = 20000000; // 상수는 재할당 불가

//