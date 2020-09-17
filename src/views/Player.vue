<template>
  <div>
    <v-container class="mt-8">
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="12" lg="3">
          <v-card>
            <v-card-title>
              Edit your profile
            </v-card-title>
            <v-form>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                      label="Gods Unchained account name"
                      prepend-icon="mdi-account"
                      v-model="player.guName"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-textarea
                      label="Description"
                      hint="Tell other players what you think is relevant about you."
                      auto-grow
                      prepend-icon="mdi-text-account"
                      v-model="player.description"
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
                      prepend-icon="mdi-ladder"
                    >
                    </v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="text-center">
                    <v-btn @click="save" class="success">Save</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

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
    ...mapState(['user', 'player'])
  },
  methods: {
    save() {
      console.log(this.player)
      console.log(this.$firestoreRefs)
      this.$store.dispatch('updatePlayer')
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
