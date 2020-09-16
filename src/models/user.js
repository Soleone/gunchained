export default class User {
  constructor(user) {
    this.uid = user.uid
    this.name = user.displayName
    this.email = user.email
    this.photoURL = user.photoURL
    this.isAnonymous = user.isAnonymous
  }

  static fromAuthHash(authHash) {
    const extractUser = ({
      uid,
      displayName,
      email,
      isAnonymous,
      photoURL
    }) => {
      return { displayName, email, isAnonymous, photoURL, uid }
    }

    return new User(extractUser(authHash))
  }
}
