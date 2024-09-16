<template>
  <main class="login">
    <div class="header_login"></div>
    <form @submit.prevent="handleLogin">
      <fieldset>
        <legend class="hidden">STOGeneration 로그인</legend>

        <label for="userId" class="edit">
          <input 
            type="text" 
            v-model="username" 
            placeholder="아이디를 입력해주세요." 
            id="userId" 
            class="valid" 
          />
          <p v-if="!username" class="feedback">* 아이디를 입력해 주세요.</p>
          <button v-if="username" type="button" class="del" @click="username = ''"></button>
        </label>

        <label for="userPw" class="edit">
          <input 
            type="password" 
            v-model="password" 
            placeholder="비밀번호를 입력해주세요." 
            id="userPw" 
            class="invalid" 
          />
          <p v-if="loginError" class="feedback">
            * 아이디 또는 비밀번호를 잘못 입력했습니다.<br />
            입력하신 내용을 다시 확인해주세요.
          </p>
          <button v-if="password" type="button" class="del" @click="password = ''"></button>
        </label>

        <button type="submit">로그인</button>
        <div class="IDsave">
          <input type="checkbox" name="IDsave" id="IDsave" /><label for="IDsave">아이디 저장</label>
        </div>
      </fieldset>
    </form>

    <section class="login">
      <a href="javascript:void(0);">비밀번호를 잊어버리셨나요?</a>
      <p>서비스 관리자에게 연락해 주세요.</p>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import adminApi from '@/assets/api/AdminApi.js'; // 로그인 API를 포함하는 파일
import { useStore } from 'vuex';

const username = ref('');
const password = ref('');
const loginError = ref(false);
const router = useRouter();
const store = useStore();

// 로그인 처리 함수
const handleLogin = async () => {
  try {
    const request = { emailId: username.value, emailPw: password.value };
    const response = await adminApi.login.userLogin(request);

    if (response.success) {
      // 로그인 성공 시
      store.commit('login/login');  // login 모듈의 login mutation 호출
      router.push({ name: 'home' }); // 홈 페이지로 이동
    } else {
      loginError.value = true;
    }
  } catch (error) {
    console.error('Login failed:', error);
    loginError.value = true;
  }
};
</script>

<style scoped>
/* 스타일 생략 */
</style>