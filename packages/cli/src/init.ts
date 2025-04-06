import fs from 'node:fs';
import path from 'node:path';

// eslint-disable-next-line @typescript-eslint/require-await
export async function initProject() {
  const content = getConfigTemplate();

  const configPath = path.resolve(process.cwd(), 'codeowners.config.mjs');
  const exists = fs.existsSync(configPath);

  if (exists) {
    throw new Error('Configuration file already exists.');
  }

  fs.writeFileSync(configPath, content);
}

function getConfigTemplate() {
  return `/** @type {import('@codeowners-flow/cli/config').UserConfig} */
export default {
  outDir: '.github',
  rules: [
    {
      patterns: ['*'],
      owners: [
        {
          name: '@company-team',
        },
      ],
    },
  ],
};`;
}
