import type { UserConfig } from './config/index.js';
import { generateCodeOwners } from './generate-codeowners.js';

const mockLoadUserConfig = vi.fn();
vi.mock('./config/index.js', () => ({
  loadUserConfig: (...args: any) => mockLoadUserConfig(...args),
}));

const mockWriteFileSync = vi.fn();
vi.mock('node:fs', () => ({
  default: {
    writeFileSync: (...args: any) => mockWriteFileSync(...args),
  },
}));

const mockFindRoot = vi.fn();
vi.mock('@manypkg/find-root', () => ({
  findRoot: (...args: any) => mockFindRoot(...args),
}));

describe('fn: generateCodeOwners', () => {
  beforeEach(() => {
    mockLoadUserConfig.mockResolvedValue({
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
    } satisfies UserConfig);

    mockFindRoot.mockResolvedValue({
      rootDir: '/root',
    });
  });

  it('writes CODEOWNERS file in the expected location', async () => {
    await generateCodeOwners();

    const [location] = mockWriteFileSync.mock.calls[0];
    expect(location).toBe('/root/test/CODEOWNERS');
  });

  it('writes CODEOWNERS content', async () => {
    await generateCodeOwners();

    const [, content] = mockWriteFileSync.mock.calls[0];
    expect(content).toMatchInlineSnapshot(`
      "# This file was generated automatically by codeowners-flow. Do not edit it manually.
      # Instead, modify the \`codeowners.config.mjs\` file located at the root of your project.

      # -------------------- START -------------------- #
      ## Matching patterns...
      packages/core/**/* @team/core
      # -------------------- END -------------------- #
      "
    `);
  });

  it('returns codeowners path and content', async () => {
    const result = await generateCodeOwners();

    expect(result).toMatchInlineSnapshot(`
      {
        "ownersContent": "# This file was generated automatically by codeowners-flow. Do not edit it manually.
      # Instead, modify the \`codeowners.config.mjs\` file located at the root of your project.

      # -------------------- START -------------------- #
      ## Matching patterns...
      packages/core/**/* @team/core
      # -------------------- END -------------------- #
      ",
        "ownersPath": "/root/test/CODEOWNERS",
      }
    `);
  });

  it('calls load config with custom config path', async () => {
    await generateCodeOwners({ config: 'custom/path' });
    expect(mockLoadUserConfig).toHaveBeenCalledWith('/root', 'custom/path');
  });
});
