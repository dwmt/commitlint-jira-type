const { parser, rules, checkCase, Success, Failure } = require('../common')

module.exports = {
  name: rules.names.typeCase,
  rule (parsed, _when, expectedCase = rules.defaultValues.typeCase) {
    if (!parsed.taskIdAndType || parsed.hasError(parser.errors.invalidTaskIdAndType)) {
      return Failure('The task identifier and type cannot be located or they are malformed.')
    }

    if (!checkCase(parsed.type || '', expectedCase)) {
      return Failure(`The type ${parsed.type} is not entirely ${expectedCase}.`)
    }

    return Success()
  }
}
