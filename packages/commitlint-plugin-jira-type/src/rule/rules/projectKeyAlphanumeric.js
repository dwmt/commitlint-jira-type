const { parser, rules, Success, Failure } = require('../common')

module.exports = {
  name: rules.names.projectKeyAlphanumeric,
  rule (parsed, _when) {
    if (!parsed.taskIdAndType || parsed.hasError(parser.errors.invalidTaskIdAndType)) {
      return Failure('The task identifier and type cannot be located or they are malformed.')
    }

    if (parsed.hasError(parser.errors.invalidTaskId)) {
      return Failure(`The provided task identifier ${parsed.taskId} does not contain a proper project key separator.`)
    }

    if (parsed.hasError(parser.errors.invalidProjectKey)) {
      return Failure(`Project keys may only contain alphanumeric characters. Please check "${parsed.projectKey}".`)
    }

    return Success()
  }
}
