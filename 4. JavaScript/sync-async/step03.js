// 콜백 함수 이해하기

// name을 전달 받아 인사를 하는 함수
function greeting(name)  {
    console.log(`Hello ${name}`);
}

// 사용자의 입력을 받아서 처리하는 함수
// name과 callbackFunction이라는 인자를 전달 받음
function processUserInput(name, callbackFunction)  {
    // callbackFunction이라는 변수에 greeting 이라는 함수를 값처럼 할당한 상태
    // -> let callbackFunction = greeting; // JS에서는 함수를 값으로 담을 수 있음
    console.log(callbackFunction)
    
    // 2번째 인자로 전달 받은 파라미터를 함수처럼 호출
    callbackFunction(name);
}

// 두번째 인자로 greeting 이라는 함수 전달
processUserInput('한수아', greeting);

// -------------------------------
// 함수 2개 작성
// 1. 쿠팡에서 사과를 기다리는 함수 waitCoupang(apple, callbackFunction)
// 함수의 동작 : '쿠팡에서 ${apple}가 도착했다'라는 메시지 출력
function waitCoupang(apple, callbackFunction) {  
    console.log(`쿠팡에서 ${apple}가 도착했다`)    // 서버로부터 응답받은 데이터 로직이라고 가정
    // 후속 처리 작업을 수행하는 코드 작성 부분 - 옆집 아주머니에게 전달하는 코드
    callbackFunction(); // toNeighbor() 함수를 호출
}

// 2. 옆집 아주머니에게 사과를 전달해주는 함수 toNeighbor()
// 함수의 동작 : '아주머니에게 전달 완료!'
function toNeighbor() {
    console.log(`아주머니에게 전달 완료!`);
}

// * 사과가 도착하지 않으면 전달하면 안 됨
// 사과가 도착해야 전달할 수 있음
waitCoupang('사과', toNeighbor)




