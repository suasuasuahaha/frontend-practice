console.log('app.js 실행됨');

// 1. 학습하신 대로 getElementById를 이용해 HTML 요소들을 JS 코드로 가져옵니다.
const button = document.getElementById('btn');
const mapContainer = document.getElementById('mapContainer');
const placeTitle = document.getElementById('placeTitle');
const placeCategory = document.getElementById('placeCategory');
const reviewList = document.getElementById('reviewList');
const reviewInput = document.getElementById('reviewInput');
const submitBtn = document.getElementById('submitBtn');
const starRating = document.getElementById('starRating');

console.dir(button);

// 2. 상암동 DMC 인근 맛집 대폭 보강 데이터셋 (지도 위치 좌표 & 후기 포함)
const sangamPlaces = [
  // --- 한식 / 고깃집 ---
  {
    id: 1,
    name: "배꼽집 상암점",
    category: "한식 • 평양냉면 & 안창살",
    location: { top: '25%', left: '30%' },
    icon: "🥩",
    reviews: [
      { user: "상암DMC직장인", stars: 5, text: "점심 갈비탕 고기도 푸짐하고 냉면 육수가 진국입니다." },
      { user: "방송국PD", stars: 4, text: "회식장소로 제격이에요. 고기 질이 정말 좋습니다." }
    ]
  },
  {
    id: 2,
    name: "아름다운시절 상암",
    category: "한식 • 냉삼 & 김치찌개",
    location: { top: '35%', left: '20%' },
    icon: "🥓",
    reviews: [
      { user: "DMC마케터", stars: 5, text: "냉삼 퀄리티 좋고 파절임이랑 볶음밥 조합이 예술입니다." },
      { user: "칼퇴기원", stars: 4, text: "레트로 감성에 퇴근 후 삼겹살에 소주 한잔하기 최고." }
    ]
  },
  {
    id: 3,
    name: "상암 한우대가",
    category: "한식 • 한우 구이 & 육회비빔밥",
    location: { top: '20%', left: '45%' },
    icon: "🐮",
    reviews: [
      { user: "법카찬스", stars: 5, text: "점심 특선 육회비빔밥 가성비 좋고 회식용 한우는 입에서 녹아요." }
    ]
  },

  // --- 일식 / 돈카츠 / 라멘 ---
  {
    id: 4,
    name: "옥자회관",
    category: "일식 • 수제 프리미엄 돈카츠",
    location: { top: '60%', left: '25%' },
    icon: "🍱",
    reviews: [
      { user: "돈까스매니아", stars: 5, text: "상암동에서 제일 맛있는 돈카츠 집. 등심카츠 육즙 대박입니다." },
      { user: "미디어시티", stars: 4, text: "웨이팅이 좀 길지만 기다려서 먹을 가치가 있어요." }
    ]
  },
  {
    id: 5,
    name: "멘지 상암점",
    category: "일식 • 라멘 & 토리파이탄",
    location: { top: '50%', left: '35%' },
    icon: "🍜",
    reviews: [
      { user: "라멘러버", stars: 5, text: "진하고 고소한 닭육수 국물이 대단함. 차슈도 부드러워요." },
      { user: "점심머먹지", stars: 5, text: "혼밥하기 너무 편하고 해장으로 국물 최고입니다." }
    ]
  },
  {
    id: 6,
    name: "스시노칸도 상암점",
    category: "일식 • 회전초밥",
    location: { top: '65%', left: '45%' },
    icon: "🍣",
    reviews: [
      { user: "초밥왕", stars: 4, text: "균일가 회전초밥이라 부담 없이 이것저침 집어먹기 좋아요." }
    ]
  },

  // --- 중식 / 분식 / 아시안 ---
  {
    id: 7,
    name: "서룡",
    category: "중식 • 된장짬뽕 & 찹쌀탕수육",
    location: { top: '40%', left: '60%' },
    icon: "🥢",
    reviews: [
      { user: "무한도전팬", stars: 5, text: "방송에도 많이 나온 맛집! 이집 특제 된장짬뽕은 진짜 별미입니다." },
      { user: "상암동주민", stars: 4, text: "코스 요리가 깔끔해서 가족 모임 하기 좋아요." }
    ]
  },
  {
    id: 8,
    name: "푸차이",
    category: "중식 • 마라탕 & 꿔바로우",
    location: { top: '30%', left: '70%' },
    icon: "🥘",
    reviews: [
      { user: "마라중독자", stars: 5, text: "재료 신선하고 알싸한 마라 맛이 딱 적당해서 스트레스 풀림." }
    ]
  },

  // --- 양식 / 술집 / 기타 ---
  {
    id: 9,
    name: "트라토리아 몰토",
    category: "양식 • 생면 파스타 & 스테이크",
    location: { top: '75%', left: '70%' },
    icon: "🍝",
    reviews: [
      { user: "파스타러버", stars: 5, text: "알리오 올리오 향이 대단해요. 데이트 코스로 강추!" },
      { user: "상암DMC", stars: 4, text: "식전 빵부터 디저트까지 완벽했습니다." }
    ]
  },
  {
    id: 10,
    name: "글로리식당 상암",
    category: "한식주점 • 제철 사시미 & 육회",
    location: { top: '80%', left: '30%' },
    icon: "🍶",
    reviews: [
      { user: "퇴근길혼술", stars: 5, text: "안주 하나하나 다 정갈하고 분위기가 좋아서 자주 방문합니다." },
      { user: "술안주탐험가", stars: 5, text: "육사시미 퀄리티가 웬만한 전라도 전문점 못지않음." }
    ]
  },
  {
    id: 11,
    name: "바바리안 리퍼블릭",
    category: "양식/수제맥주 • 학센 & 수제버거",
    location: { top: '80%', left: '55%' },
    icon: "🍺",
    reviews: [
      { user: "맥주덕후", stars: 5, text: "독일식 족발 학센에 수제맥주 한 잔하면 여름 피로가 싹 날아감." }
    ]
  }
];

