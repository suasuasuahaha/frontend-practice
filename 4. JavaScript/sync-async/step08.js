// Q. 다음 result, g의 출력값은?
let g = 0;
function setGWith100() {
    console.log('setGWith100 started');
    setTimeout(() => g = 100, 1000);
    console.log('setGWith100 ended');

    return g;  // g값 없음
}
const result = setGWith100();

console.log(result); //0
console.log(g); //0

/*
setTimeout()의 콜백 함수인 () => g = 100(Anonymous) 함수가 종료되고, 
테스크 Q로 이동 후, 콜스택이 전부 비워진 후에 호출되기 때문에 가장 마지막에 동작하게 돼서
-> 비동기 처리 결과를 반환값으로 저장하거나, 상위 스코프의 변수에 할당하는 것이 불가능

이벤트 루프 관점에서의 실제 동작 과정
setTimeout 실행

브라우저(Web API)에 "1초 뒤에 () => g = 100 함수를 실행해줘"라고 타이머를 등록만 하고 즉시 다음 코드로 넘어갑니다.

타이머 완료 ➔ 태스크 큐(Task Queue)로 이동

1초가 지나면 Web API는 익명 콜백 함수 () => g = 100을 대기실인 태스크 큐에 집어넣습니다.

콜 스택(Call Stack) 비우기

이벤트 루프는 콜 스택이 완전히 비워질 때까지 기다립니다. 따라서 하단의 console.log(result), console.log(g)가 먼저 콜 스택에 들어가서 실행을 마치고 나갑니다.

콜백 함수 호출

콜 스택이 완전히 비어있는 것을 확인한 이벤트 루프가 그제서야 태스크 큐에 있던 () => g = 100을 콜 스택으로 가져와 실행합니다.
*/