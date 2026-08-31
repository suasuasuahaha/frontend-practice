// 실제 외부 API를 이용해서 실제 비동기 요청을 전송해보는 예시(setTimeout x)

const URL = 'https://jsonplaceholder.typicode.com/posts/1';
let result; // 결과값을 담을 변수

// URL을 파라미터로 받아 비동기 요청을 수행하는 함수 get(url)
const get = (url) => {
    console.log('get() 시작됨');
    
    // 비동기 요청 로직(with XHR)
    const xhr = new XMLHttpRequest(); // 비동기 요청 처리 객체 생성
    xhr.open('GET', url); // 비동기 요청 준비
    xhr.send(); // 실제 요청 전송 수행 함수 호출

    // 응답 처리 코드, onload: 응답 데이터를 모두 (다운)로드 완료되면,
    xhr.onload = () => { 
        // 로드 완료되면 실행시킬 로직 작성 부분    
        if (xhr.status === 200) { // 응답 코드가 200, 성공일 경우
            console.log(xhr.response); // 응답 데이터 출력

            result = JSON.parse(xhr.response); // 상위 스코프에 할당(?)
            return JSON.parse(xhr.response); // 값 그 자체를 반환(?)

        } else { // 응답이 실패할 경우, 실패 원인에 대한 텍스트 출력
            console.error(`${xhr.status} ${xhr.statusText}`);
        }
    }

    console.log('get() 종료됨');
}

// 실제 함수 호출
const getResult = get(URL);
console.log(getResult);
console.log(result);

// 여기서 응답값을 사용하려면??(X)
