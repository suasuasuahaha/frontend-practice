import express, { json } from 'express';
import HTTP from 'superagent';
import { detectLanguage } from './api.js'

const CLIENT_ID = 'jpifey7z0n'
const CLIENT_SECRET = 'C5JZfmQXlEXst6IqdmRiO8oqFTFovs102SZJrLvp'

const app = express();

app.use(express.static('public'))
app.use(json())

app.get('/', (_, response) => {
    response.sendFile('index.html');
});

// 언어 감지 처리 API
app.post('/detect', async (req, res) => {
    const result = await detectLanguage(req.body);
    res.send(result);
});

// 번역 요청 처리 API
app.post('/translate', (request, response) => {

    const url = 'https://papago.apigw.ntruss.com/nmt/v1/translation';

    HTTP.post(url)
        .send(request.body)
        .set('Content-Type', 'application/json')
        .set('X-NCP-APIGW-API-KEY-ID', CLIENT_ID)
        .set('X-NCP-APIGW-API-KEY', CLIENT_SECRET)
        .end((error, result) => {
            if (result.statusCode === 200) {
                // 파파고 서버로부터 응답받은 결과 데이터
                const responseDataFromPapago = result.body;

                // 화면 출력에 필요한 값만 추출
                const { srcLangType: detectedLanguage, tarLangType: targetLanguage, translatedText } = responseDataFromPapago.message.result;

                const responseData = {
                    detectedLanguage,
                    targetLanguage,
                    translatedText
                }

                response.send(responseData);
            } else {
                console.error(error);
            }
        });
});

const port = 3000;
app.listen(port,
    () => console.log(`http://127.0.0.1:${port}/ 서버 프로세스가 3000번 포트에서 실행 중입니다.`)
);

export default app;  