const [sourceSelect, targetSelect] = document.getElementsByTagName('select');
const [sourceTextArea, targetTextArea] = document.getElementsByTagName('textarea');

let timerId;
sourceTextArea.addEventListener('input', (event) => {
    if (timerId) clearTimeout(timerId);

    timerId = setTimeout(() => {
        // 번역할 텍스트
        const text = event.target.value;
        
        // XHR 코드 작성
        // 1. XHR API(객체) 호출
        const xhr = new XMLHttpRequest(); // Web API(브라우저에서만 가능)
        
        // 2. Node.js 서버로부터 요청 결과를 받았을 경우 처리할 로직(onload, 콜백)
        xhr.onload = () => {
            if (xhr.readyState == xhr.DONE && xhr.status === 200) {
                // 결과 데이터를 문자열 형태로 응답받음
                const responseData = xhr.response;
                
                // 결과 데이터를 JS 객체 형태로 파싱(역직렬화)
                const parsedData = JSON.parse(responseData);
                console.log(parsedData);
                console.log(parsedData.langCode); // ko
                
                // 화면에 출력할 처리로직, ex. 감지된 언어 -> 한국어
                const detectedLang = parsedData.langCode; // ex. ko
                sourceSelect.value = detectedLang;

                // 언어 번역에 대한 비동기 요청 처리 코드 작성 부분
                // /translate로 전송해야할 값 포맷
                /*
                JSON 포맷 예시
                    data '{
                        "source": "ko", // 언어감지 결과로 받은 값(parsedData.langCode)
                        "target": "en",
                        "text": "안녕",
                    }'
                */
                
            }
        }

        // 3. 요청 준비(어떤 요청이고, 보낼 엔드포인트 주소)

        // 엔드포인트 주소
        const DETECT_LANGUAGE_URL = '/detect';

        // 보낼 데이터(번역할 텍스트)
        const data = {
            query: text
        }
        
        // 직렬화된 데이터
        const stringifiedData = JSON.stringify(data);
        
        xhr.open('POST', DETECT_LANGUAGE_URL);
        // 4. 실제 요청 전송

        // 4-1. 전송할 데이터(컨텐츠)의 타입을 명시
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(stringifiedData);
        
        // 여기에 언어번역 요청 코드 작성할 경우?
            // ko라는 언어감지결과값에 접근할 수 없음

    }, 2000);
});