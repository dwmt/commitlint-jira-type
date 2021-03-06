const { parser, rules, checkCase, Success, Failure } = require('../common')

module.exports = {
  name: rules.names.projectKeyCase,
  rule (parsed, _when, value = rules.defaultValues.projectKeyCase) {
    if (!parsed.projectKey) {
      return Failure('Could not identify the project key in the commit message.')
    }

    if (parsed.hasError(parser.errors.invalidProjectKey)) {
      return Failure(`The provided project key ${parsed.projectKey} is invalid.`)
    }

    if (!checkCase(parsed.projectKey, value)) {
      return Failure(`The project key ${parsed.projectKey} is not entirely ${value}.`)
    }

    return Success()
  }
}
