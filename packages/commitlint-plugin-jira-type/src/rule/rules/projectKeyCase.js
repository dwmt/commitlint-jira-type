const { rules, checkCase, NotMyJob, Success, Failure } = require('../common')

module.exports = {
  name: rules.names.projectKeyCase,
  rule (parsed, _when, expectedCase = rules.defaultValues.projectKeyCase) {
    if (!parsed.projectKey) {
      return NotMyJob()
    }

    if (!checkCase(parsed.projectKey || '', expectedCase)) {
      return Failure(`The project key ${parsed.projectKey} is not entirely ${expectedCase}.`)
    }

    return Success()
  }
}
