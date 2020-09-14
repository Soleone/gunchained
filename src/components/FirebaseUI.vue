<template>
  <div>
    <div>Test</div>
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

      const config = {
        signInOptions: authProviders,
        signInSuccessUrl: '/',
        tosUrl: '/tos',
        privacyPolicyUrl: '/privacy-policy',
        callbacks: {
          signInSuccessWithAuthResult: function() {
            console.log('signInSuccessWithAuthResult')
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
