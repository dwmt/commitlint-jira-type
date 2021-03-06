const { parser, rules, Success, Failure } = require('../common')

module.exports = {
  name: rules.names.projectKeyEnum,
  rule (parsed, _when, acceptedProjectKeys = rules.defaultValues.projectKeyEnum) {
    if (!parsed.taskIdAndType || parsed.hasError(parser.errors.invalidTaskIdAndType)) {
      return Failure('The task identifier and type cannot be located or they are malformed.')
    }

    if (parsed.hasError(parser.errors.invalidTaskId)) {
      return Failure(`The provided task identifier ${parsed.taskId} does not contain a proper project key separator.`)
    }

    if (parsed.hasError(parser.errors.invalidProjectKey)) {
      return Failure(`The provided project key ${parsed.projectKey} is not well-formed!`)
    }

    if (!acceptedProjectKeys) {
      return Success()
    }

    if (!acceptedProjectKeys.includes(parsed.projectKey)) {
      return Failure(`The project key ${parsed.projectKey} is not available. Available keys are: ${acceptedProjectKeys}`)
    }

    return Success()
  }
}
