const { parser, rules, Success, Failure } = require('../common')

module.exports = {
  name: rules.names.projectKeyEnum,
  rule (parsed, _when, acceptedProjectKeys = rules.defaultValues.projectKeyEnum) {
    if (!parsed.taskIdAndType) {
      return Failure('Could not identify the task identifier and the type in the commit message.')
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
