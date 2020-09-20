<template>
  <v-form>
    <v-container class="mt-8">
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="12" lg="3">
          <v-card height="500">
            <v-card-title>
              My profile
            </v-card-title>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Gods Unchained account name"
                    prepend-icon="mdi-account"
                    v-model="player.guName"
                    :outlined="!!player.guName"
                    :filled="!player.guName"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-textarea
                    label="Bio"
                    hint="Tell other players what you think is relevant about you."
                    prepend-icon="mdi-text-account"
                    v-model="player.description"
                    :outlined="!!player.description"
                    :filled="!player.description"
                    no-resize
                  >
                  </v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-select
                    label="Rank"
                    :items="ranks"
                    v-model="player.rank"
                    :outlined="!!player.rank"
                    :filled="!player.rank"
                    prepend-icon="mdi-ladder"
                  >
                  </v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="12" lg="3">
          <v-card height="500">
            <v-card-title>
              My challenge
            </v-card-title>

            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Challenge code"
                    prepend-icon="mdi-account-plus"
                    v-model="player.challenge.code"
                    :outlined="!!player.challenge.code"
                    :filled="!player.challenge.code"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-textarea
                    label="Description"
                    hint="What you are playing and what kind of challenger you are looking for."
                    prepend-icon="mdi-card-text"
                    v-model="player.challenge.description"
                    :outlined="!!player.challenge.description"
                    :filled="!player.challenge.description"
                    no-resize
                  >
                  </v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-switch
                    v-model="player.challenge.available"
                    prepend-icon="mdi-calendar-check"
                    label="Available"
                    color="success"
                  ></v-switch>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <v-btn @click="save" class="success">Save</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Player',
  created() {
    console.log('[Player] Created')
  },
  mounted() {
    console.log('[Player] Mounted')
  },
  data() {
    return {
      ranks: [
        'Rusted Bronze ',
        'Purified Bronze ',
        'Rusted Iron ',
        'Purified Iron ',
        'Impact Meteorite ',
        'Astral Meteorite ',
        'Twilight Shadow ',
        'Midnight Shadow ',
        'Auric Gold ',
        'Solar Gold ',
        'Ethereal Diamond ',
        'Mythic '
      ]
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters({
      player: 'playerObject'
    })
  },
  methods: {
    save() {
      console.log(this.player)
      console.log(this.$firestoreRefs)
      this.$store.dispatch('updatePlayer', this.player)
      this.$router.push('/')
    }
  },
  watch: {
    user: {
      immediate: true,
      handler() {
        if (!this.user) return

        console.log('[Player] User was set. Trying to bind Player ref')
        this.$store.dispatch('bindPlayerRef')
      }
    }
  }
}
</script>

<style></style>
