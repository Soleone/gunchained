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

      <v-toolbar-items class="d-flex align-center">
        <div v-if="!user">
          <Tooltip tooltip="Log in">
            <v-btn to="/login" text fab small class="text--secondary">
              <v-icon>mdi-login</v-icon>
            </v-btn>
          </Tooltip>
        </div>

        <div v-if="user">
          <Tooltip :visible="!!user" tooltip="Edit profile">
            <v-chip pill @click="visitPlayer()">
              <v-avatar left v-if="user.photoURL">
                <img :src="user.photoURL" alt="Avatar image" />
              </v-avatar>
              {{ userName }}
            </v-chip>
          </Tooltip>

          <Tooltip tooltip="Log out">
            <v-btn @click="logout" text fab small class="text--secondary">
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </Tooltip>
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
import Tooltip from '@/components/vuetify-ext/Tooltip.vue'

export default {
  name: 'App',
  components: {
    Tooltip
  },
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
