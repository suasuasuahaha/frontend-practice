function a(callbackFn) {
    const printFunction = () => {
        console.log('a() is called');
        callbackFn();
    }
    setTimeout(printFunction, 1000);
}

// aCallback이라는 변수에 함수를 할당
const aCallback = () => console.log('a() is done');
a(aCallback);