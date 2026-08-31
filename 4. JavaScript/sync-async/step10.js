// 결과적으로 비동기 처리가 완료된 이후에 응답된 결과를 가지고 후속 처리를 수행하기 위해
// 콜백 함수를 전달하는 패턴을 사용할 경우, 아래와 같이 작성할 수 있음
let resultData;
const get = (url, successCallback, failureCallback) => {
    console.log('get() 시작됨');
    
    // 비동기 요청 로직(with XHR)
    const xhr = new XMLHttpRequest(); 
    xhr.open('GET', url); 
    xhr.send(); 

    xhr.onload = () => { 
        
        if (xhr.status === 200) { 
            successCallback(xhr.response);  //line26 의 result와 동일
            console.log(resultData); // 비동기 처리 후 할당되었기 때문에 값이 제대로 할당됨
        } else { 
            // failureCallback === console.error
            failureCallback(`${xhr.status} ${xhr.statusText}`);
        }
    }
    console.log('get() 종료됨');
}

// 2,3번째 인수에 성공/실패 시의 콜백 로직을 전달
const getResult = get(url, (result) => resultData = result, console.error)
console.log(resultData); // X

