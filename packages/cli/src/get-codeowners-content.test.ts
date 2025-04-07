import type { UserConfig } from './config/index.js';
import { getCodeOwnersContent } from './get-codeowners-content.js';

describe('getCodeOwnersContent', () => {
  it('generates basic content', () => {
    const mockUserConfig: UserConfig = {
      outDir: './test',
      rules: [
        {
          owners: [
            {
              name: '@team/core',
            },
          ],
          patterns: ['packages/core/**/*'],
        },
      ],
    };

    expect(getCodeOwnersContent(mockUserConfig)).toMatchInlineSnapshot(`
      "# This file was generated automatically by codeowners-flow. Do not edit it manually.
      # Instead, modify the \`codeowners.config.mjs\` file located at the root of your project.

      # -------------------- START -------------------- #
      ## Matching patterns...
      packages/core/**/* @team/core
      # -------------------- END -------------------- #"
    `);
  });

  it('includes multiple patterns', () => {
    const mockUserConfig: UserConfig = {
      outDir: './test',
      rules: [
        {
          owners: [
            {
              name: '@team/core',
            },
          ],
          patterns: [
            'packages/core',
            'pnpm-workspace.yaml',
            '.github/workflows',
          ],
        },
      ],
    };

    expect(getCodeOwnersContent(mockUserConfig)).toMatchInlineSnapshot(`
      "# This file was generated automatically by codeowners-flow. Do not edit it manually.
      # Instead, modify the \`codeowners.config.mjs\` file located at the root of your project.

      # -------------------- START -------------------- #
      ## Matching patterns...
      packages/core @team/core
      pnpm-workspace.yaml @team/core
      .github/workflows @team/core
      # -------------------- END -------------------- #"
    `);
  });

  it('includes the comments sent', () => {
    const mockUserConfig: UserConfig = {
      outDir: './test',
      rules: [
        {
          owners: [
            {
              name: '@team/core',
            },
          ],
          patterns: ['packages/core/**/*'],
          comments: ['This is a comment', 'This is another comment'],
        },
      ],
    };

    expect(getCodeOwnersContent(mockUserConfig)).toMatchInlineSnapshot(`
      "# This file was generated automatically by codeowners-flow. Do not edit it manually.
      # Instead, modify the \`codeowners.config.mjs\` file located at the root of your project.

      # -------------------- START -------------------- #
      # This is a comment
      # This is another comment
      ## Matching patterns...
      packages/core/**/* @team/core
      # -------------------- END -------------------- #"
    `);
  });

  it('includes the exclude patterns', () => {
    const mockUserConfig: UserConfig = {
      outDir: './test',
      rules: [
        {
          owners: [
            {
              name: '@team/core',
            },
          ],
          patterns: ['packages/core/**/*'],
          excludePatterns: ['packages/core/**/test'],
        },
      ],
    };

    expect(getCodeOwnersContent(mockUserConfig)).toMatchInlineSnapshot(`
      "# This file was generated automatically by codeowners-flow. Do not edit it manually.
      # Instead, modify the \`codeowners.config.mjs\` file located at the root of your project.

      # -------------------- START -------------------- #
      ## Matching patterns...
      packages/core/**/* @team/core
      ## Except...
      packages/core/**/test
      # -------------------- END -------------------- #"
    `);
  });

  it('includes multiple exclude patterns', () => {
    const mockUserConfig: UserConfig = {
      outDir: './test',
      rules: [
        {
          owners: [
            {
              name: '@team/core',
            },
          ],
          patterns: ['packages/core/**/*'],
          excludePatterns: ['packages/core/**/test', 'packages/core/**/mock'],
        },
      ],
    };

    expect(getCodeOwnersContent(mockUserConfig)).toMatchInlineSnapshot(`
      "# This file was generated automatically by codeowners-flow. Do not edit it manually.
      # Instead, modify the \`codeowners.config.mjs\` file located at the root of your project.

      # -------------------- START -------------------- #
      ## Matching patterns...
      packages/core/**/* @team/core
      ## Except...
      packages/core/**/test
      packages/core/**/mock
      # -------------------- END -------------------- #"
    `);
  });
});
