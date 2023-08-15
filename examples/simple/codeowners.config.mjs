/** @type {import('@codeowners-flow/cli/config').UserConfig} */
export default {
  outDir: '.github',
  _meta: {
    defaultOwner: {
      name: '@company/core-infra',
    },
  },
  rules: [
    {
      /**
       * Some comments
       */
      patterns: ['*'],
      owners: [{ name: '@company/core-team' }],
    },
  ],
};
