import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors());

const posts = [ // posts = 서버가 갖고 있는 더미 데이터
  {
    userId: 1,
    id: 1,
    title: "드립 커피를 맛있게 내리는 방법",
    body: "원두 분쇄도, 물 온도, 추출 시간만 잘 맞추면 집에서도 카페 퀄리티의 커피를 만들 수 있습니다."
  },
  {
    userId: 1,
    id: 2,
    title: "웹 개발자로 성장하는 데 도움이 된 책 5권",
    body: "클린 코드, 도메인 주도 설계 등 실무에 꼭 필요한 책들을 정리해봤습니다."
  },
  {
    userId: 2,
    id: 3,
    title: "작은 베란다 텃밭 가꾸기",
    body: "흙과 햇빛만 있으면 바질, 고수, 로즈마리도 집에서 키울 수 있어요. 초보자를 위한 가이드입니다."
  },
  {
    userId: 2,
    id: 4,
    title: "2025년 기대되는 한국 영화 추천",
    body: "액션, 스릴러, 독립영화까지 장르별로 추천작을 정리했습니다."
  },
  {
    userId: 3,
    id: 5,
    title: "기존 Express 프로젝트를 Fastify로 이전하기",
    body: "속도 향상과 유지보수를 고려해 마이그레이션을 진행했습니다. 단계별 팁을 공유합니다."
  }
];

const users = [
  { id: 1, name: "김하늘", email: "haneul.kim@example.com" },
  { id: 2, name: "이보라", email: "bora.lee@example.com" },
  { id: 3, name: "정민수", email: "minsu.jung@example.com" }
];


// GET /posts → 전체 게시글 조회
// localhost:4000/posts로 요청 시 동작하는 코드
app.get('/posts', (req, res) => {
  res.json(posts); // posts 더미데이터를 응답해줌
});

// GET /posts/:id → 특정 게시글 조회
app.get('/posts/:id', (req, res) => {  // 특정 게시물만 조회하겠다.
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

// GET /users → 전체 사용자 조회
app.get('/users', (req, res) => {
  res.json(users);
});

// GET /users/:id → 특정 사용자 조회
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
