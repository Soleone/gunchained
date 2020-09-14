<template>
  <div>
    <div id="firebaseui-auth-container" />
  </div>
</template>

<script>
import { auth, authProviders } from '@/plugins/firebase'

export default {
  name: 'FirebaseUI',
  mounted: function() {
    if (process.browser) {
      let firebaseui = require('firebaseui')
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
        tosUrl: '/tos',
        privacyPolicyUrl: '/privacy-policy',
        callbacks: {
          signInSuccessWithAuthResult: result => {
            console.log('signInSuccessWithAuthResult')
            console.log(result)
            const user = extractUser(result.user)
            console.log(user)
            this.$store.dispatch('setUser', user)
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
