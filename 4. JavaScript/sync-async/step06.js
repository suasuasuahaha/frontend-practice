function a() {
  const aCallback = () => console.log('a() started');
  setTimeout(aCallback, 1000);
}
 
function b() {
  const bCallback = () => console.log('b() started');
  setTimeout(bCallback, 500);
}
 
function c() {
  const cCallback = () => console.log('c() started');
  setTimeout(cCallback, 1200);
}
 
a();
console.log('a() done');
b();
console.log('b() done');
c();
console.log('c() done');
//22번 라인 이후 콜백 실행

/* 
    a, b, c는 각각 외부 API를 통한 비동기 요청 로직이며,
    * 외부 API(언어 감지, 언어 번역 등 서버로부터 요청을 통해 응답을 받는 로직)

    각각의 소요시간(500, 1000, 1200)은 네트워크 응답 시간이라고 가정할 경우
    a,b,c 순서대로 동작하게 하려면?
    -> step07.js에 작성
    */