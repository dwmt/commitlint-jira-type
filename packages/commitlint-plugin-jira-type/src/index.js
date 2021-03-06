const { RULES } = require('commitlint-common-jira-type')

const { wrap } = require('./rules/common')

module.exports = {
  rules: {
    [RULES.projectKeyCase]: wrap(require('./rules/projectKeyCase'))
  }
}
