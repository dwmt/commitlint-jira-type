const { rules, parser, Success, Failure } = require('../common')

module.exports = {
  name: rules.names.taskIdAndTypeEmpty,
  rule (parsed, _when) {
    if (parsed.hasError(parser.errors.missingTaskIdAndType)) {
      return Failure(`The commit message contains no task id and type!`)
    }

    return Success()
  }
}
