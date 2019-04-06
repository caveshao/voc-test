import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ifCount: false,
    cutOff: false
  },
  mutations: {
    startCount(state) {
      state.ifCount = true;
    },
    endCount(state) {
      state.ifCount = false;
    },
    cutOff(state, pload) {
      state.cutOff = pload;
    }
  },
  actions: {

  }
})