const { parser, rules, Success, Failure } = require('../common')

module.exports = {
  name: rules.names.projectKeySeparator,
  rule (parsed, _when, _value = rules.defaultValues.projectKeySeparator) {
    if (!parsed.taskIdAndType) {
      return Failure('Could not identify the task identifier and the type in the commit message.')
    }

    if (parsed.hasError(parser.errors.invalidTaskId)) {
      return Failure(`The provided task identifier ${parsed.taskId} does not contain a proper project key separator.`)
    }

    return Success()
  }
}
