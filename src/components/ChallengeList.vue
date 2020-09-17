<template>
  <v-container>
    <v-row v-for="player in players" :key="player.uid">
      <v-col>
        <v-card>
          <v-card-title>
            {{ player.id }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ChallengeList',
  created() {
    console.log('Loading ChallengeList component')
  },
  computed: {
    ...mapState(['user', 'players'])
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
