import firebase from 'firebase/app'
import * as firebaseui from 'firebaseui'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import { config } from '@/../firebase.config.js'

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export const authProviders = [
  firebase.auth.EmailAuthProvider.PROVIDER_ID,
  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  firebase.auth.GithubAuthProvider.PROVIDER_ID,
  firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
]
export const auth = firebase.auth()
export const db = firebase.database()
export const store = firebase.firestore()

// Export types that exists in Firestore - Uncomment if you need them in your app
// const { Timestamp, GeoPoint } = firebase.firestore
// export { Timestamp, GeoPoint }
