// import fs from 'node:fs';
import path from 'node:path';
import * as url from 'node:url';

import { findRoot } from '@manypkg/find-root';
import { run as jscodeshift } from 'jscodeshift/src/Runner';

import { loadUserConfig } from './load-user-config.js';
import type { UserConfig } from './schema.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

type UpdateUserConfigCallback = (config: UserConfig) => Partial<UserConfig>;

export async function updateUserConfig(
  updateConfigCb: UpdateUserConfigCallback,
  configRelativePath?: string,
) {
  const { rootDir } = await findRoot(process.cwd());

  const { configPath, userConfig } = await loadUserConfig(
    rootDir,
    configRelativePath,
  );

  // console.log(JSON.stringify(userConfig));
  const updatedConfig = updateConfigCb(userConfig);
  // const content = fs.readFileSync(configPath, 'utf8');
  const transformPath = path.resolve(__dirname, './transform.ts');
  console.log(
    await jscodeshift(transformPath, [configPath], {
      // dry: true,
      print: true,
      verbose: 1,
      updatedConfig,
      // ...
    }),
  );
}
