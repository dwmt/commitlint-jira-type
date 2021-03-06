const { parser, rules, checkCase, Success, Failure } = require('../common')

module.exports = {
  name: rules.names.projectKeyCase,
  rule (parsed, _when, value = rules.defaultValues.projectKeyCase) {
    if (!parsed.taskIdAndType || parsed.hasError(parser.errors.invalidTaskIdAndType)) {
      return Failure('The task identifier and type cannot be located or they are malformed.')
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
