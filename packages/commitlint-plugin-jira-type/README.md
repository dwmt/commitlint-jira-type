# Commitlint Jira Type | Plugin

Commitlint plugin to check if your commit messages start with a a JIRA ticket identifier and a type.

Accepts commit messages like:

~~~~
PROJECT-1/feat: implemented a new message handler
KEY-729/fix: removed erroneous handling of a key
~~~~

## Getting Started

If you want to lint your commits with jira-type, follow along:

  1. Install the jira-type dependencies
     ~~~~
     npm i commitlint-plugin-jira-type commitlint-config-jira-type -D
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
     ~~~~JSON
     npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
     ~~~~

You can find detailed instructions regarding the local setup of Commitlint and Husky at [Commitlint Local Setup](https://commitlint.js.org/#/guides-local-setup).

## Further Information

Please see the [README of the parent monorepo](https://github.com/dwmt/commitlint-jira-type/blob/master/README.md).
