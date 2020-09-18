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
          Gunchained <span class="d-none d-sm-inline">Arena</span>
        </v-toolbar-title>

        <div
          class="d-none d-sm-inline ml-1 text-caption clickable"
          @click="visitChangelog()"
          style="margin-top: 4px"
        >
          v{{ version }}
        </div>
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
  data() {
    return {
      version: '0.1.0'
    }
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
    },
    visitChangelog() {
      this.$store.dispatch('setStatus', {
        message:
          'This will soon lead to a changelog to show the differences between versions.',
        color: 'default'
      })
    }
  }
}
</script>

<style>
.clickable {
  cursor: pointer;
}
</style>
