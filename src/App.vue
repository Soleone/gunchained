<template>
  <v-app>
    <v-app-bar color="#263238" dark app>
      <div class="d-flex align-center">
        <v-img
          @click="$router.push('/')"
          alt="Gods Unchained Logo"
          class="mr-2 clickable"
          src="@/assets/images/gods-unchained-logo-256.png"
          width="32"
        />

        <v-toolbar-title @click="$router.push('/')" class="clickable">
          <span class="d-none d-sm-inline">Gunchained Arena</span>
          <span class="d-inline d-sm-none">Gun</span>
        </v-toolbar-title>
      </div>
      <v-spacer></v-spacer>

      <v-toolbar-items class="d-flex align-center">
        <div v-if="!user">
          <Tooltip tooltip="Sign in">
            <v-btn to="/login" text fab small class="text--secondary">
              <v-icon color="white">mdi-login</v-icon>
            </v-btn>
          </Tooltip>
        </div>

        <div v-if="user" class="d-flex align-center ">
          <v-switch
            dark
            v-model="player.challenge.available"
            color="success"
            label="Available"
            class="force-height mr-2"
            @change="updateAvailability()"
          ></v-switch>

          <v-chip :visible="!!user" pill outlined @click="visitPlayer()">
            <v-avatar left v-if="user.photoURL">
              <img :src="user.photoURL" alt="Avatar image" />
            </v-avatar>
            Profile
          </v-chip>

          <Tooltip tooltip="Log out">
            <v-btn @click="logout" text fab small class="text--secondary">
              <v-icon color="white">mdi-logout</v-icon>
            </v-btn>
          </Tooltip>
        </div>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <router-view></router-view>

      <v-snackbar
        v-model="status.visible"
        timeout="2000"
        :color="status.color"
        >{{ status.message }}</v-snackbar
      >
    </v-main>
    <v-footer class="d-flex justify-center">
      <div class="clickable caption" @click="visitChangelog()">
        version {{ version }}
      </div>
    </v-footer>
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
    ...mapGetters({
      userName: 'userName',
      player: 'playerObject'
    })
  },
  created() {
    console.log('[App] Loading App component')
    firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        console.log('[App] onAuthStateChanged authuser')
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
          this.$store.dispatch('setStatus', {
            message: 'Logged out.',
            color: 'default'
          })
          this.$router.push({ path: '/' })
        })
    },
    updateAvailability() {
      this.$store.dispatch('updateAvailability', this.player)
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
  },
  watch: {
    user: {
      immediate: true,
      handler() {
        if (!this.user) return

        console.log('[Player] User was set. Trying to bind Player ref')
        this.$store.dispatch('bindPlayerRef')
      }
    }
  }
}
</script>

<style>
.clickable {
  cursor: pointer;
}

.force-height {
  height: 22px;
}
</style>
