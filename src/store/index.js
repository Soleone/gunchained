import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { store } from '@/plugins/firebase'
import Player from '@/models/player'
import Challenge from '@/models/challenge'
import firebase from 'firebase/app'

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
    },
    reloadKey: 0,
    app: {}
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
    },
    reload(state) {
      console.log('Reloading...')
      state.reloadKey += 1
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user)
    },
    updatePlayer({ dispatch, state }, player) {
      // create a copy that excludes id
      const newPlayer = {
        ...player,
        lastActiveAt: firebase.firestore.FieldValue.serverTimestamp()
      }
      newPlayer.challenge = player.challenge.toFire()
      return store
        .collection('players')
        .doc(state.user.uid)
        .set(newPlayer)
        .then(() => {
          dispatch('setStatus', {
            message: 'Profile updated.'
          })
        })
        .catch(() => {
          dispatch('setStatus', {
            message: 'Failed to update profile!',
            color: 'error'
          })
        })
    },
    updateAvailability({ dispatch, state }, player) {
      const newPlayer = {
        lastActiveAt: firebase.firestore.FieldValue.serverTimestamp(),
        challenge: player.challenge.toFire()
      }
      return store
        .collection('players')
        .doc(state.user.uid)
        .update(newPlayer)
        .catch(() => {
          dispatch('setStatus', {
            message: 'Failed to update availability!',
            color: 'error'
          })
        })
    },
    createChallenge({ commit }, challenge) {
      commit('createChallenge', challenge)
    },
    setStatus({ commit }, { message, color }) {
      if (color === undefined) color = 'success'
      commit('setStatus', { message, color })
    },
    reload({ commit }) {
      commit('reload')
    },
    bindPlayerRef: firestoreAction(({ bindFirestoreRef, state }) => {
      console.log('[Vuex] Binding player ref from Firestore')
      return bindFirestoreRef(
        'player',
        store.collection('players').doc(state.user.uid),
        { reset: false }
      )
    }),
    bindPlayersRef: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef(
        'players',
        store.collection('players').orderBy('challenge.availableSince', 'desc'),
        {
          reset: false
        }
      )
    }),
    bindAppRef: firestoreAction(({ bindFirestoreRef }) => {
      console.log('[Vuex] Binding app instance from Firestore')
      return bindFirestoreRef('app', store.collection('app').doc('instance'), {
        reset: false
      })
    })
  },
  getters: {
    playerObject(state) {
      return new Player(state.player)
    },
    availableChallenges(state) {
      return state.players
        .filter(player => player.challenge.availableSince)
        .map(player => {
          let challenge = Challenge.fromFire(player.challenge)
          challenge.player = new Player(player)
          return challenge
        })
    },
    isAvailableEnabled(state) {
      return !!state.player.challenge?.code
    },
    appStatus(state) {
      return state.app.status || {}
    }
  },
  modules: {}
})
