const { rules, Success, Failure } = require('../common')

module.exports = {
  name: rules.names.typeEmpty,
  rule (parsed, _when) {
    if (parsed.taskIdAndType && !parsed.type) {
      return Failure(`The identifier and type segment "${parsed.taskIdAndType}" (the part that precedes ":") contains no valid type! Please add a type after the single "/" separator.`)
    }

    return Success()
  }
}
