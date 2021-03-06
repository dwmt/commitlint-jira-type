const { parser, rules, Success, Failure } = require('../common')

module.exports = {
  name: rules.names.taskNumberNumeric,
  rule (parsed, _when) {
    if (!parsed.taskIdAndType) {
      return Failure('Could not identify the task identifier and the type in the commit message.')
    }

    if (parsed.hasError(parser.errors.invalidTaskId)) {
      return Failure(`The provided task identifier ${parsed.taskId} does not contain a proper project key separator.`)
    }

    if (parsed.hasError(parser.errors.invalidTaskNumber)) {
      return Failure(`The provided task number ${parsed.taskNumber} is not a positive integer!`)
    }

    return Success()
  }
}
