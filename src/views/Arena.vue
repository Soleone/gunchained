<template>
  <ChallengeList :key="reloadKey" />
</template>

<script>
import ChallengeList from '@/components/ChallengeList.vue'
import { mapState } from 'vuex'

export default {
  name: 'Arena',
  mounted() {
    this.$store.dispatch('setTitle', 'Arena')
  },
  components: {
    ChallengeList
  },
  computed: {
    ...mapState(['reloadKey'])
  }
}
</script>
