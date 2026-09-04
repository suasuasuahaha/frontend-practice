const CURRENCIES_URL = 'https://api.frankfurter.dev/v1/currencies';
const LATEST_URL = 'https://api.frankfurter.dev/v1/latest';
const TIMESERIES_BASE = 'https://api.frankfurter.dev/v1';

// 주요 통화 정의
const MAJOR_CURRENCIES = ['USD', 'JPY', 'EUR'];

// [4대 시중은행 데이터]
const BANK_DATA = {
    WOORI: {
        name: '우리은행 (WON뱅킹)',
        majorSpread: 0.0175,
        minorSpread: 0.0200,
        majorDiscount: 80,
        minorDiscount: 50
    },
    KB: {
        name: 'KB국민은행 (KB스타뱅킹)',
        majorSpread: 0.0175,
        minorSpread: 0.0200,
        majorDiscount: 90,
        minorDiscount: 50
    },
    SHINHAN: {
        name: '신한은행 (신한 SOL)',
        majorSpread: 0.0175,
        minorSpread: 0.0250,
        majorDiscount: 90,
        minorDiscount: 50
    },
    HANA: {
        name: '하나은행 (하나원큐)',
        majorSpread: 0.0175,
        minorSpread: 0.0220,
        majorDiscount: 90,
        minorDiscount: 40
    }
};

const form = document.getElementById('convert-form');
const amountInput = document.getElementById('amount');
const fromSelect = document.getElementById('from-currency');
const toSelect = document.getElementById('to-currency');
const bankSelect = document.getElementById('bank-select');
const discountSelect = document.getElementById('discount-rate');
const bankFeeBadge = document.getElementById('bank-fee-badge');

const swapBtn = document.getElementById('swap-btn');
const convertBtn = document.getElementById('convert-btn');
const resultBox = document.getElementById('result');
const resultText = document.getElementById('result-text');
const unitRateText = document.getElementById('unit-rate');
const feeInfoText = document.getElementById('fee-info');
const resultDate = document.getElementById('result-date');
const errorBox = document.getElementById('error');
const chipButtons = document.querySelectorAll('.chip');

const trendBox = document.getElementById('trend');
const trendChange = document.getElementById('trend-change');
const trendChart = document.getElementById('trend-chart');
const trendMin = document.getElementById('trend-min');
const trendMax = document.getElementById('trend-max');

function showError(message) {
    errorBox.textContent = message;
    errorBox.hidden = false;
    resultBox.hidden = true;
}

function clearError() {
    errorBox.hidden = true;
}

function checkIsMajorCurrency() {
    return MAJOR_CURRENCIES.includes(fromSelect.value) || MAJOR_CURRENCIES.includes(toSelect.value);
}

function updateBankPolicy() {
    const selectedBankKey = bankSelect.value;
    const bank = BANK_DATA[selectedBankKey];

    const isMajor = checkIsMajorCurrency();
    
    const currentSpread = isMajor ? bank.majorSpread : bank.minorSpread;
    const defaultDiscount = isMajor ? bank.majorDiscount : bank.minorDiscount;

    discountSelect.innerHTML = '';
    const options = [90, 80, 50, 30, 0];
    
    options.forEach((rate) => {
        const isSelected = rate === defaultDiscount;
        const optText = `${rate}% ${isSelected ? '(앱 추천)' : ''}`;
        discountSelect.add(new Option(optText, rate, isSelected, isSelected));
    });

    const currencyTypeLabel = isMajor ? '주요통화(USD/JPY/EUR)' : '기타통화';
    bankFeeBadge.textContent = `${bank.name} [${currencyTypeLabel}] 기본 수수료율: ${(currentSpread * 100).toFixed(2)}%`;
}

// [핵심] KRW가 셀렉트 박스 최상단에 오도록 통화 목록 정렬
async function loadCurrencies() {
    const response = await fetch(CURRENCIES_URL);
    if (!response.ok) throw new Error('통화 목록을 불러오지 못했습니다.');

    const currencies = await response.json();

    // KRW를 최상단으로 올리고 나머지 통화를 알파벳순 정렬
    const currencyEntries = Object.entries(currencies).sort(([aCode], [bCode]) => {
        if (aCode === 'KRW') return -1;
        if (bCode === 'KRW') return 1;
        return aCode.localeCompare(bCode);
    });

    // 드롭다운 옵션 채우기
    currencyEntries.forEach(([code, name]) => {
        const option1 = new Option(`${code} - ${name}`, code);
        const option2 = new Option(`${code} - ${name}`, code);
        fromSelect.add(option1);
        toSelect.add(option2);
    });

    // 기본 선택값 설정 (USD -> KRW)
    fromSelect.value = 'USD';
    toSelect.value = 'KRW';
    
    updateBankPolicy();
}

