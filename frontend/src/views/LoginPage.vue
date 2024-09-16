<template>
  <main class="login">
    <div class="header_login"></div>
    <form @submit.prevent="handleSubmit">
      <fieldset>
        <legend class="hidden">STOGeneration 로그인</legend>

        <label for="userId" class="edit" :class="{ invalid: isIdInvalid }">
          <input 
            v-model="userId"
            type="text" 
            placeholder="아이디를 입력해주세요." 
            id="userId" 
            @input="clearError('id')" 
          />
          <p class="feedback" v-if="isIdInvalid">* 아이디를 입력해 주세요.</p>
          <button type="button" class="del" v-if="userId" @click="userId = ''"></button>
        </label>

        <label for="userPw" class="edit" :class="{ invalid: isPwInvalid }">
          <input 
            v-model="password"
            type="password" 
            placeholder="비밀번호를 입력해주세요." 
            id="userPw" 
            @input="clearError('pw')"
          />
          <p class="feedback" v-if="isPwInvalid">
            * 아이디 또는 비밀번호를 잘못 입력했습니다.<br />
            입력하신 내용을 다시 확인해주세요.
          </p>
          <button type="button" class="del" v-if="password" @click="password = ''"></button>
        </label>

        <button type="submit">로그인</button>
        <div class="IDsave">
          <input type="checkbox" name="IDsave" id="IDsave" v-model="saveId" />
          <label for="IDsave">아이디 저장</label>
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
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const userId = ref('');
const password = ref('');
const saveId = ref(false);

const isIdInvalid = ref(false);
const isPwInvalid = ref(false);

const clearError = (field) => {
  if (field === 'id') isIdInvalid.value = false;
  if (field === 'pw') isPwInvalid.value = false;
};

const handleSubmit = async () => {
  if (!userId.value) {
    isIdInvalid.value = true;
    return;
  }
  
  if (!password.value) {
    isPwInvalid.value = true;
    return;
  }

  const success = await store.dispatch('login/login', { userId: userId.value, password: password.value });

  if (success) {
    router.push({ name: 'main' });  // 로그인 성공 시 메인 메뉴로 이동
  } else {
    isPwInvalid.value = true;  // 로그인 실패 시 에러 메시지 표시
  }
};
</script>

<style scoped>
/* 스타일 추가 */
</style>