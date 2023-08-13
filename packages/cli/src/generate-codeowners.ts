import fs from 'node:fs';
import path from 'node:path';

import { findRoot } from '@manypkg/find-root';

import { loadConfig, type UserConfig } from './config/index.js';
import { getCodeOwnersContent } from './get-codeowners-content.js';

export async function generateCodeOwners(): Promise<{
  ownersContent: string;
  ownersPath: string;
}> {
  const config = await loadConfig();

  const ownersContent = getCodeOwnersContent(config);
  const ownersPath = await getCodeOwnersPath(config);

  writeCodeOwnersFile(ownersPath, ownersContent);

  return {
    ownersContent,
    ownersPath,
  };
}

function writeCodeOwnersFile(path: string, content: string): void {
  fs.writeFileSync(path, content, 'utf-8');
}

async function getCodeOwnersPath(userConfig: UserConfig): Promise<string> {
  const root = await findRoot(process.cwd());
  return path.join(root.rootDir, userConfig.outDir, 'CODEOWNERS');
}
