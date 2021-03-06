const { DEFAULTS, RULES } = require('commitlint-common-jira-type')

const checkCase = require('./checkCase')
const wrap = require('./wrap')
const result = require('./result')

const { ERRORS } = require('../parser')

module.exports = {
  checkCase,
  wrap,
  NotMyJob: result.NotMyJob,
  Success: result.Success,
  Failure: result.Failure,
  parser: {
    errors: ERRORS
  },
  rules: {
    defaultValues: DEFAULTS,
    names: RULES
  }
}
