const { VALUES } = require('commitlint-common-jira-type')

const { parseCommitMessage, ERRORS } = require('../parser')

function Success () {
  return [true]
}

function Failure (message) {
  return [false, message]
}

function checkCase (value, expectedCase) {
  switch (expectedCase) {
    case VALUES.any: return true
    case VALUES.lowercase: return value.toLowerCase() === value
    case VALUES.uppercase: return value.toUpperCase() === value
  }
}

function wrap (ruleFn) {
  return function wrappedRule (commitlintParsed, when, value) {
    const ownParsed = parseCommitMessage(commitlintParsed.raw)

    if (ownParsed.hasError(ERRORS.emptyMessage)) {
      return Failure('The commit message must not be empty.')
    }

    return ruleFn(ownParsed, when, value)
  }
}

module.exports = {
  Success,
  Failure,
  checkCase,
  wrap
}
