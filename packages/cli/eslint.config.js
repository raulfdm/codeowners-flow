import config from '@codeowners-flow/eslint';

export default [
  ...config,
  {
    ignores: ['src/__fixtures__/codeowners.config.mjs'],
  },
];
