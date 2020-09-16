import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    player: null,
    challenges: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setPlayer(state, player) {
      state.player = player
    },
    createChallenge(state, challenge) {
      state.challenges.push(challenge)
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user)
    },
    setPlayer({ commit }, player) {
      commit('setPlayer', player)
    },
    createChallenge({ commit }, challenge) {
      commit('createChallenge', challenge)
    }
  },
  getters: {
    userName(state) {
      if (state.user) {
        return state.user.name || 'Anonymous'
      } else {
        return 'Not logged in'
      }
    }
  },
  modules: {}
})
