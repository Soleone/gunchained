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

        <v-toolbar-title @click="$router.push('/')" class="clickable">
          Gunchained Arena
        </v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn to="/login" text rounded small v-if="!user">Login</v-btn>

        <div v-if="user" class="d-flex align-center">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-chip pill @click="visitPlayer()" v-bind="attrs" v-on="on">
                <v-avatar left v-if="user.photoURL">
                  <img :src="user.photoURL" alt="Avatar image" />
                </v-avatar>
                {{ userName }}
              </v-chip>
            </template>
            <span>Edit profile</span>
          </v-tooltip>

          <div>
            <v-btn @click="logout" text rounded small>Logout</v-btn>
          </div>
        </div>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <v-snackbar v-model="status.visible" timeout="2000" :color="status.color">
        {{ status.message }}
      </v-snackbar>
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
    ...mapState(['user', 'status']),
    ...mapGetters(['userName'])
  },
  created() {
    console.log('Loading App component')
    firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        console.log('onAuthStateChanged authuser')
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
.clickable {
  cursor: pointer;
}
</style>
