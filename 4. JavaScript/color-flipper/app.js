console.log('app.js 실행됨');
// 버튼이 클릭되었을 때, 클릭됨!이라는 텍스트를 출력하고 싶으면?
// 1. JS를 통해 HTML 엘리먼트 중에 버튼 엘리먼트를 JS 코드로 가져와야 함

// document.getElementById('가져오고싶은 HTML 엘리먼트를 선택');
// 태그에서 id값으로 특정 태그를 식별해서 가져오는 함수
const button = document.getElementById('btn');
const rgbText = document.getElementById('color');
console.log(rgbText.textContent);

// getElmentById()라는 함수의 실행 결과값을 button이라는 변수에 할당
console.dir(button);

// 2. 가져온 버튼에게 이벤트를 부여한다.
// 여기서는 마우스를 클릭했을 때 동작해야 하기 때문에 'click' 이벤트를 부여
// 이벤트를 부여하기 위한 코드(API) - addEventListener()

// 클릭되었을 때 내가 실행시키고 싶은 코드 로직을 가진 함수
function clickHandler() {
    // console.log('버튼이 클릭되었음!!');
    // const list = getRandomNumber(0, 255);
    // const red = list[0];
    // const green = list[1];
    // 너무 많다...

    // 배열 디스트럭처링 문법
    const [red, green, blue] = getRandomNumber(0, 255);

    // 배경색 변경 로직
    const rgbColor = `rgb(${red}, ${green}, ${blue})`;
    document.body.style.backgroundColor = rgbColor;
    // RGB 텍스트 숫자값, 색상 변경 로직
    rgbText.textContent = rgbColor;
    rgbText.style.color = rgbColor;
}

button.addEventListener('click', clickHandler);

// 3. 랜덤값을 추출하는 유틸 함수
function getRandomNumber(min, max) {
    const randomRGBArray = [];

    for (let i = 0; i < 3; i++) {
        const randomNumber = Math.floor(Math.random() * ( max - min + 1)) + min;
        randomRGBArray.push(randomNumber);
    }

    return randomRGBArray;
}