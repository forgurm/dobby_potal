import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

// 컴포넌트 임포트
import root from '../publish/root.vue';
import LoginPage from '@/views/login/loginPage.vue'; // 로그인 페이지 임포트
import HomePage from '@/views/main/dashBoard.vue'; // 홈 페이지 컴포넌트


// 라우트 파일 불러오기
let publish = [];
let front = [];

const publishFiles = import.meta.glob('@/router/publish/**/*.js', { eager: true });
const frontFiles = import.meta.glob('@/router/front/**/*.js', { eager: true });

const importFunction = (files, array) => {
  for (const key in files) {
    let customKey = key.replace(/^.*[\\/]/, '').replace(/(\.\/|\.js)/g, '');
    array[customKey] = files[key].default;
  }
};

// 라우트 모듈 임포트
importFunction(publishFiles, publish);
importFunction(frontFiles, front);

// 라우트 설정
const routes = [
  {
    path: '/',
    redirect: '/login',  // 기본 경로를 로그인 페이지로 리다이렉트
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage, // 로그인 페이지 라우트 추가
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage,  // 홈 페이지 컴포넌트를 여기에 설정
  },
  {
    path: '/root',
    name: 'root',
    component: root,
    meta: { requiresAuth: true } // 인증이 필요한 경로
  },
  ...front.main,
  ...front.members,
  ...front.botList,
  ...front.account,
  ...front.schedule,
  ...front.education,
  ...front.faQ,
  ...front.qnA,
  ...front.notice,
  ...front.symbolList,
  ...front.promotion,
  ...front.currentSituation,
  ...front.mypage,
  ...front.siteManagement,
  ...front.statics,
  {
    path: '/:pathMatch(.*)*',  // 잘못된 경로에 대한 핸들링
    redirect: '/login',        // 잘못된 경로 접근 시 로그인 페이지로 리다이렉트
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// 전역 가드 설정
router.beforeEach((to, from, next) => {
  const isLoggedIn = store.state.login.isLoggedIn; // 로그인 상태 확인

  if (to.meta.requiresAuth && !isLoggedIn) {
    // 로그인되지 않은 상태에서 보호된 경로에 접근하려는 경우
    next({ name: 'login' }); // 로그인 페이지로 리다이렉트
  } else {
    next(); // 계속 진행
  }
});

export default router;