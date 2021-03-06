module.exports = {
  NotMyJob () {
    return [true]
  },

  Success () {
    return [true]
  },

  Failure (message) {
    return [false, message]
  }
}
