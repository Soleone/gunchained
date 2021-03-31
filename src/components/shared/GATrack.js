export default {
  render() {
    return this.$slots.default
  },
  props: {
    eventName: {
      type: String,
      required: true
    },
    eventLabel: {
      type: String,
      required: false
    }
  },
  mounted() {
    this.listenerElement.addEventListener('click', this.trackClick, true)
  },
  beforeDestroy() {
    this.listenerElement.removeEventListener('click', this.trackClick)
  },
  computed: {
    listenerElement() {
      return this.$slots.default[0].elm
    }
  },
  methods: {
    trackClick() {
      console.log("Emitting event", this.eventName, this.eventLabel)
      const eventOptions = {}
      if (this.eventLabel) {
        eventOptions.event_label = this.eventLabel
      }
      this.$gtag.event(this.eventName, eventOptions)
    }
  }
}