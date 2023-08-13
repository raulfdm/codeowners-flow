# CodeOwners JS
> Control your CODEOWNERS file programmatically

## About

CODEOWNERS is a strategy used by version platforms (e.g., Github, Azure, Gitlab, etc.) to define which parts of the repository belongs to which team. This is extremaly useful for notifying owners of a code in Pull Requests when something got change in this specific part.

The CODEOWNERS file has its own syntax, similar to markdown:

```
# This is a comment
* @company/core-team

# Another comment
apps/backend @company/backend-core
```

The issue starts when you have douzens of teams working in the same code base and want to apply a fine graned ownership among those teams.

Let's say you want to give a "default team ownership". For every rule you have, you'll need to assign the owner of that code specifically and the default team. It'll be something like this:

```
* @company/core-team

apps/backend @company/backend-core @company/core-team

apps/front-end @company/web-core @company/core-team

packages/analytics @company/data-analytics @company/core-team
```

In this example, for every CODEOWNER matching pattern, we needed to add manually the `@company/core-team`. Now, imagine if you now, 2 or more teams are meant to be the "default maintainers". You'd need to walkthrough in every single entry and add those new teams.

The main point here is: maintaining a large CODEOWNERS is tedious and cumbersome.

Wouldn't be cool if at least we could write a CODEOWNERS file in a progamatically file?

That's the goal of this tool. Allow teams writing a code owners instructions in javascript (very basic one) and generate the file to be consumed by the platforms.

## Usage

Please, reach out to the [CLI README](./packages/cli/README.md).

## Licence

MIT