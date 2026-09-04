// api.js
import HTTP from 'superagent';

const CLIENT_ID     = 'jpifey7z0n';
const CLIENT_SECRET = 'C5JZfmQXlEXst6IqdmRiO8oqFTFovs102SZJrLvp';

const DETECT_URL = 'https://papago.apigw.ntruss.com/langs/v1/dect';

/**
 * Papago 언어 감지
 * @param {Object} payload { query: 'Hello' }
 * @returns {Promise<Object>} 예: { langCode: 'en' }
 */
// async 키워드를 활용하여 자동으로 promise를 반환하게 하는 예시
export async function detectLanguage(payload) {
  console.log('detect called');
  
  const res = await HTTP
    .post(DETECT_URL)
    .send(payload)
    .set('Content-Type', 'application/json')
    .set('X-NCP-APIGW-API-KEY-ID', CLIENT_ID)
    .set('X-NCP-APIGW-API-KEY', CLIENT_SECRET);

  if (res.statusCode !== 200) {
    throw new Error(`Papago error: ${res.statusCode}`);
  }

  return res.body;
}