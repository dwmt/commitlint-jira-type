const { DEFAULTS } = require('commitlint-common-jira-type')

const { ERRORS } = require('../parser')
const { Success, Failure, checkCase } = require('./common')

module.exports = function projectKeyCase (parsed, _when, value = DEFAULTS.projectKeyCase) {
  if (!parsed.projectKey) {
    return Failure('Could not identify the project key in the commit message.')
  }

  if (parsed.hasError(ERRORS.invalidProjectKey)) {
    return Failure(`The provided project key ${parsed.projectKey} is invalid.`)
  }

  if (!checkCase(parsed.projectKey, value)) {
    return Failure(`The project key ${parsed.projectKey} is not entirely ${value}.`)
  }

  return Success()
}
