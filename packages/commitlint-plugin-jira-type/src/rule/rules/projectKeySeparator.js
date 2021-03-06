const { parser, rules, NotMyJob, Success, Failure } = require('../common')

module.exports = {
  name: rules.names.projectKeySeparator,
  rule (parsed, _when, separator = rules.defaultValues.projectKeySeparator) {
    if (!parsed.taskId) {
      return NotMyJob()
    }

    if (parsed.hasError(parser.errors.invalidTaskId)) {
      return Failure(`The provided task identifier "${parsed.taskId}" is malformed. Please separate the project key and the task number with a "${separator}".`)
    }

    return Success()
  }
}
