import { store } from '@/plugins/firebase'
import Challenge from '@/models/challenge'

export default class Player {
  constructor(player) {
    this.guName = player.guName
    this.description = player.description
    this.rank = player.rank
    this.challenge = Challenge.fromFire(player.challenge || {})
  }

  static async loadByUid(uid) {
    const docRef = store.collection('players').doc(uid)
    const doc = await docRef.get()
    if (doc.exists) {
      return new Player(doc.data())
    } else {
      return null
    }
  }

  static async createByUid(uid) {
    store
      .collection('players')
      .doc(uid)
      .set({
        guName: null,
        description: null,
        rank: null,
        challenge: {
          code: null,
          description: null,
          availableSince: 0
        }
      })
      .then(() => {
        console.log('Created new player with uid ', uid)
        location.reload()
      })
  }
}
