import { defineOwner, defineRule, type Owner } from './src/config/schema.js';
import { updateUserConfig } from './src/config/update-config.js';

await updateUserConfig((userConfig) => {
  return {
    outDir: '.gitlab',
    rules: [
      defineRule({
        patterns: ['docs/*'],
        owners: [
          defineOwner({
            name: '@gitlab-org/gitlab',
          }),
          (userConfig._meta as { defaultOwner: Owner }).defaultOwner,
        ],
      }),
      defineRule({
        patterns: ['modules/*'],
        owners: [
          defineOwner({
            name: '@gitlab-org/gitlab-2',
          }),
          (userConfig._meta as { defaultOwner: Owner }).defaultOwner,
        ],
      }),
    ],
  };
}, './examples/simple/codeowners.config.mjs');
