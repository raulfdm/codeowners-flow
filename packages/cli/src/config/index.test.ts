import { loadUserConfig, type UserConfig } from './index.js';

const mockConfig: UserConfig = {
  outDir: 'outDir',
  rules: [
    {
      owners: [
        {
          name: 'ownerName',
        },
      ],
      patterns: ['*'],
      comments: ['comment'],
      excludePatterns: ['excludePatterns'],
    },
  ],
};

const mockExploderLoad = vi.fn().mockResolvedValue({ config: mockConfig });
const mockExplorerSearch = vi.fn().mockResolvedValue({ config: mockConfig });
vi.mock('cosmiconfig', () => ({
  cosmiconfig: () => {
    return {
      load: (...args: any) => mockExploderLoad(...args),
      search: (...args: any) => mockExplorerSearch(...args),
    };
  },
}));

describe('fn: loadUserConfig', () => {
  it('searches for config if no configRelativePath is sent', async () => {
    await loadUserConfig('rootDir');
    expect(mockExplorerSearch).toHaveBeenCalled();
  });

  it('loads the config sent', async () => {
    await loadUserConfig('rootDir', 'configRelativePath');
    expect(mockExploderLoad).toHaveBeenCalledWith(
      expect.stringContaining('configRelativePath'),
    );
  });

  it('returns the parsed configuration', async () => {
    const config = await loadUserConfig('rootDir', 'configRelativePath');
    expect(config).toEqual(mockConfig);
  });

  describe('error handling', () => {
    it('throws an user-friendly error message about the schema', async () => {
      const customConfig: Partial<UserConfig> = {
        rules: [],
      };

      mockExplorerSearch.mockResolvedValue({ config: customConfig });

      try {
        await loadUserConfig('rootDir');
      } catch (error) {
        expect((error as Error).message).toMatchInlineSnapshot(
          '"Validation error: Required at \\"outDir\\""',
        );
      }
    });

    it('throws an user-friendly error message if config file is not found', async () => {
      mockExploderLoad.mockRejectedValue(
        new Error('no such file or directory'),
      );

      try {
        await loadUserConfig('rootDir', 'configRelativePath');
      } catch (error) {
        expect((error as Error).message).toMatchInlineSnapshot(
          '"Config file not found. Please ensure to point a valid config file path or create a new one with the init command."',
        );
      }
    });
  });
});
