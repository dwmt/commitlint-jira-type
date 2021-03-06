const { parser, rules, Success, Failure } = require('../common')

function isEmpty (str) {
  return !str || str.trim() === ''
}

module.exports = {
  name: rules.names.projectKeyEmpty,
  rule (parsed, _when) {
    if (!parsed.taskIdAndType) {
      return Failure('Could not identify the task identifier and the type in the commit message.')
    }

    if (parsed.hasError(parser.errors.invalidTaskId)) {
      return Failure(`The provided task identifier ${parsed.taskId} does not contain a proper project key separator.`)
    }

    if (parsed.projectKey && isEmpty(parsed.projectKey)) {
      return Failure(`The task identifier ${parsed.taskId} contains no project key.`)
    }

    return Success()
  }
}
