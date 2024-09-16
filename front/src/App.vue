<template>
  <div class="wrap" :class="!lnbStatus ? 'lnbClose' : ''">
    <!-- 로그인 상태에 따라 헤더와 좌측 메뉴를 조건부 렌더링 -->
    <headerComponent v-if="isLoggedIn"></headerComponent>
    <lnbComponent v-if="isLoggedIn" :lnbStatus="lnbStatus"></lnbComponent>

    <!-- contents 영역 -->
    <main role="main" title="route." :class="!lnbStatus ? 'lnbClose' : ''">
      <RouterView />
    </main>
  </div>

  <!-- popup -->
  <alertPopup v-if="alertPopupComputed" />
  <confirmPopup v-if="confirmPopupComputed" />

  <!-- loadingBar -->
  <loadingBar v-if="loadingBarComputed" />
</template>

<script setup>
import headerComponent from '@/components/defaults/header.vue'
import lnbComponent from '@/components/defaults/lnb.vue'
import store from '@/store'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

/* popup */
import alertPopup from '@/components/popup/alertPopup.vue'
import confirmPopup from '@/components/popup/confirmPopup.vue'

/* loadingBar */
import loadingBar from '@/components/loading/loadingBar.vue'

// 로그인 상태 확인
const isLoggedIn = computed(() => store.state.login.isLoggedIn)
const lnbStatus = computed(() => isLoggedIn.value && store.state.service.lnb.status)
const route = useRoute()

const alertPopupComputed = computed(() => store.state.popup.alertPopup.status)
const confirmPopupComputed = computed(() => store.state.popup.confirmPopup.status)
const loadingBarComputed = computed(() => store.state.service.loadingBar.status)
</script>

<style scoped></style>