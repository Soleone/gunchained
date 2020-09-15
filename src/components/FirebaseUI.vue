<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-row cols="4">
        <v-card class="mt-8">
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

export default {
  name: 'FirebaseUI',
  mounted: function() {
    if (process.browser) {
      const firebaseui = require('firebaseui')
      const ui =
        firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)

      const extractUser = ({
        displayName,
        email,
        isAnonymous,
        photoURL,
        uid
      }) => {
        return { displayName, email, isAnonymous, photoURL, uid }
      }
      const config = {
        signInOptions: authProviders,
        signInSuccessUrl: '/',
        autoUpgradeAnonymousUsers: true,
        tosUrl: '/#/terms-of-service',
        privacyPolicyUrl: '/#/privacy-policy',
        callbacks: {
          signInSuccessWithAuthResult: result => {
            const user = extractUser(result.user)
            this.$store.dispatch('setUser', user)
            this.$router.push({ name: 'Home' })
          },
          uiShown: function() {
            console.log('uiShown')
          }
        }
      }

      ui.start('#firebaseui-auth-container', config)
    }
  }
}
</script>

<style src="firebaseui/dist/firebaseui.css"></style>
