const { rules, Success, Failure } = require('../common')

module.exports = {
  name: rules.names.typeSeparator,
  rule (parsed, _when, separator = rules.defaultValues.typeSeparator) {
    if (!parsed.taskIdAndType) {
      return Failure('Could not identify the task identifier and the type in the commit message.')
    }

    if (parsed.taskIdAndType.split(separator).length !== 2) {
      return Failure(`The message has no properly separated task identifier and type in "${parsed.taskIdAndType}".`)
    }

    return Success()
  }
}
