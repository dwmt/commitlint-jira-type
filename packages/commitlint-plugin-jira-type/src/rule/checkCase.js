const { VALUES } = require('@dwmt/commitlint-common-jira-type')

module.exports = function checkCase (value, expectedCase) {
  switch (expectedCase) {
    case VALUES.any: return true
    case VALUES.lowercase: return value.toLowerCase() === value
    case VALUES.uppercase: return value.toUpperCase() === value
  }
}
