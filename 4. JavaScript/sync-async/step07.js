function a(callbackFn) {
  const aCallback = () => {
    console.log('a() started');
    callbackFn();
  };
  setTimeout(aCallback, 1000);
}

function b(callbackFn) {
  const bCallback = () => {
    console.log('b() started');
    callbackFn();
  };
  setTimeout(bCallback, 500);
}

function c(callbackFn) {
  const cCallback = () => {
    console.log('c() started'); // 동기
    callbackFn();               // 동기
  };
  setTimeout(cCallback, 1200); // 비동기
}
// 콜백 지옥(콜백 헬), 가독성이 많이 떨어지는 코드
// 어떤 비동기 처리 결과를 가지고 후속 작업을 추가 수행하려면 아래와 같이 작성해야 했었음
// 순서는 보장되지만, 처리가 늘어날수록 콜백함수가 계속 중첩됨
a(() => {
  console.log('a() done');

  b(() => {
    console.log('b() done');

    c(() => {
      console.log('c() done');
    });
  });
});

// https://www.jsv9000.app/ 


