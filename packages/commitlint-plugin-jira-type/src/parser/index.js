const common = require('commitlint-common-jira-type')

function parseCommitMessage (message) {
  const errors = []
  if (isEmpty(message)) {
    errors.push(ERRORS.emptyMessage)
    return { errors }
  }

  const header = message.split('\n')[0]

  const headerParts = header.split(common.DEFAULTS.commitMessageSeparator)
  if (headerParts.length < 2) {
    errors.push(ERRORS.missingCommitSeparator)
    return { errors }
  }

  const taskIdAndType = headerParts[0]
  if (isEmpty(taskIdAndType)) {
    errors.push(ERRORS.missingTaskIdAndType)
    return { errors }
  }

  const taskIdAndTypeParts = taskIdAndType.split(common.DEFAULTS.typeSeparator)
  if (taskIdAndTypeParts.length !== 2) {
    errors.push(ERRORS.invalidTaskIdAndType)
    return {
      errors,
      taskIdAndType
    }
  }

  const [taskId, type] = taskIdAndTypeParts

  const taskIdParts = taskId.split(common.DEFAULTS.projectKeySeparator)
  if (taskIdParts.length !== 2) {
    errors.push(ERRORS.invalidTaskId)
    return {
      errors,
      taskId,
      taskIdAndType
    }
  }

  const [projectKey, taskNumber] = taskIdParts

  validateProjectKey(projectKey, errors)
  validateTaskNumber(taskNumber, errors)

  return {
    errors,
    type,
    projectKey,
    taskNumber
  }
}

function isEmpty (str) {
  return !str || str.trim() === ''
}

const PROJECT_KEY_PATTERN = /^[a-zA-Z0-9]+$/

function validateProjectKey (projectKey, errors) {
  console.log(PROJECT_KEY_PATTERN.test(projectKey))

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
