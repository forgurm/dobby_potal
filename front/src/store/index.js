import { createStore } from 'vuex'

const files = import.meta.glob('@/store/**/*.js', { eager: true }) // 모든 모듈 파일을 불러옴
console.log('files:', files)

let modules = []

for (const key in files) {
  let customKey = key.replace(/^.*[\\/]/, '').replace(/(\.\/|\.js)/g, '')
  modules[customKey] = files[key].default
}

console.log('modules:', modules)

export default createStore({
  modules: {
    ...modules  // 모듈을 Vuex 스토어에 추가
  }
})