async function convert(amount, from, to) {
    const url = `${LATEST_URL}?amount=${amount}&from=${from}&to=${to}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('환율 정보를 불러오지 못했습니다.');

    return response.json();
}

function toDateString(date) {
    return date.toISOString().slice(0, 10);
}

async function fetchTrend(from, to) {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);

    const url = `${TIMESERIES_BASE}/${toDateString(start)}..${toDateString(end)}?from=${from}&to=${to}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('추이 데이터를 불러오지 못했습니다.');

    const data = await response.json();

    return Object.entries(data.rates)
        .map(([date, rateObj]) => ({ date, value: rateObj[to] }))
        .sort((a, b) => a.date.localeCompare(b.date));
}

function renderTrend(points) {
    if (points.length < 2) {
        trendBox.hidden = true;
        return;
    }

    const values = points.map((p) => p.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    const width = 300;
    const height = 80;
    const padding = 6;

    const coords = points.map((p, i) => {
        const x = (i / (points.length - 1)) * width;
        const y = height - padding - ((p.value - min) / range) * (height - padding * 2);
        return [x, y];
    });

    const linePoints = coords.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
    const areaPoints = `0,${height} ${linePoints} ${width},${height}`;

    const first = values[0];
    const last = values[values.length - 1];
    const changePct = ((last - first) / first) * 100;
    const isUp = changePct >= 0;

    trendChart.setAttribute('viewBox', `0 0 ${width} ${height}`);
    trendChart.innerHTML = `
        <polygon points="${areaPoints}" fill="${isUp ? '#fee2e2' : '#dbeafe'}" />
        <polyline points="${linePoints}" fill="none" stroke="${isUp ? '#dc2626' : '#2563eb'}" stroke-width="2" />
    `;

    trendChange.textContent = `${isUp ? '▲' : '▼'} ${Math.abs(changePct).toFixed(2)}%`;
    trendChange.className = isUp ? 'up' : 'down';

    trendMin.textContent = `최저 ${min.toLocaleString(undefined, { maximumFractionDigits: 4 })}`;
    trendMax.textContent = `최고 ${max.toLocaleString(undefined, { maximumFractionDigits: 4 })}`;

    trendBox.hidden = false;
}

bankSelect.addEventListener('change', updateBankPolicy);
fromSelect.addEventListener('change', updateBankPolicy);
toSelect.addEventListener('change', updateBankPolicy);

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearError();

    const amount = Number(amountInput.value);
    const from = fromSelect.value;
    const to = toSelect.value;
    
    const bank = BANK_DATA[bankSelect.value];
    const isMajor = checkIsMajorCurrency();
    
    const baseSpread = isMajor ? bank.majorSpread : bank.minorSpread;
    const discountRate = Number(discountSelect.value) / 100;

    if (!amount || amount <= 0) {
        showError('0보다 큰 금액을 입력하세요.');
        return;
    }

    if (from === to) {
        showError('서로 다른 통화를 선택하세요.');
        return;
    }

    convertBtn.disabled = true;
    convertBtn.textContent = '변환 중...';

    try {
        const data = await convert(amount, from, to);
        const baseRate = data.rates[to] / amount;

        const finalSpread = baseSpread * (1 - discountRate); 
        const effectiveRate = baseRate * (1 - finalSpread); 
        const finalConverted = amount * effectiveRate;

        resultText.textContent = `${amount.toLocaleString()} ${from} = ${finalConverted.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${to}`;
        unitRateText.textContent = `적용 환율: 1 ${from} = ${effectiveRate.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${to}`;
        
        feeInfoText.textContent = `🏛️ ${bank.name} [수수료율 ${(baseSpread * 100).toFixed(2)}% · ${discountSelect.value}% 우대 적용]`;

        resultDate.textContent = `기준일: ${data.date} (ECB 고시 기준환율)`;
        resultBox.hidden = false;

        const trendPoints = await fetchTrend(from, to);
        renderTrend(trendPoints);
    } catch (error) {
        console.error(error);
        showError(error.message);
    } finally {
        convertBtn.disabled = false;
        convertBtn.textContent = '변환하기';
    }
});

swapBtn.addEventListener('click', () => {
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
    updateBankPolicy();
});

// [수정] 1, 10, 100, 1,000 버튼 클릭 시 기존 금액에 누적 증가
chipButtons.forEach((chip) => {
    chip.addEventListener('click', () => {
        const currentAmount = Number(amountInput.value) || 0;
        const addAmount = Number(chip.dataset.amount);
        
        // 기존 금액 + 누른 금액
        amountInput.value = currentAmount + addAmount;
        
        // 바로 환율 변환 실행
        form.requestSubmit();
    });
});

loadCurrencies().catch((error) => {
    console.error(error);
    showError('통화 목록을 불러오는 데 실패했습니다.');
});

