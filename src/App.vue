<template>
  <v-app>
    <v-app-bar app>
      <div class="d-flex align-center">
        <v-img
          alt="Gods Unchained Logo"
          class="shrink mr-2"
          contain
          src="https://godsunchained.com/assets/images/internal-logos/logo--gods-unchained-icon.webp"
          transition="scale-transition"
          width="40"
        />
        <h2>Gunchained</h2>
      </div>

      <v-spacer></v-spacer>
      <div v-if="!user">
        <v-btn to="/login" text rounded>Login</v-btn>
      </div>
      <div v-if="user" class="d-flex align-right">
        {{ userName }}
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import firebase from 'firebase/app'

export default {
  name: 'App',
  computed: {
    ...mapState(['user']),
    ...mapGetters(['userName'])
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('setUser', user)
      }
    })
  }
}
</script>
