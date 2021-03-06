const { parser, rules, NotMyJob, Success, Failure } = require('../common')

module.exports = {
  name: rules.names.projectKeyAlphanumeric,
  rule (parsed, _when) {
    if (!parsed.projectKey) {
      return NotMyJob()
    }

    if (parsed.hasError(parser.errors.invalidProjectKey)) {
      return Failure(`Project keys may only contain alphanumeric (a-z, A-Z, 0-9) characters. Please check "${parsed.projectKey}".`)
    }

    return Success()
  }
}
