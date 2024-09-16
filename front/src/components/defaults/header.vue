<template>
  <div class="gnb">
    <section class="header">
      <h1 @click="routerPush('dashBoard')"></h1>
      <!--//system name-->
      <nav>
        <a href="javascript:void(0);" @click="routerPush('mypage')">마이페이지</a>
        <a href="javascript:void(0);" @click="handleLogout">로그아웃</a>
      </nav>
    </section>
  </div>
  <!--//E:gnb-->
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const routerPush = (name) => {
  router.push({ name })
}

const handleLogout = () => {
  store.dispatch('login/logout')  // Vuex의 로그아웃 액션 호출
  router.push({ name: 'login' })   // 로그아웃 후 로그인 페이지로 이동
}
</script>

<style scoped>
/* 스타일 설정 */
</style>