<template>
  <v-app>
    <v-app-bar app>
      <div class="d-flex align-center">
        <v-img
          alt="Gods Unchained Logo"
          class="mr-2"
          src="https://godsunchained.com/assets/images/internal-logos/logo--gods-unchained-icon.webp"
          width="32"
        />
        <h3>Gunchained</h3>
      </div>

      <v-spacer></v-spacer>
      <div v-if="!user">
        <v-btn to="/login" text rounded small>Login</v-btn>
      </div>

      <div v-if="user" class="d-flex align-right">
        <v-chip pill @click="visitPlayer()">
          <v-avatar left v-if="user.photoURL">
            <img :src="user.photoURL" alt="Avatar image" />
          </v-avatar>
          {{ userName }}
        </v-chip>
        <div class="vcenter">
          <v-btn @click="logout" text rounded small>Logout</v-btn>
        </div>
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
import User from '@/models/user'

export default {
  name: 'App',
  computed: {
    ...mapState(['user']),
    ...mapGetters(['userName'])
  },
  created() {
    console.log('Loading App component')
    firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        const user = User.fromAuthHash(authUser)
        this.$store.dispatch('setUser', user)
      }
    })
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.dispatch('setUser', null)
          this.$router.push({ path: '/' })
        })
    },
    visitPlayer() {
      this.$router.push({ name: 'Player' })
    }
  }
}
</script>

<style>
.vcenter {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
