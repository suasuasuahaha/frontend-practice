// 실제 활용에 필요한 코드를 먼저 작성
// 이후에 원리적인 부분(step01~04)은 뒤에서 진행


// XHR과 promise를 활용해서 비동기 요청 처리 수행
// Promise 자체는 비동기 요청에 활용할 수도 있고, 
// 다른 맥락으로 활용할 수도 있음
const executor = (resolve, reject) => {
    // setTimeout 대신 XHR로 변경
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost:4000/users';
    xhr.open('GET', url);

    xhr.onload = () => {
        if (xhr.status === 200) { // 200 성공 시
            const data = JSON.parse(xhr.response);
            resolve(data); // resolve의 인수로 응답데이터(data) 전달
        } else {
            // 에러 메시지를 reject의 인수로 작성
            reject(new Error(`HTTP 에러: ${xhr.status}`));
        }

    }
    xhr.send();
}

// 위에서 만든 executor를 인수로 전달
const promise = new Promise(executor);

console.log(promise);

promise
.then(data => console.log(data))
.catch(error => console.error(error));