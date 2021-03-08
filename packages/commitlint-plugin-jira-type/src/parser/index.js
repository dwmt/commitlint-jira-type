const common = require('@dwmt/commitlint-common-jira-type')

function parseCommitMessage (message) {
  const output = {
    errors: [],
    hasError (error) {
      return this.errors.includes(error)
    }
  }

  if (isEmpty(message)) {
    output.errors.push(ERRORS.emptyMessage)
    return output
  }

  const header = message.split('\n')[0]

  const headerParts = header.split(common.DEFAULTS.commitMessageSeparator)
  if (headerParts.length < 2) {
    output.errors.push(ERRORS.missingCommitSeparator)
    return output
  }

  output.taskIdAndType = headerParts[0]
  if (isEmpty(output.taskIdAndType)) {
    output.errors.push(ERRORS.missingTaskIdAndType)
    return output
  }

  const taskIdAndTypeParts = output.taskIdAndType.split(common.DEFAULTS.typeSeparator)
  if (taskIdAndTypeParts.length !== 2) {
    output.errors.push(ERRORS.invalidTaskIdAndType)
    return output
  }

  output.taskId = taskIdAndTypeParts[0]
  output.type = taskIdAndTypeParts[1]

  const taskIdParts = output.taskId.split(common.DEFAULTS.projectKeySeparator)
  if (taskIdParts.length !== 2) {
    output.errors.push(ERRORS.invalidTaskId)
    return output
  }

  output.projectKey = taskIdParts[0]
  output.taskNumber = taskIdParts[1]

  validateProjectKey(output.projectKey, output.errors)
  validateTaskNumber(output.taskNumber, output.errors)

  return output
}

function isEmpty (str) {
  return !str || str.trim() === ''
}

const PROJECT_KEY_PATTERN = /^[a-zA-Z0-9]+$/

function validateProjectKey (projectKey, errors) {
  if (!PROJECT_KEY_PATTERN.test(projectKey)) {
    errors.push(ERRORS.invalidProjectKey)
  }
}

const TASK_NUMBER_PATTERN = /^[0-9]+$/

function validateTaskNumber (taskNumber, errors) {
  if (!TASK_NUMBER_PATTERN.test(taskNumber)) {
    errors.push(ERRORS.invalidTaskNumber)
  }
}

const ERRORS = {
  emptyMessage: 'emptyMessage',
  missingCommitSeparator: 'missingCommitSeparator',
  missingTaskIdAndType: 'missingTaskIdAndType',
  invalidTaskIdAndType: 'invalidTaskIdAndType',
  invalidTaskId: 'invalidTaskId',
  invalidProjectKey: 'invalidProjectKey',
  invalidTaskNumber: 'invalidTaskNumber'
}

module.exports = {
  parseCommitMessage,
  ERRORS
}
