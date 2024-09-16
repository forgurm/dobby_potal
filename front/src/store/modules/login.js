export default {
  namespaced: true,
  state: () => ({
    isLoggedIn: !!localStorage.getItem('userToken'),  // 로컬 스토리지에 토큰이 있는지 확인
    userToken: localStorage.getItem('userToken'),    // 로컬 스토리지에서 토큰을 가져옴
  }),
  mutations: {
    login(state, token) {
      state.isLoggedIn = true;
      state.userToken = token;
      localStorage.setItem('userToken', token);  // 토큰을 로컬 스토리지에 저장
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userToken = null;
      localStorage.removeItem('userToken');  // 토큰을 로컬 스토리지에서 삭제
    }
  },
  actions: {
    login({ commit }, token) {
      commit('login', token);
    },
    logout({ commit }) {
      commit('logout');
    },
    checkLoginStatus({ commit }) {
      const token = localStorage.getItem('userToken');
      if (token) {
        commit('login', token);
      } else {
        commit('logout');
      }
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.isLoggedIn;
    }
  }
}