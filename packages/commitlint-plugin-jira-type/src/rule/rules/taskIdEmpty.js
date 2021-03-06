const { rules, Success, Failure } = require('../common')

module.exports = {
  name: rules.names.taskIdEmpty,
  rule (parsed, _when) {
    if (!parsed.taskId) {
      return Failure('The commit message contains no task identifier!')
    }

    return Success()
  }
}
