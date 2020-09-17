<template>
  <v-container>
    <v-row v-for="challenge in challenges" :key="challenge.player.uid">
      <v-spacer></v-spacer>
      <v-col cols="12" lg="4">
        <v-card>
          <v-card-title>
            {{ challenge.code }}
          </v-card-title>
          <v-card-subtitle>
            {{ challenge.description }}
          </v-card-subtitle>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'ChallengeList',
  created() {
    console.log('Loading ChallengeList component')
  },
  computed: {
    ...mapState(['user', 'players']),
    ...mapGetters(['challenges'])
  },
  watch: {
    user: {
      immediate: true,
      handler() {
        if (!this.user) return

        console.log('[ChallengeList] User is set')
        this.$store.dispatch('bindPlayersRef')
      }
    }
  }
}
</script>

<style></style>
