const Vuex = require('vuex')
const Vue = require('vue')

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    doneTodos: (state, getters) => {
      return state.count
    },
  },
  mutations: {
    increment(state, playload) {
      console.log(playload)
      state.count++
    },
  },
  actions: {
    addCount({commit, state}, param) {
      commit('increment', param)
      return 'promise Result'
    },
  },
})

store.dispatch('addCount', {yxf: 'yxfff'}).then((result) => {
  console.log('this is over', result)
})