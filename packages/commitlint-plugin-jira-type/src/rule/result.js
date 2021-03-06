module.exports = {
  Success () {
    return [true]
  },

  Failure (message) {
    return [false, message]
  }
}
