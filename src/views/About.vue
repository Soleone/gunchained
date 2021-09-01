<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <h1 class="text-h6">Welcome to Gunchained</h1>
        <p class="text-subtitle-1">
          Content and tools for
          <a href="https://godsunchained.com">Gods Unchained</a>
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" lg="6">
        <v-alert type="info" text>
          Navigate using the <v-icon small light>mdi-menu</v-icon> Menu button
          in the top right corner.
        </v-alert>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <v-row class="text-body-1">
      <v-spacer></v-spacer>
      <v-col cols="5" class="green lighten-5 rounded">
        <p>
          <GATrack event-name="navigationClickedFromHome" event-label="Arena">
            <v-btn color="success" to="/arena"
              ><v-icon left>mdi-fencing</v-icon> Arena</v-btn
            >
          </GATrack>
        </p>
        <p>
          Find other players to play against. Useful for casual matches or
          organizing a tournament setting.
        </p>
        <p>
          To share your invite code you will have to
          <GATrack event-name="navigationClickedFromHome" event-label="Sign in">
            <a href="/login">sign in</a>
          </GATrack>
          first to be able to fill out your
          <GATrack
            event-name="navigationClickedFromHome"
            event-label="Player profile"
          >
            <a href="/player">player profile</a>
          </GATrack>
          .
        </p>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="5" class="red lighten-5 rounded">
        <p>
          <GATrack event-name="navigationClickedFromHome" event-label="Videos">
            <v-btn color="error" :to="{ name: 'Videos' }"
              ><v-icon left>mdi-youtube</v-icon> Videos</v-btn
            >
          </GATrack>
        </p>
        <p>
          Find educational and entertaining content from community creators.
        </p>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import GATrack from '@/components/shared/GATrack.js'

export default {
  name: 'About',
  components: {
    GATrack
  },
  mounted() {
    this.$store.dispatch('setTitle', 'About')
  }
}
</script>
