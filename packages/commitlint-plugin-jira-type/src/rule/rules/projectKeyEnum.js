const { rules, NotMyJob, Success, Failure } = require('../common')

module.exports = {
  name: rules.names.projectKeyEnum,
  rule (parsed, _when, acceptedProjectKeys = rules.defaultValues.projectKeyEnum) {
    if (!parsed.projectKey) {
      return NotMyJob()
    }

    if (!acceptedProjectKeys) {
      return Success()
    }

    if (!acceptedProjectKeys.includes(parsed.projectKey)) {
      return Failure(`The project key ${parsed.projectKey} is not available. Available keys are: ${acceptedProjectKeys.join(', ')}`)
    }

    return Success()
  }
}
