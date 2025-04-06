# @codeowners-flow/cli

## About

`@codeowners-flow/cli` lets you manage your `CODEOWNERS` file programmatically.

Instead of directly creating and maintaining the `CODEOWNERS` markup file, with `@codeowners-flow/cli` you can define your code owners rules in JavaScript, and based on that, generate the `CODEOWNERS` file for you.

> **Note**
> To learn more about CODEOWNERS, please refer to the [Github official documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners).

To understand the motivations behind this project, refer to the [root repository README](https://github.com/raulfdm/codeowners-manager/blob/main/README.md).

## Prerequisite

- Node 22 or later
- pnpm, yarn, or npm

## Usage

```
Usage
$ codeowners-flow generate
$ codeowners-flow generate --config /path/to/config.mjs
$ codeowners-flow init

Example
  $ codeowners-flow generate

    CODEOWNERS file generated! 🎉
    You can find it at: "/path/to/CODEOWNERS".
```

## Getting started

The first step is to install `codeowners-flow` in your project:

> **Important**
> If you're using a monorepo, every step should be executed at the root level.

```bash
# or npm/yarn
pnpm add codeowners-flow
```

Next, run the init command:

```bash
pnpm codeowners-flow init # or npx codeowners-flow init
```

This command will create a file in the folder you're named `codeowners.config.mjs`. This config file is where you're gonna define your code owners shape.

After that, you can run the CLI:

```bash
pnpm codeowners-flow generate # or npx codeowners-flow generate
```

The CLI will read your configuration and generate a `CODEOWNERS` file in the specified `outDir`:

**.github/CODEOWNERS**

```
# This file was generated automatically by codeowners-flow. Do not edit it manually.
# Instead, modify the `codeowners.config.mjs` file located at the root of your project.

# -------------------- START -------------------- #
## Matching patterns...
* @company/team
# -------------------- END -------------------- #
```

### Using helpers to define config

To ease the configuration, we expose some helpers to give you type inference on the fields you need to define:

```js
import {
  defineConfig,
  defineOwner,
  defineRule,
} from '@codeowners-flow/cli/config';

export default defineConfig({
  outDir: '.github',
  rules: [
    defineRule({
      patterns: ['*'],
      owners: [
        defineOwner({
          name: '@company/team',
        }),
      ],
    }),
  ],
});
```

## Config API

### outDir

Type: `string`

The relative path where the `CODEOWNERS`` file should be generated.

### rules

Type: `Rule[]`

A list of code owner rules.

### Rule

Type: `object`

#### owners

Type: `Owner[]`

##### Owner

Type: `object`

###### name

Type: `string`

The name of an owner (e.g., `@company/some-team`).

##### patterns

Type: `string[]`

An array of code owner patterns. [See the official syntax for more details](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners#codeowners-syntax).

##### excludePatterns

Type: `string[] | undefined`\
Default: `undefined`

A list of patterns to exclude.

```
# In this example, @octocat owns any file in the `/apps`
# directory in the root of your repository except for the `/apps/github`
# subdirectory, as its owners are left empty.
/apps/ @octocat
/apps/github # <- exclude pattern
```

#### comments

Type: `string[] | undefined`\
Default: `undefined`

Comments that will be placed above the matching rule. These can be useful to add descriptive information for each rule.
