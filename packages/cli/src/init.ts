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
  return `import { defineConfig } from '@codeowners-flow/cli/config';

  export default defineConfig({
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
  });`;
}
