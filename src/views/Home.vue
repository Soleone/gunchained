<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <h1 class="text-h6">Welcome to Gunchained</h1>
        <p class="text-subtitle-1">Content and tools for <a href="https://godsunchained.com">Gods Unchained</a></p>
      </v-col>
    </v-row>

    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" lg="6">
        <v-alert type="info" text>
          Navigate using the <v-icon small light>mdi-menu</v-icon> Menu button in the top right corner.
        </v-alert>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <v-row class="text-body-1">
      <v-col cols="5" class="red lighten-5 rounded">
        <p>You can either visit the <v-icon small>mdi-fencing</v-icon> <a href="/arena"> Arena</a> and find other players to play against.</p>
        <p>To use this feature and share your invite code you will have to <a href="/login">sign in</a> first to be able to fill out your <a href="/profile">player profile</a>.</p>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="5" class="green lighten-5 rounded">
        <p>Or you can visit the <v-icon small>mdi-video</v-icon> <a href="/videos">Video</a> library to find educational and entertaining content from community creators.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  mounted() {
    this.$store.dispatch('setTitle', 'Home')
  },
}
</script>