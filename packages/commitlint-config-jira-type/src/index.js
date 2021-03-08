const { RULES, DEFAULTS, LEVEL, APPLICABLE } = require('@dwmt/commitlint-common-jira-type')

module.exports = {
  rules: {
    [RULES.projectKeyCase]: [LEVEL.error, APPLICABLE.always, DEFAULTS.projectKeyCase],
    [RULES.projectKeySeparator]: [LEVEL.error, APPLICABLE.always, DEFAULTS.projectKeySeparator],
    [RULES.projectKeyEnum]: [LEVEL.error, APPLICABLE.always, DEFAULTS.projectKeyEnum],
    [RULES.projectKeyAlphanumeric]: [LEVEL.error, APPLICABLE.always],

    [RULES.taskNumberNumeric]: [LEVEL.error, APPLICABLE.always],

    [RULES.taskIdEmpty]: [LEVEL.error, APPLICABLE.always],

    [RULES.taskIdAndTypeEmpty]: [LEVEL.error, APPLICABLE.always],

    [RULES.typeCase]: [LEVEL.error, APPLICABLE.always, DEFAULTS.typeCase],
    [RULES.typeSeparator]: [LEVEL.error, APPLICABLE.always, DEFAULTS.typeSeparator],
    [RULES.typeEmpty]: [LEVEL.error, APPLICABLE.always],
    [RULES.typeEnum]: [LEVEL.error, APPLICABLE.always, DEFAULTS.typeEnum],

    [RULES.commitMessageSeparator]: [LEVEL.error, APPLICABLE.always, DEFAULTS.commitMessageSeparator],

    [RULES.messageEmpty]: [LEVEL.error, APPLICABLE.always]
  }
}
