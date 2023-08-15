import fs from 'node:fs';
import path from 'node:path';

import { findRoot } from '@manypkg/find-root';

import { loadConfig, type UserConfig } from './config/index.js';
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
  const { rootDir } = await findRoot(process.cwd());

  const loadedConfig = await loadConfig(rootDir, config);

  const ownersContent = getCodeOwnersContent(loadedConfig);
  const ownersPath = await getCodeOwnersPath(loadedConfig, rootDir);

  writeCodeOwnersFile(ownersPath, ownersContent);

  return {
    ownersContent,
    ownersPath,
  };
}

function writeCodeOwnersFile(path: string, content: string): void {
  fs.writeFileSync(path, content, 'utf-8');
}

async function getCodeOwnersPath(
  userConfig: UserConfig,
  rootPath: string,
): Promise<string> {
  return path.join(rootPath, userConfig.outDir, 'CODEOWNERS');
}
