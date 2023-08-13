import { defineConfig, defineRule, defineOwner } from '@codeowners-flow/config';

const mainTeams = [
  defineOwner({
    name: '@company/core-team',
  }),
  defineOwner({
    name: '@company/infra-team',
  }),
];

/** @type  */
export default defineConfig({
  outDir: '.github',
  rules: [
    defineRule({
      patterns: ['*'],
      owners: mainTeams,
      comments: [
        'Everything else will be fallback to @company/core-team to approve',
      ],
    }),
    defineRule({
      patterns: ['apps/website-frontend'],
      excludePatterns: ['apps/website-frontend/github'],
      owners: [
        defineOwner({
          name: '@company/website-team',
        }),
        ...mainTeams,
      ],
    }),
  ],
});