let selectedPlace = null;
let currentRating = 5;

// 3. 학습하신 '랜덤값을 추출하는 유틸 함수'
function getRandomNumber(min, max) {
  const randomRGBArray = [];

  for (let i = 0; i < 3; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomRGBArray.push(randomNumber);
  }

  return randomRGBArray;
}

// 4. 지도에 상암동 맛집 핀(Marker) 배치하기
function renderMapPins() {
  sangamPlaces.forEach(place => {
    const pin = document.createElement('div');
    pin.className = 'map-pin';
    pin.id = `pin-${place.id}`;
    pin.style.top = place.location.top;
    pin.style.left = place.location.left;
    pin.innerHTML = place.icon;
    
    // 핀을 클릭했을 때 이벤트 부여
    pin.addEventListener('click', () => {
      selectPlace(place);
    });

    mapContainer.appendChild(pin);
  });
}

// 5. 특정 장소 선택 시 상세 정보 및 기존 후기 표시 로직
function selectPlace(place) {
  selectedPlace = place;

  // 핀 강조 효과
  document.querySelectorAll('.map-pin').forEach(p => p.classList.remove('active'));
  const activePin = document.getElementById(`pin-${place.id}`);
  if (activePin) activePin.classList.add('active');

  // 맛집 정보 업데이트
  placeTitle.textContent = `${place.icon} ${place.name}`;
  placeCategory.textContent = place.category;

  // 다른 사용자들의 후기 모아서 보여주기
  renderReviews();
}

// 6. 후기 목록 렌더링 함수
function renderReviews() {
  if (!selectedPlace) return;

  reviewList.innerHTML = '';

  if (selectedPlace.reviews.length === 0) {
    reviewList.innerHTML = '<div style="color: #999; font-size: 13px; text-align: center; margin-top: 20px;">첫 번째 후기를 작성해 보세요!</div>';
    return;
  }

  selectedPlace.reviews.forEach(rev => {
    const revCard = document.createElement('div');
    revCard.className = 'review-card';
    
    // 후기 테마에 getRandomNumber 활용
    const [r, g, b] = getRandomNumber(200, 245);
    revCard.style.borderLeftColor = `rgb(${r}, ${g}, ${b})`;

    revCard.innerHTML = `
      <div class="review-user">
        <span>👤 ${rev.user}</span>
        <span class="review-stars">${'★'.repeat(rev.stars)}</span>
      </div>
      <div class="review-content">${rev.text}</div>
    `;

    reviewList.appendChild(revCard);
  });
}

// 7. 버튼에 'click' 이벤트를 부여하는 핵심 코드 logic (addEventListener)
function clickHandler() {
  // 랜덤 유틸 함수로 RGB 색상을 추출해서 버튼 테마색 변경
  const [red, green, blue] = getRandomNumber(0, 255);
  const randomColor = `rgb(${red}, ${green}, ${blue})`;
  button.style.backgroundColor = randomColor;

  // 맛집 무작위 1곳 선택
  const randomIndex = Math.floor(Math.random() * sangamPlaces.length);
  const randomPlace = sangamPlaces[randomIndex];
  
  selectPlace(randomPlace);
}

// 가져온 버튼에 addEventListener 적용
button.addEventListener('click', clickHandler);

// 8. 별점 클릭 처리
starRating.addEventListener('click', (e) => {
  if (e.target.classList.contains('star')) {
    currentRating = parseInt(e.target.dataset.value);
    const stars = starRating.querySelectorAll('.star');
    stars.forEach((star, idx) => {
      if (idx < currentRating) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  }
});

// 9. 내 후기 등록하기 버튼 클릭 이벤트
submitBtn.addEventListener('click', () => {
  if (!selectedPlace) {
    alert('먼저 지도의 핀을 누르거나 맛집을 선택해 주세요!');
    return;
  }

  const text = reviewInput.value.trim();
  if (!text) {
    alert('후기 내용을 입력해 주세요.');
    return;
  }

  // 최신 후기 데이터 추가
  selectedPlace.reviews.unshift({
    user: "나(방문자)",
    stars: currentRating,
    text: text
  });

  renderReviews();
  reviewInput.value = '';
  alert('후기가 등록되었습니다!');
});

// 초기 지도 실행
renderMapPins();