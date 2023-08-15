/** @type {import('@codeowners-flow/cli/config').UserConfig} */
export default {
  outDir: '.github',
  rules: [
    {
      patterns: ['*'],
      owners: [{ name: '@company/core-team' }],
    },
  ],
};
