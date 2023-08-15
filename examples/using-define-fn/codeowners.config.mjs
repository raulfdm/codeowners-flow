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
      owners: [defineOwner({ name: '@company/core-team' })],
    }),
  ],
});
