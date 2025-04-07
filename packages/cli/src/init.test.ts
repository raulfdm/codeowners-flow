import { initProject } from './init.js';

const mockExistsSync = vi.fn();
const mockWriteFileSync = vi.fn();
vi.mock('node:fs', () => ({
  default: {
    existsSync: (...args: any) => mockExistsSync(...args),
    writeFileSync: (...args: any) => mockWriteFileSync(...args),
  },
}));

describe('fn: initProject', () => {
  it('throws an error if config file already exists', async () => {
    mockExistsSync.mockReturnValue(true);
    await expect(initProject()).rejects.toThrowError(
      'Configuration file already exists.',
    );
  });

  it('writes the config file correctly', async () => {
    const spyCwd = vi.spyOn(process, 'cwd');

    spyCwd.mockReturnValue('/path/to');

    mockExistsSync.mockReturnValue(false);
    await initProject();

    const [path, content] = mockWriteFileSync.mock.calls[0];

    expect(path).toMatchInlineSnapshot('"/path/to/codeowners.config.mjs"');
    expect(content).toMatchInlineSnapshot(`
      "import { defineConfig } from '@codeowners-flow/cli/config';

        export default defineConfig({
          outDir: '.github',
          rules: [
            {
              patterns: ['*'],
              owners: [
                {
                  name: '@company-team',
                },
              ],
            },
          ],
        });"
    `);
  });
});
