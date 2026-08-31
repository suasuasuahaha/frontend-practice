function a() {
    // () -> console.log('a() is called'); -> 함수
    const printFunction = () => console.log('a() is called');  // 먼저 실행
    setTimeout(printFunction, 1000);
}

a();   // 실제 실행되는 코드
console.log('a() is done');

// a is called가 먼저 출력(동작)되고, a is done이 출력되려면?
// step05.js 만들고 해결해보기