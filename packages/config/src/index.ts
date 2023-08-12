import { cosmiconfig } from "cosmiconfig";
import {
  UserConfigSchema,
  defineConfig,
  defineOwner,
  defineRule,
  type UserConfig,
} from "./schema.js";

const explorer = cosmiconfig("codeowners");

export async function loadConfig() {
  const config = await explorer.search();

  return UserConfigSchema.parse(config?.config ?? {});
}

export { UserConfig, defineConfig, defineOwner, defineRule };
