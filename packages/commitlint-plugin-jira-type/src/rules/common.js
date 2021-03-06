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
    case [VALUES.any]: return true
    case [VALUES.lowercase]: return value.toLowerCase() === value
    case [VALUES.uppercase]: return value.toUpperCase() === value
  }
}

function wrap (ruleFn) {
  return function wrappedRule (rawMessage, when, value) {
    const parsed = parseCommitMessage(rawMessage)

    if (parsed.hasError(ERRORS.emptyMessage)) {
      return Failure('The commit message must not be empty.')
    }

    return ruleFn(parsed, when, value)
  }
}

module.exports = {
  Success,
  Failure,
  checkCase,
  wrap
}
