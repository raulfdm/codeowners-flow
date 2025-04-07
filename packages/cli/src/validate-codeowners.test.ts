import { describe, expect, it, vi } from 'vitest';

import { validateCodeowners } from './validate-codeowners.ts';

const mockReadFile = vi.fn();
vi.mock('node:fs/promises', async () => {
  const actualModule = await vi.importActual('node:fs/promises');

  return {
    default: {
      // @ts-expect-error - default is there
      ...actualModule.default,
      readFile: (...args: any[]) => mockReadFile(...args),
    },
  };
});

describe('fn: validateCodeowners', () => {
  it('should exit process with status code 1', async () => {
    const mockFile = `# This file was generated automatically by codeowners-flow. Do not edit it manually.
    # Instead, modify the \`codeowners.config.mjs\` file located at the root of your project.

    # -------------------- START -------------------- #
    ## Matching patterns...
    app/package.json @company-team
    # -------------------- END -------------------- #
    `;
    mockReadFile.mockResolvedValue(mockFile);
    const exitSpy = vi.spyOn(process, 'exit');
    const consoleSpy = vi.spyOn(console, 'error');

    await validateCodeowners({
      config: 'packages/cli/src/__fixtures__/codeowners.config.mjs',
    });

    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(consoleSpy).toHaveBeenCalledWith(
      'CODEOWNERS file is not up to date or it was modified manually. Run `codeowners-flow generate` to update it.',
    );
    exitSpy.mockRestore();
    consoleSpy.mockRestore();
  });

  it('should exit process with status code 0 if CODEOWNERS file is up to date', async () => {
    const mockFile = `# This file was generated automatically by codeowners-flow. Do not edit it manually.
    # Instead, modify the \`codeowners.config.mjs\` file located at the root of your project.

    # -------------------- START -------------------- #
    ## Matching patterns...
    * @company-team
    # -------------------- END -------------------- #`;

    mockReadFile.mockResolvedValue(mockFile);
    const exitSpy = vi.spyOn(process, 'exit');
    const consoleSpy = vi.spyOn(console, 'log');

    await validateCodeowners({
      config: 'packages/cli/src/__fixtures__/codeowners.config.mjs',
    });

    expect(exitSpy).toHaveBeenCalledWith(0);
    expect(consoleSpy).toHaveBeenCalledWith('CODEOWNERS file is up to date.');
    exitSpy.mockRestore();
    consoleSpy.mockRestore();
  });
});
