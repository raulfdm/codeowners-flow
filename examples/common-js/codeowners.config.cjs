/** @type {import('@codeowners-flow/cli/config').UserConfig} */
module.exports = {
  outDir: '.github',
  rules: [
    {
      patterns: ['*'],
      owners: [{ name: '@company/core-team' }],
    },
  ],
};
