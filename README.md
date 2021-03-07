# Commitlint Jira Type

[![Continuous Integration](https://github.com/dwmt/commitlint-jira-type/actions/workflows/continuous-integration.yml/badge.svg)](https://github.com/dwmt/commitlint-jira-type/actions/workflows/continuous-integration.yml)
[![npm](https://img.shields.io/npm/v/commitlint-plugin-jira-type)](https://www.npmjs.com/package/commitlint-plugin-jira-type)
[![LICENSE](https://img.shields.io/github/license/dwmt/commitlint-jira-type)](LICENSE)

Check if your commit messages start with a JIRA ticket identifier and a type.

Accepts commit messages like:

~~~~
PROJECT-1/feat: implemented a new message handler
KEY-729/fix: removed erroneous handling of a key
~~~~

## Getting Started

If you want to lint your commits with jira-type, follow along:

  1. Install Commitlint, Husky and the jira-type dependencies
     ~~~~
     npm i @commitlint/cli husky commitlint-plugin-jira-type commitlint-config-jira-type -D
     ~~~~
  1. Configure [commitlint](https://github.com/conventional-changelog/commitlint)
     ~~~~JavaScript
     // commitlint.config.js
     module.exports = {
       plugins: ['commitlint-plugin-jira-type'],
       extends: ['jira-type'],
     }
     ~~~~
  1. Setup [Husky](https://github.com/typicode/husky/): to lint commits before they are created you can use Husky's `commit-msg` hook
     ~~~~
     mkdir .husky
     npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
     ~~~~

You can find detailed instructions regarding the local setup of Commitlint and Husky at [Commitlint Local Setup](https://commitlint.js.org/#/guides-local-setup).

## Configurable Rules

jira-type offers the following configurable rules. By customizing these rules, you can define which messages should be accepted and rejected.

### jira-type-project-key-enum

An enumeration of accepted JIRA project keys. If the project key within the message is not included, then the message is rejected. By default, the value of this setting is `undefined`, which means that every key is accepted.

If you want to accept `PROJECTA` and `PROJECTB` only:

~~~~JavaScript
// commitlint.config.js
module.exports = {
  plugins: ['commitlint-plugin-jira-type'],
  extends: ['jira-type'],
  rules: {
     // 2 sets the level of this rule to error.
     // always means that this rule should be applied as is
     // (the other value is "never", which inverts the rule) 
     'jira-type-project-key-enum': [2, 'always', ['PROJECTA', 'PROJECTB']] 
  }
}
~~~~

### jira-type-type-enum

An enumeration of accepted types. If the type within the message is not included, then the message is rejected. By default, the value of this setting is `undefined`, which means that every type is accepted.

If you want to accept `feat` and `fix` only:

~~~~JavaScript
// commitlint.config.js
module.exports = {
  plugins: ['commitlint-plugin-jira-type'],
  extends: ['jira-type'],
  rules: {
     // 2 sets the level of this rule to error.
     // always means that this rule should be applied as is
     // (the other value is "never", which inverts the rule) 
     'jira-type-type-enum': [2, 'always', ['feat', 'fix']] 
  }
}
~~~~

## Packages

This is a monorepo containing the following packages:

  * [commitlint-common-jira-type](./commitlint-common-jira-type)
    * Definitions shared between the packages of the monorepo. For example rule names and rule default values.
  * [commitlint-config-jira-type](./commitlint-config-jira-type)
    * Default configuration for all the rules supported by jira-type.
  * [commitlint-plugin-jira-type](./commitlint-plugin-jira-type)
    * The actual rule implementations.
