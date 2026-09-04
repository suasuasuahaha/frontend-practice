const [sourceSelect, targetSelect] = document.getElementsByTagName('select');
const [sourceTextArea, targetTextArea] = document.getElementsByTagName('textarea');

// 번역될 언어의 타입 변경 이벤트
// English면 en, 한국어면 ko
let targetLanguage = 'en'; // 번역하고 싶은 언어의 타입, 초기값은 en(English)
targetSelect.addEventListener('change', (event) => targetLanguage = event.target.value);

let timer;
sourceTextArea.addEventListener('input', (event) => {
    if (timer) clearTimeout(timer);
    
    timer = setTimeout(() => {
        const text = event.target.value;
        
        // 언어 감지 요청
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.readyState == xhr.DONE && xhr.status === 200) {
                const responseData = xhr.response;
                const parsedData = JSON.parse(responseData);
                
                // 화면에 출력할 처리로직, ex. 감지된 언어 -> 한국어
                const detectedLang = parsedData.langCode;
                sourceSelect.value = detectedLang;

                // 후속처리: 언어 감지 요청으로 응답받은 '감지된 언어 결과값(ex. ko)'을 가지고 언어 번역 요청
                const xhr2 = new XMLHttpRequest();

                const url = '/translate';

                const data = JSON.stringify({
                    source: detectedLang,
                    target: targetLanguage,
                    text, // text: text와 같다.
                });

                xhr2.open('POST', url);
                xhr2.onload = () => {
                    if (xhr2.readyState === xhr2.DONE && xhr2.status === 200) {
                        const responseData = JSON.parse(xhr2.response); // {translatedText: 'hello', srcLanguage:'ko', tarLanguage: 'en'}
                        console.log(responseData);

                        targetTextArea.value = responseData.translatedText;

                        // 만약 여기서 언어 번역 이후 후속처리가 또 필요하다면??
                        // 여기에 작성해야함....
                    }
                }

                xhr2.setRequestHeader('Content-Type', 'application/json');
                xhr2.send(data);
            }
        }

        const DETECT_LANGUAGE_URL = '/detect';

        const data = {
            query: text
        }
    
        const stringifiedData = JSON.stringify(data);
        
        xhr.open('POST', DETECT_LANGUAGE_URL);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(stringifiedData);
    }, 2000);

});