/*
    과제. Promise를 활용하여 순서가 있는 2단계 비동기 요청 체인 구현하기
    
    1. posts/1과 같이 특정 id로 게시글(post)을 조회
    -> localhost:4000/posts/1

    2. 조회된 게시글에서 userId에 해당하는 user의 상세 정보를 조회
    -> localhost:4000/users/{posts에서 조회된 userId값, 동적으로 결정됨}

    3. 조회된 user 상세 정보를 콘솔에 출력(화면 렌더링이라고 가정)
*/

/** 공통 GET 함수 ─ onload 로직은 그대로 재사용 */
const get = (endpoint) =>
    // get() 함수는 Promise 객체를 리턴함(return 구문이 없지만, return이 됨)
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const url = `http://localhost:4000/${endpoint}`;   // ← posts·users 경로만 바뀜
    xhr.open('GET', url);

    xhr.onload = () => { 
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.response);
        resolve(data);
      } else {
        reject(new Error(`HTTP 오류: ${xhr.status}`));
      }
    };

    xhr.send();
  });

// TODO: 작성 부분

/* 1단계: id로 게시글 조회 */
const getPost = (postId) => get(`posts/${postId}`);
// console.log(getPost(1));

/* 2단계: 작성자 — getPost()의 resolve를 통해 응답받은 post 객체를 getUser의 함수 파라미터인 post로 전달받아 post.userId로 사용자 조회 */
const getUser = (post) => get(`users/${post.userId}`) // 화살표 함수 작성

/* 3단계: 결과 출력용 헬퍼 */
const printUser = user => console.log(user)// 화살표 함수 작성

// 각 메서드(getPost, getUser, printUser) 호출
getPost(1) // promise 객체를 반환함(then, catch 사용 가능)
.then(getUser)
.then(printUser)
.catch(console.error);

// 콜백코드와의 차이