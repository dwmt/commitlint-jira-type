const { Failure, parser } = require('./common')
const { parseCommitMessage } = require('../parser')

const rules = (function loadRules () {
  const result = {};

  ['projectKeyCase', 'projectKeySeparator', 'projectKeyEnum', 'projectKeyAlphanumeric', 'taskNumberNumeric']
    .map(p => `./rules/${p}.js`)
    .map(require)
    .forEach(ruleObject => {
      result[ruleObject.name] = wrapRule(ruleObject.rule)
    })

  return result
})()

function wrapRule (ruleFn) {
  return function wrappedRule (commitlintParsed, when, value) {
    const ownParsed = parseCommitMessage(commitlintParsed.raw)

    if (ownParsed.hasError(parser.errors.emptyMessage)) {
      return Failure('The commit message must not be empty.')
    }

    return ruleFn(ownParsed, when, value)
  }
}

module.exports = {
  rules
}
