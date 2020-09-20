<template>
  <v-container>
    <v-row v-for="challenge in availableChallenges" :key="challenge.player.uid">
      <v-spacer></v-spacer>
      <v-col cols="12" lg="4">
        <v-card>
          <v-card-title>
            {{ challenge.code }}
          </v-card-title>
          <v-card-subtitle>
            {{ challenge.availableSinceString() }}
          </v-card-subtitle>
          <v-card-text>
            {{ challenge.description }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row v-if="!availableChallenges.length">
      <v-spacer></v-spacer>
      <v-col cols="12" lg="4">
        <v-card>
          <v-card-title>
            No challenges currently available.
          </v-card-title>
          <v-card-subtitle>
            Be the first, you can edit your profile to customize your challenge
            and set yourself available.
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
    ...mapGetters(['availableChallenges'])
  },
  watch: {
    user: {
      immediate: true,
      handler() {
        this.$store.dispatch('bindPlayersRef')
      }
    }
  }
}
</script>

<style></style>
