import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { store } from '@/plugins/firebase'
import Player from '@/models/player'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    player: {},
    players: [],
    status: {
      visible: false,
      message: null,
      color: 'success'
    }
  },
  mutations: {
    ...vuexfireMutations,
    setUser(state, user) {
      state.user = user
    },
    setPlayer(state, player) {
      state.player = player
    },
    createChallenge(state, challenge) {
      state.challenges.push(challenge)
    },
    setStatus(state, { message, color }) {
      state.status.message = message
      state.status.color = color
      state.status.visible = true
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user)
    },
    updatePlayer({ dispatch, state }) {
      // create a copy that excludes id
      const player = { ...state.player }
      return store
        .collection('players')
        .doc(state.user.uid)
        .set(player)
        .then(() => {
          dispatch('setStatus', { message: 'Profile updated.' })
        })
        .catch(() => {
          dispatch('setStatus', {
            message: 'Failed to update profile!',
            color: 'error'
          })
        })
    },
    createChallenge({ commit }, challenge) {
      commit('createChallenge', challenge)
    },
    setStatus({ commit }, { message, color }) {
      console.log(color)
      if (color === undefined) color = 'success'
      console.log(color)
      commit('setStatus', { message, color })
    },
    bindPlayerRef: firestoreAction(({ bindFirestoreRef, state }) => {
      console.log('bindPlayerRef')
      console.log(state)
      console.log(state.user)
      return bindFirestoreRef(
        'player',
        store.collection('players').doc(state.user.uid)
      )
    }),
    bindPlayersRef: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('players', store.collection('players'))
    })
  },
  getters: {
    userName(state) {
      if (state.user) {
        return state.user.name || 'Anonymous'
      } else {
        return 'Not logged in'
      }
    },
    challenges(state) {
      const playersWithChallenges = state.players.filter(
        player => player.challenge && player.challenge.code
      )
      return playersWithChallenges.map(player => {
        let challenge = player.challenge
        challenge.player = new Player(player)
        return challenge
      })
    }
  },
  modules: {}
})
