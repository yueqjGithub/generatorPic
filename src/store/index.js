import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fonts: [
      { value: 'sxzt0', name: '手写字体0' },
      { value: 'sxzt1', name: '手写字体1' },
      { value: 'sxzt2', name: '手写字体2' },
      { value: 'sxzt3', name: '手写字体3' },
      { value: 'sxzt4', name: '手写字体4' },
      { value: 'sxzt5', name: '手写字体5' },
      { value: 'sxzt6', name: '手写字体6' },
      { value: 'cusCaoshu', name: '草书1' },
      { value: 'cusXingshu', name: '行书1' }
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
