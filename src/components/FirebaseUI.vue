<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-row cols="4">
        <v-card class="mt-8" v-show="uiShown">
          <v-card-title class="justify-center">
            Login
          </v-card-title>
          <v-card-subtitle class="text-center">
            Choose your preferred authentication method.
          </v-card-subtitle>
          <v-card-actions>
            <div id="firebaseui-auth-container" />
          </v-card-actions>
        </v-card>
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
                this.$store.dispatch(
                  'setStatus',
                  'Created new account. Welcome!'
                )
              }
              this.$router.push({ name: 'Home' })
            })
          },
          uiShown: () => {
            this.uiShown = true
          },
          signInFailure() {
            this.$store.dispatch('setStatus', 'Failed to sign in', 'error')
          }
        }
      }

      ui.start('#firebaseui-auth-container', config)
    }
  }
}
</script>

<style src="firebaseui/dist/firebaseui.css"></style>
