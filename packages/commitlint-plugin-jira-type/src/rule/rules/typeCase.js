const { rules, checkCase, NotMyJob, Success, Failure } = require('../common')

module.exports = {
  name: rules.names.typeCase,
  rule (parsed, _when, expectedCase = rules.defaultValues.typeCase) {
    if (!parsed.type) {
      return NotMyJob()
    }

    if (!checkCase(parsed.type || '', expectedCase)) {
      return Failure(`The type "${parsed.type}" is not entirely ${expectedCase}.`)
    }

    return Success()
  }
}
