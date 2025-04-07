import fs from 'node:fs/promises';
import path from 'node:path';

import { findRoot } from '@manypkg/find-root';

import { loadUserConfig, type UserConfig } from './config/index.js';
import { getCodeOwnersContent } from './get-codeowners-content.js';

type GenerateCodeOwnersOptions = {
  config?: string;
};

export async function generateCodeOwners({
  config,
}: GenerateCodeOwnersOptions = {}): Promise<{
  ownersContent: string;
  ownersPath: string;
}> {
  const codeOwners = await getCodeOwners(config);
  await writeCodeOwnersFile(codeOwners.ownersPath, codeOwners.ownersContent);

  return codeOwners;
}

export async function getCodeOwners(config?: string) {
  const { rootDir } = await findRoot(process.cwd());

  const userConfig = await loadUserConfig(rootDir, config);

  const ownersContent = getCodeOwnersContent(userConfig);
  const ownersPath = await getCodeOwnersPath(userConfig, rootDir);

  return {
    ownersContent,
    ownersPath,
  };
}

function writeCodeOwnersFile(path: string, content: string): Promise<void> {
  return fs.writeFile(path, content, 'utf-8');
}

function getCodeOwnersPath(
  userConfig: UserConfig,
  rootPath: string,
): Promise<string> {
  return Promise.resolve(path.join(rootPath, userConfig.outDir, 'CODEOWNERS'));
}
