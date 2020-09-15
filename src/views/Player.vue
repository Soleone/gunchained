<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="4">
        <v-card>
          <v-card-title>
            Edit your profile
          </v-card-title>
          <v-form>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field label="Gods Unchained username"> </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-textarea
                    label="Description"
                    hint="Tell other players what you think is relevant about you."
                    auto-grow
                  >
                  </v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-select label="Rank" :items="ranks"> </v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Player',
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
  }
}
</script>

<style></style>
