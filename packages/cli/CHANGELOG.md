# @codeowners-flow/cli

## 0.1.2

### Patch Changes

- d7f925b: publish dist folder

## 0.1.1

### Patch Changes

- ed1a92e: move `meow` to dependency instead devDependency

## 0.1.0

### Minor Changes

- 10dc06f: add new "init" command
- 9832e37: Accept configuration path to generate CODEOWNERS

  Now, users can point where the config file is located:

  ```bash
  npx codeowners-flow generate -c ./path/to/config
  ```

### Patch Changes

- ce2341b: Wrap CLI with cli helper
