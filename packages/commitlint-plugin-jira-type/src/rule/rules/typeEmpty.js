const { rules, Success, Failure } = require('../common')

module.exports = {
  name: rules.names.taskIdEmpty,
  rule (parsed, _when) {
    if (!parsed.type) {
      return Failure('The commit message contains no type identifier!')
    }

    return Success()
  }
}
