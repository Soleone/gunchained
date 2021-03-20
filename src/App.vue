<template>
  <v-app>
    <v-app-bar color="#263238" dark app>
      <div class="d-flex align-center px-0">
        <v-img
          @click="$router.push('/')"
          alt="Gods Unchained Logo"
          class="mr-2 clickable"
          src="@/assets/images/gods-unchained-logo-256.png"
          width="32"
        />

        <v-toolbar-title>
          <span @click="$router.push('/')" class="clickable">
            <span class="d-none d-sm-inline">Gunchained</span>
            <span class="d-inline d-sm-none">GU</span>
          </span>
          <span class="d-none d-sm-inline">
             {{ title }}
          </span>
        </v-toolbar-title>

        <v-chip
          :disabled="activeUserCount < 2"
          color="green darken-2"
          class="ml-sm-4 ml-2"
        >
          <v-avatar
            :left="this.$vuetify.breakpoint.name != 'xs'"
            class="green darken-3"
          >
            {{ activeUserCount }}
          </v-avatar>
          <span class="d-none d-sm-inline">
            {{ pluralizedUserString }} online
          </span>
        </v-chip>
      </div>

      <v-spacer></v-spacer>

      <v-toolbar-items class="d-flex align-center">
        <div v-if="user" class="d-flex align-center ">
          <v-switch
            dark
            v-model="player.challenge.available"
            color="success"
            class="force-height mr-2"
            @change="updateAvailability()"
            :disabled="!isAvailableEnabled"
          >
            <template v-slot:label>
              <span class="d-none d-sm-inline">Available</span>
            </template>
          </v-switch>

          <v-chip :visible="!!user" pill outlined @click="visitPlayer()">
            <v-avatar left v-if="user.photoURL">
              <img :src="user.photoURL" alt="Avatar image" />
            </v-avatar>
            Profile
          </v-chip>
        </div>
      </v-toolbar-items>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="mr-1"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app dark temporary right width="200">
      <v-list dense nav>
        <v-list-item link v-for="link in navigation" :key="link.label" :to="link.route">
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.label }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="logout" v-if="user">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-alert
        v-if="appStatus.visible"
        :color="appStatus.color"
        :type="appStatus.type"
        dismissible
        class="ma-3"
      >
        {{ appStatus.message }}
      </v-alert>
      <router-view></router-view>

      <v-snackbar
        v-model="status.visible"
        timeout="2000"
        :color="status.color"
        >{{ status.message }}</v-snackbar
      >
    </v-main>
    <v-footer class="d-flex justify-center">
      <Tooltip tooltip="See what changed between versions" top>
        <FooterBtn
          href="https://github.com/Soleone/gunchained/blob/master/CHANGELOG.md"
          target="github"
        >
          Version {{ version }}
        </FooterBtn>
      </Tooltip>
      <span class="mx-0 mx-sm-2">|</span>
      <FooterBtn
        href="https://github.com/Soleone/gunchained/issues"
        target="github"
      >
        Submit feedback
      </FooterBtn>
      <span class="mx-0 mx-sm-2">|</span>
      <FooterBtn href="https://github.com/Soleone/gunchained" target="github">
        Open source
      </FooterBtn>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import firebase from 'firebase/app'
import User from '@/models/user'
import Tooltip from '@/components/vuetify-ext/Tooltip.vue'
import FooterBtn from '@/components/vuetify-ext/FooterBtn.vue'

export default {
  name: 'App',
  components: {
    Tooltip,
    FooterBtn
  },
  computed: {
    ...mapState(['user', 'app', 'status', 'title']),
    ...mapGetters(['appStatus', 'isAvailableEnabled']),
    ...mapGetters({
      player: 'playerObject'
    }),
    activeUserCount() {
      return this.app?.activeUserCount || 0
    },
    pluralizedUserString() {
      return this.activeUserCount === 1 ? 'user' : 'users'
    },
    navigation() {
      const links = this.links
      if (!this.user) links.pop
      return links
    }
  },
  created() {
    console.log('[App] Loading App component')
    firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        console.log('[App] onAuthStateChanged authuser', authUser.uid)
        const user = User.fromAuthHash(authUser)
        this.$store.dispatch('setUser', user)
      }
    })
  },
  data() {
    return {
      version: '0.1.4',
      drawer: false,
      links: [
        {
          label: "Arena",
          icon: "mdi-fencing",
          route: "/"
        },
        {
          label: "Videos",
          icon: 'mdi-video',
          route: "/videos"
        },
        {
          label: "Sign in",
          icon: "mdi-login",
          route: "/login"
        }
      ]
    }
  },
  methods: {
    logout() {
      console.log("Logging out")
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
      this.$gtag.event('updateAvailability', {
        availability: this.player.challenge.available
      })
      this.$store.dispatch('updateAvailability', this.player)
    },
    visitPlayer() {
      this.$router.push({ name: 'Player' })
    }
  },
  watch: {
    user: {
      immediate: true,
      handler() {
        if (!this.user) return

        console.log('[Player] User was set. Trying to bind App and Player ref')
        this.$store.dispatch('bindAppRef')
        this.$store.dispatch('bindPlayerRef')
      }
    }
  }
}
</script>

<style>
.v-toolbar__content {
  padding-right: 4px !important;
  padding-left: 4px !important;
}

.clickable {
  cursor: pointer;
}

.force-height {
  height: 22px;
}
</style>
