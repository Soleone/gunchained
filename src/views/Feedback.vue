<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Feedback</v-card-title>
          <v-card-text>
           <p>If you are aware of a great Gods Unchained video that should be featured on this site, you can suggest it here.</p>
            <v-text-field label="Youtube URL" v-model="feedback.url" outlined prepend-icon="mdi-youtube"></v-text-field>
            <v-textarea label="Comment" hint="Additional notes on why you recommend this" v-model="feedback.text" outlined prepend-icon="mdi-comment"></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="submitFeedback">
              <v-icon left>mdi-send</v-icon> Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Feedback',
  data() {
    return {
      feedback: {
        url: null,
        text: null
      }
    }
  },
  methods: {
    submitFeedback() {
      this.$store.dispatch('submitFeedback', this.feedback).then(() => {
        this.$router.push({ name: 'Videos' })
      })
    }
  }
}
</script>