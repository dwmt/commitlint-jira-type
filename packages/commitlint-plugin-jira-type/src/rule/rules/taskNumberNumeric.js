const { parser, rules, NotMyJob, Success, Failure } = require('../common')

module.exports = {
  name: rules.names.taskNumberNumeric,
  rule (parsed, _when) {
    if (!parsed.taskNumber) {
      return NotMyJob()
    }

    if (parsed.hasError(parser.errors.invalidTaskNumber)) {
      return Failure(`The provided task number "${parsed.taskNumber}" is not a positive integer!`)
    }

    return Success()
  }
}
