<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-row cols="4">
        <div id="firebaseui-auth-container" class="mt-8" />
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import { auth, authProviders } from '@/plugins/firebase'
import User from '@/models/user'
import Player from '@/models/player'

export default {
  name: 'FirebaseUI',
  data() {
    return {
      uiShown: false
    }
  },
  mounted() {
    if (process.browser) {
      const firebaseui = require('firebaseui')
      const ui =
        firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)

      const config = {
        signInOptions: authProviders,
        autoUpgradeAnonymousUsers: true,
        signInSuccessUrl: '/',
        tosUrl: '/#/terms-of-service',
        privacyPolicyUrl: '/#/privacy-policy',
        callbacks: {
          signInSuccessWithAuthResult: result => {
            const user = User.fromAuthHash(result.user)
            console.log(user)
            this.$store.dispatch('setUser', user)

            Player.loadByUid(user.uid).then(player => {
              if (!player) {
                Player.createByUid(user.uid)
                this.$store.dispatch('setStatus', {
                  message: 'Created new account. Welcome!'
                })
                this.$gtag.event('playerCreated')
              }
              this.$router.push({ name: 'Player' })
            })
          },
          uiShown: () => {
            this.uiShown = true
          },
          signInFailure() {
            this.$store.dispatch('setStatus', {
              message: 'Failed to sign in',
              color: 'error'
            })
            this.$gtag.event('signInFailure')
          }
        }
      }

      ui.start('#firebaseui-auth-container', config)
    }
  }
}
</script>

<style src="firebaseui/dist/firebaseui.css"></style>
