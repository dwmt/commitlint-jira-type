const { rules, NotMyJob, Success, Failure } = require('../common')

module.exports = {
  name: rules.names.typeSeparator,
  rule (parsed, _when, separator = rules.defaultValues.typeSeparator) {
    if (!Object.prototype.hasOwnProperty.call(parsed, 'taskIdAndType')) {
      return NotMyJob()
    }

    if (parsed.taskIdAndType.split(separator).length !== 2) {
      return Failure(`The message has no properly separated task identifier and type in "${parsed.taskIdAndType}" (the part the precedes the ":"). Please separate the task identifier and the type with a single "${separator}".`)
    }

    return Success()
  }
}
