const RULES = {
  projectKeyCase: 'jira-type-project-key-case',
  projectKeySeparator: 'jira-type-project-key-separator',
  projectKeyEnum: 'jira-type-project-key-enum',
  projectKeyAlphanumeric: 'jira-type-project-key-alphanumeric',

  taskNumberEmpty: 'jira-type-task-number-empty',
  taskNumberNumeric: 'jira-type-task-number-numeric',

  taskIdEmpty: 'jira-type-task-id-empty',

  typeCase: 'jira-type-type-empty',
  typeSeparator: 'jira-type-type-separator',
  typeEmpty: 'jira-type-type-empty',
  typeEnum: 'jira-type-type-enum',

  commitMessageSeparator: 'jira-type-commit-message-separator'
}

const VALUES = {
  lowercase: 'lowercase',
  uppercase: 'uppercase',
  any: 'any'
}

const DEFAULTS = {
  projectKeyCase: VALUES.uppercase,
  projectKeySeparator: '-',
  projectKeyEnum: undefined,

  typeCase: VALUES.lowercase,
  typeSeparator: '/',
  typeEnum: undefined,

  commitMessageSeparator: ':'
}

const LEVEL = {
  disabled: 0,
  warning: 1,
  error: 2
}

const APPLICABLE = {
  always: 'always',
  never: 'never'
}

module.exports = {
  RULES,
  VALUES,
  DEFAULTS,
  LEVEL,
  APPLICABLE
}
