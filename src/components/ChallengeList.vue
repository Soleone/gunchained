<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" :lg="columnSizeLg">
        <v-alert v-if="!user" type="info" text>
          Sign in on the top right
          <span class="d-none d-sm-inline">
            to share your challenge code.
          </span>
          <span class="d-inline d-sm-none">
            in to participate.
          </span>
        </v-alert>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row v-for="challenge in availableChallenges" :key="challenge.player.uid">
      <v-spacer></v-spacer>
      <v-col cols="12" :lg="columnSizeLg">
        <v-card>
          <v-card-title>
            {{ challenge.code }}
          </v-card-title>
          <v-card-subtitle class="align-baseline">
            {{ challenge.description }}
          </v-card-subtitle>
          <v-card-text>
            <v-chip label color="success">
              <v-icon small class="mr-1">mdi-clock-check-outline</v-icon>
              <span>{{ challenge.availableSinceString() }}</span>
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row v-if="!availableChallenges.length">
      <v-spacer></v-spacer>
      <v-col cols="12" :lg="columnSizeLg">
        <v-card>
          <v-card-title>
            No challenges currently live.
          </v-card-title>
          <v-card-subtitle>
            Be the first, you can edit your profile to customize your challenge
            and set yourself to available.
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
  data() {
    return {
      columnSizeLg: 6
    }
  },
  created() {
    console.log('[ChallengeList] Component created')
  },
  computed: {
    ...mapState(['user', 'players']),
    ...mapGetters({
      availableChallenges: 'availableChallenges',
      player: 'playerObject'
    })
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
