/* 콜백 패턴의 또 다른 단점은 에러 처리가 어렵다.

try {
    a++;
}   catch(error)    {   
    // try {} 내부에 작성된 코드에 문제가 있을 경우, 실행되는 코드
    console.error(`잡은 에러: ${error}`);
}
*/

try {
    // 비동기 로직일 경우
    setTimeout(() => { // 비동기코드 / setTimeout이라는 함수 자체만 실행
        a++; // setTimeout( )의 콜백을 호출한 호출자(Caller)는 setTimeout이 아님
        // catch 블럭의 분기를 지난 이후에 백 그라운드에서 실행됨
    }, 1000); // 1초 뒤 실행
} catch (error) { // finally 코드는 무조건 실행
    console.error(`잡은 에러: ${error}`);
}
console.log('try external block') // 여기까지 끝나야 setTimeout 실행