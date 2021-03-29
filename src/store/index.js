import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { store } from '@/plugins/firebase'
import Player from '@/models/player'
import Challenge from '@/models/challenge'
import firebase from 'firebase/app'
import { FEEDBACK_STATUS_SUBMITTED } from '@/constants/constants.js'

Vue.use(Vuex)

const ADMIN_PLAYER_ID = 'qUiC8x84wZPeV2hhdveI4E4koYl1'

export default new Vuex.Store({
  state: {
    title: null,
    user: null,
    player: {},
    players: [],
    videos: [],
    videoCategory: null,
    videoAuthor: null,
    currentVideo: null,
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
    },
    setTitle(state, title) {
      state.title = title
    },
    setVideoCategory(state, category) {
      state.videoCategory = category
    },
    setVideoAuthor(state, author) {
      state.videoAuthor = author
    },
    setCurrentVideo(state, video) {
      state.currentVideo = video
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
    createVideo({ dispatch }, video) {
      video.addedAt = firebase.firestore.FieldValue.serverTimestamp()
      store
        .collection('videos')
        .add(video)
        .then(() => {
          dispatch('setStatus', {
            message: 'Video created.'
          })
        })
        .catch(response => {
          dispatch('setStatus', {
            message: 'Failed to create video!',
            color: 'error'
          })
          console.log(response)
        })
    },
    updateVideo({ dispatch }, { id, video }) {
      console.log("Updating video", id, video)
      store
        .collection('videos')
        .doc(id)
        .set(video)
        .then(() => {
          dispatch('setStatus', {
            message: 'Video updated.'
          })
        })
        .catch(response => {
          dispatch('setStatus', {
            message: 'Failed to update video!',
            color: 'error'
          })
          console.log(response)
        })
    },
    deleteVideo({ dispatch }, id) {
      console.log("Deleting video", id)
      store
        .collection('videos')
        .doc(id)
        .delete()
        .then(() => {
          dispatch('setStatus', {
            message: 'Video deleted.'
          })
        })
        .catch(response => {
          dispatch('setStatus', {
            message: 'Failed to delete video!',
            color: 'error'
          })
          console.log(response)
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
    loadCurrentVideo({ dispatch }, id) {
      console.log("Fetching video information from db")
      store.collection('videos').doc(id).get().then((doc) => {
        const video = doc.data()
        console.log("Received video information from db, setting data")
        const currentVideo = {
          url: video.url,
          author: video.author,
          title: video.title,
          category: video.category,
          description: video.description,
          addedAt: video.addedAt,
          imageUrl: video.imageUrl
        }
        dispatch('setCurrentVideo', currentVideo)
      })
    },
    submitFeedback({ dispatch }, feedback) {
      feedback.addedAt = firebase.firestore.FieldValue.serverTimestamp()
      feedback.status = FEEDBACK_STATUS_SUBMITTED
      store
        .collection('feedbacks')
        .add(feedback)
        .then(() => {
          dispatch('setStatus', {
            message: 'Feedback submitted. Thank you!'
          })
        })
        .catch(response => {
          dispatch('setStatus', {
            message: 'Failed to submit feedback!',
            color: 'error'
          })
          console.log(response)
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
    setTitle({ commit }, title) {
      commit('setTitle', title)
    },
    setVideoCategory({ commit }, category) {
      commit('setVideoCategory', category)
    },
    setVideoAuthor({ commit }, author) {
      commit('setVideoAuthor', author)
    },
    setCurrentVideo({ commit }, video) {
      commit('setCurrentVideo', video)
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
    }),
    bindVideosRef: firestoreAction(({ bindFirestoreRef, state }) => {
      let query = store.collection('videos').orderBy('addedAt', 'desc')
      if (state.videoCategory) {
        query = query.where('category', '==', state.videoCategory)
      }
      if (state.videoAuthor) {
        query = query.where('author', '==', state.videoAuthor)
      }
      return bindFirestoreRef(
        'videos',
        query,
        { reset: false }
      )
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
    },
    isUserAdmin(state) {
      return state.user && state.user.uid === ADMIN_PLAYER_ID
    }
  },
  modules: {}
})
