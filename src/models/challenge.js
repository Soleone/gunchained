import dayjs from 'dayjs'

export default class Challenge {
  constructor(challenge) {
    this.code = challenge.code
    this.description = challenge.description
    this.availableSince = challenge.availableSince
  }

  static fromFire(challenge) {
    const newChallenge = challenge

    if (challenge.availableSince === 0) {
      newChallenge.availableSince = null
    } else {
      let availableSince = challenge.availableSince
      if (!(challenge.availableSince instanceof dayjs)) {
        availableSince = dayjs.unix(challenge.availableSince)
      }
      newChallenge.availableSince = availableSince
    }

    return new Challenge(newChallenge)
  }

  toFire() {
    return {
      code: this.code,
      description: this.description,
      availableSince: this.availableSince ? this.availableSince.unix() : 0
    }
  }

  get available() {
    return !!this.availableSince
  }

  set available(isAvailable) {
    if (isAvailable) {
      this.availableSince = dayjs(new Date())
    } else {
      this.availableSince = null
    }
  }

  availableSinceString() {
    return this.availableSince.fromNow()
  }
}
