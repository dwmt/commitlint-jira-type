const { rules, NotMyJob, Failure } = require('../common')

module.exports = {
  name: rules.names.taskIdEmpty,
  rule (parsed, _when) {
    if (parsed.taskIdAndType && !parsed.taskId) {
      return Failure(`The identifier and type segment "${parsed.taskIdAndType}" (the part that precedes ":") contains no valid task identifier! Please add a task identifier before the single "/" separator.`)
    }

    return NotMyJob()
  }
}
