import { cosmiconfig } from 'cosmiconfig';
import type { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

import {
  defineConfig,
  defineOwner,
  defineRule,
  type UserConfig,
  UserConfigSchema,
} from './schema.js';

const explorer = cosmiconfig('codeowners');

export async function loadConfig() {
  const config = await explorer.search();

  try {
    return UserConfigSchema.parse(config?.config ?? {});
  } catch (error: unknown) {
    const validationError = fromZodError(error as ZodError);
    // the error now is readable by the user
    // you may print it to console
    // or return it via an API
    console.error(validationError.message);
    console.log('\n');
    process.exit(1);
  }
}

export type { UserConfig };
export { defineConfig, defineOwner, defineRule };
