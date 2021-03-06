const { parser, rules, Success, Failure } = require('../common')

module.exports = {
  name: rules.names.typeEnum,
  rule (parsed, _when, acceptedTypes = rules.defaultValues.typeEnum) {
    if (!parsed.taskIdAndType || parsed.hasError(parser.errors.invalidTaskIdAndType)) {
      return Failure('The task identifier and type cannot be located or they are malformed.')
    }

    if (!acceptedTypes) {
      return Success()
    }

    if (!acceptedTypes.includes(parsed.type)) {
      return Failure(`The type ${parsed.type} is not available. Available keys are: ${acceptedTypes}`)
    }

    return Success()
  }
}
