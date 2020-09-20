<template>
  <ChallengeList :key="reloadKey" />
</template>

<script>
import ChallengeList from '@/components/ChallengeList.vue'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    ChallengeList
  },
  computed: {
    ...mapState(['reloadKey'])
  }
}
</script>
