import fs from 'node:fs/promises';

import dedent from 'dedent';

import { getCodeOwners } from './generate-codeowners.ts';

interface ValidateCodeOwnersOptions {
  config?: string;
}

export async function validateCodeowners({
  config,
}: ValidateCodeOwnersOptions = {}) {
  const { ownersPath, ownersContent } = await getCodeOwners(config);
  try {
    const file = await fs.readFile(ownersPath);
    const content = file.toString();

    const isSame = dedent(content) === ownersContent.trim();

    if (isSame === false) {
      console.error(
        'CODEOWNERS file is not up to date or it was modified manually. Run `codeowners-flow generate` to update it.',
      );
      process.exit(1);
    } else {
      console.log('CODEOWNERS file is up to date.');
      process.exit(0);
    }
  } catch (error) {
    console.error('Error reading codeowners file:', error);
  }
}
