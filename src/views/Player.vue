<template>
  <v-form>
    <v-container class="mt-8">
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="12" :lg="columnSizeLg * 2">
          <v-alert v-if="!isAvailableEnabled" type="info" text>
            Once you entered a challenge code you can set yourself to available
            using the switch in the top menu bar.
          </v-alert>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="12" :lg="columnSizeLg">
          <v-card height="500">
            <v-card-title>My profile</v-card-title>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Gods Unchained account name"
                    prepend-icon="mdi-account"
                    v-model="player.guName"
                    :outlined="!!player.guName"
                    :filled="!player.guName"
                  ></v-text-field>
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
                  ></v-textarea>
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
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="12" :lg="columnSizeLg">
          <v-card height="500">
            <v-card-title>My challenge</v-card-title>

            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Challenge code"
                    prepend-icon="mdi-account-plus"
                    v-model="player.challenge.code"
                    :outlined="!!player.challenge.code"
                    :filled="!player.challenge.code"
                    :rules="[rules.code.length]"
                    minlength="3"
                    maxlength="40"
                  ></v-text-field>
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
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-col class="d-flex justify-center">
          <v-btn @click="updatePlayer()" color="primary">
            <v-icon left>mdi-content-save</v-icon> Save
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
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
      columnSizeLg: 5,
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
      ],
      rules: {
        code: {
          length: value => {
            return (
              !value ||
              (value.length >= 3 && value.length <= 40) ||
              'Code must be blank or between 3 and 40 characters.'
            )
          }
        }
      }
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters({
      isAvailableEnabled: 'isAvailableEnabled',
      player: 'playerObject'
    })
  },
  methods: {
    updatePlayer() {
      this.$gtag.event('updatePlayer')
      this.$store.dispatch('updatePlayer', this.player)
      this.$router.push({ name: 'Home' })
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
