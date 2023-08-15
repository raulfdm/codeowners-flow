import path from 'node:path';

import { cosmiconfig } from 'cosmiconfig';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

import {
  defineConfig,
  defineOwner,
  defineRule,
  type UserConfig,
  UserConfigSchema,
} from './schema.js';

const explorer = cosmiconfig('codeowners');

export async function loadUserConfig(
  rootDir: string,
  configRelativePath?: string,
) {
  try {
    const result = configRelativePath
      ? await explorer.load(path.resolve(rootDir, configRelativePath))
      : await explorer.search();

    return UserConfigSchema.parse(result?.config ?? {});
  } catch (error: unknown) {
    let message = 'An unexpected error occurred.';

    if (error instanceof ZodError) {
      const validationError = fromZodError(error as ZodError);
      message = validationError.message;
    } else if (error instanceof Error) {
      if (error.message.includes('no such file or directory')) {
        message =
          'Config file not found. Please ensure to point a valid config file path or create a new one with the init command.';
      } else {
        message = error.message;
      }
    }

    throw new Error(message);
  }
}

export type { UserConfig };

export { defineConfig, defineOwner, defineRule };
