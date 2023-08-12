import { z } from "zod";

const OwnerSchema = z.object({
  name: z.string(),
});

type Owner = z.infer<typeof OwnerSchema>;

export function defineOwner(owner: Owner) {
  return owner;
}

const RuleSchema = z.object({
  patterns: z.array(z.string()),
  excludePatterns: z.array(z.string()).optional(),
  owners: z.array(OwnerSchema),
  comments: z.array(z.string()).optional(),
});

type Rule = z.infer<typeof RuleSchema>;

export function defineRule(rule: Rule) {
  return rule;
}

export const UserConfigSchema = z.object({
  outDir: z.string(),
  rules: z.array(RuleSchema),
});

export type UserConfig = z.infer<typeof UserConfigSchema>;

export function defineConfig(config: UserConfig) {
  return config;
}
