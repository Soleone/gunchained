<template>
  <v-app>
    <v-app-bar app>
      <div class="d-flex align-center">
        <v-img
          alt="Gods Unchained Logo"
          class="shrink mr-2"
          contain
          src="https://godsunchained.com/assets/images/internal-logos/logo--gods-unchained-icon.webp"
          transition="scale-transition"
          width="40"
        />
        <h2>Gunchained</h2>
      </div>

      <v-spacer></v-spacer>
      <div class="d-flex align-right">
        {{ userName }}
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState(['user']),
    ...mapGetters(['userName'])
  }
}
</script>
