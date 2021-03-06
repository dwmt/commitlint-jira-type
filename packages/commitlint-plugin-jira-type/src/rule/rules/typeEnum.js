const { rules, NotMyJob, Success, Failure } = require('../common')

module.exports = {
  name: rules.names.typeEnum,
  rule (parsed, _when, acceptedTypes = rules.defaultValues.typeEnum) {
    if (!parsed.type) {
      return NotMyJob()
    }

    if (!acceptedTypes) {
      return Success()
    }

    if (!acceptedTypes.includes(parsed.type)) {
      return Failure(`The type "${parsed.type}" is not available. Available keys are: ${acceptedTypes.join(', ')}`)
    }

    return Success()
  }
}
