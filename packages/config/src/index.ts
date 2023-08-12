import { cosmiconfig } from "cosmiconfig";
import { fromZodError } from "zod-validation-error";
import {
  UserConfigSchema,
  defineConfig,
  defineOwner,
  defineRule,
  type UserConfig,
} from "./schema.js";
import { ZodError } from "zod";

const explorer = cosmiconfig("codeowners");

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
    console.log("\n");
    process.exit(1);
  }
}

export { UserConfig, defineConfig, defineOwner, defineRule };
