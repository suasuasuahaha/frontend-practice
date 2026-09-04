/**
 * source ~: 번역할 텍스트, 번역할 언어의 타입(ko, ja..)
 * target ~: 번역된 결과 텍스트, 번역될 언어의 타입(ko, ja..)
 */

const [sourceSelect, targetSelect] = document.getElementsByTagName('select');
const [sourceTextArea, targetTextArea] = document.getElementsByTagName('textarea');

// 1. ㅇ -> input 이벤트 발생..   - 타이머ID(1)
// 2. 아 -> input 이벤트 또 발생.. - 타이머ID(2)
// 3. 안 -> input 이벤트 또 발생.... - 타이머ID(3)

// setTimeout()를 활용하면? 어떨까?

let timerId; // 선언만 해두면 초기값이 undefined
// JS에서는 undefiend면 false, 문자, 숫자 등 값이 있으면 true
sourceTextArea.addEventListener('input', (event) => {
    // 계속 입력 중일 때는 앞서 입력으로 생성된 타이머ID를 초기화
    if (timerId) clearTimeout(timerId);

    timerId = setTimeout(() => {
        console.log(event.target.value);
        // 서버에 전송하는 로직(1번만 호출되어야 함)
    }, 2000);
});