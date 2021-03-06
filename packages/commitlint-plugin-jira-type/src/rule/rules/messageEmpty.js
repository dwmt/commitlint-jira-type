const { parser, rules, Success, Failure } = require('../common')

module.exports = {
  name: rules.names.messageEmpty,
  rule (parsed, _when) {
    if (parsed.hasError(parser.errors.emptyMessage)) {
      return Failure('The commit message must be non-empty')
    }

    return Success()
  }
}
