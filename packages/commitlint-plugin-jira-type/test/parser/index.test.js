/* eslint-env jest */

const { parseCommitMessage, ERRORS } = require('../../src/parser')

describe('commit message parser', () => {
  describe('should return empty meessage error', () => {
    errorOnlyTestCase({
      name: 'if the message is completely empty',
      message: '',
      expectedErrors: [ERRORS.emptyMessage]
    })

    errorOnlyTestCase({
      name: 'if the message is just whitespace',
      message: '\n  \t \n  \n',
      expectedErrors: [ERRORS.emptyMessage]
    })
  })

  describe('should return missing commit separator', () => {
    errorOnlyTestCase({
      name: 'if the message does not contain the configured separator',
      message: 'minor fixes',
      expectedErrors: [ERRORS.missingCommitSeparator]
    })
  })

  describe('should return missing task id and type', () => {
    errorOnlyTestCase({
      name: 'if the task id and type are completely empty',
      message: ': minor fixes',
      expectedErrors: [ERRORS.missingTaskIdAndType]
    })

    errorOnlyTestCase({
      name: 'if the task id and type are whitespace only',
      message: '    : minor fixes',
      expectedErrors: [ERRORS.missingTaskIdAndType]
    })
  })

  describe('should return invalid task id and type', () => {
    testCase({
      name: 'if the task id and type are just a simple string',
      message: 'something: minor fixes',
      expected: {
        taskIdAndType: 'something',
        errors: [ERRORS.invalidTaskIdAndType]
      }
    })
  })

  describe('should return invalid task id', () => {
    testCase({
      name: 'if the task id is not well-formed',
      message: 'taskid/type: minor fixes',
      expected: {
        taskIdAndType: 'taskid/type',
        taskId: 'taskid',
        type: 'type',
        errors: [ERRORS.invalidTaskId]
      }
    })
  })

  describe('should return invalid project key', () => {
    testCase({
      name: 'if the project key contains whitespaces',
      message: 'pro ject-1/type: minor fixes',
      expected: {
        taskIdAndType: 'pro ject-1/type',
        projectKey: 'pro ject',
        taskNumber: '1',
        taskId: 'pro ject-1',
        type: 'type',
        errors: [ERRORS.invalidProjectKey]
      }
    })

    testCase({
      name: 'if the project key contains special characters',
      message: 'pr$j@ct-1/type: minor fixes',
      expected: {
        taskIdAndType: 'pr$j@ct-1/type',
        projectKey: 'pr$j@ct',
        taskNumber: '1',
        taskId: 'pr$j@ct-1',
        type: 'type',
        errors: [ERRORS.invalidProjectKey]
      }
    })
  })

  describe('should return invalid task number', () => {
    testCase({
      name: 'if the task number contains whitespaces',
      message: 'project-1 1/type: minor fixes',
      expected: {
        taskIdAndType: 'project-1 1/type',
        projectKey: 'project',
        taskNumber: '1 1',
        taskId: 'project-1 1',
        type: 'type',
        errors: [ERRORS.invalidTaskNumber]
      }
    })

    testCase({
      name: 'if the task number contains non-numeric characters',
      message: 'project-1a/type: minor fixes',
      expected: {
        taskIdAndType: 'project-1a/type',
        projectKey: 'project',
        taskNumber: '1a',
        taskId: 'project-1a',
        type: 'type',
        errors: [ERRORS.invalidTaskNumber]
      }
    })
  })

  describe('should work fine', () => {
    testCase({
      name: 'if the message is a simple, well-formatted text',
      message: 'PROJECT-11/type: minor fixes',
      expected: {
        taskIdAndType: 'PROJECT-11/type',
        projectKey: 'PROJECT',
        taskNumber: '11',
        taskId: 'PROJECT-11',
        type: 'type'
      }
    })

    testCase({
      name: 'if the message is a well-formatted, but multiline',
      message: 'PROJECT-11/type: minor fixes\n\nsome longer description\n\nBREAKING',
      expected: {
        taskIdAndType: 'PROJECT-11/type',
        projectKey: 'PROJECT',
        taskNumber: '11',
        taskId: 'PROJECT-11',
        type: 'type'
      }
    })

    testCase({
      name: 'if the message is a well-formatted, but contains an URI',
      message: 'PROJECT-11/type: see confluence.com/something',
      expected: {
        taskIdAndType: 'PROJECT-11/type',
        projectKey: 'PROJECT',
        taskNumber: '11',
        taskId: 'PROJECT-11',
        type: 'type'
      }
    })

    testCase({
      name: 'if the message is a well-formatted, but the type contains multiple words',
      message: 'PROJECT-11/two words: see confluence.com/something',
      expected: {
        taskIdAndType: 'PROJECT-11/two words',
        projectKey: 'PROJECT',
        taskNumber: '11',
        taskId: 'PROJECT-11',
        type: 'two words'
      }
    })

    testCase({
      name: 'if the message is a well-formatted, but contains the commet separator multiple times',
      message: 'PROJECT-11/type: see: what goes around: comes back around',
      expected: {
        taskIdAndType: 'PROJECT-11/type',
        projectKey: 'PROJECT',
        taskNumber: '11',
        taskId: 'PROJECT-11',
        type: 'type'
      }
    })
  })
})

function errorOnlyTestCase ({ name, message, expectedErrors }) {
  test(name, () => {
    // When
    const actual = parseCommitMessage(message)

    // Then
    expect(actual.errors).toStrictEqual(expectedErrors)
  })
}

function testCase ({ name, message, expected }) {
  test(name, () => {
    // When
    const actual = parseCommitMessage(message)

    // Then
    expect(actual.errors).toStrictEqual(expected.errors || [])
    expect(actual.taskIdAndType).toBe(expected.taskIdAndType)
    expect(actual.taskId).toBe(expected.taskId)
    expect(actual.projectKey).toBe(expected.projectKey)
    expect(actual.taskNumber).toBe(expected.taskNumber)
    expect(actual.type).toBe(expected.type)
  })
}
