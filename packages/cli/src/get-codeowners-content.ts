import dedent from 'dedent';

import type { UserConfig } from './config/index.js';

export function getCodeOwnersContent(userConfig: UserConfig) {
  const content = [
    '# This file was generated automatically by codeowners-flow. Do not edit it manually.',
    '# Instead, modify the `codeowners.config.mjs` file located at the root of your project.\n',
  ];

  for (const rule of userConfig.rules) {
    const partialConfig: string[] = [getSectionDivider('START')];

    const ownersString = rule.owners.map((owner) => owner.name).join(' ');

    if (rule.comments) {
      partialConfig.push(...rule.comments.map((comment) => `# ${comment}`));
    }

    partialConfig.push('## Matching patterns...');

    for (const pattern of rule.patterns) {
      partialConfig.push(`${pattern} ${ownersString}`);
    }

    if (rule.excludePatterns) {
      partialConfig.push('## Except...');

      for (const excludePattern of rule.excludePatterns) {
        partialConfig.push(excludePattern);
      }
    }

    partialConfig.push(getSectionDivider('END') + '\n');

    content.push(...partialConfig);
  }

  return dedent(content.join('\n'));
}

function getSectionDivider(heading: string): string {
  return `# -------------------- ${heading} -------------------- #`;
}
