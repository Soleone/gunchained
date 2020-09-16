<template>
  <div>
    <v-container>
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="3">
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

    <v-snackbar v-model="showStatus" timeout="2000" :color="statusColor">
      {{ statusMessage }}
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { store } from '@/plugins/firebase'

export default {
  name: 'Player',
  created() {
    console.log('Loading Player component')
  },
  data() {
    return {
      showStatus: false,
      statusMessage: null,
      statusColor: 'success',
      player: {
        guName: null,
        description: null,
        rank: null
      },
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
    ...mapState(['user'])
  },
  methods: {
    save() {
      console.log(this.player)
      console.log(this.$firestoreRefs)
      this.$firestoreRefs.player
        .update(this.player)
        .then(() => {
          this.setStatus('Updated profile.')
        })
        .catch(() => {
          this.setStatus('Failed to update profile!', 'error')
        })
    },
    setStatus(message, color = 'success') {
      this.statusMessage = message
      this.statusColor = color
      this.showStatus = true
    }
  },
  watch: {
    user: {
      immediate: true,
      handler() {
        console.log('Loaded user from vuex')
        console.log(this.user)
        store
          .collection('players')
          .doc(this.user.uid)
          .get()
          .then(doc => {
            console.log(doc)
            this.$bind('player', doc.ref)
          })
      }
    }
  }
}
</script>

<style></style>
