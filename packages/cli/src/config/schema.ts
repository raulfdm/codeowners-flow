import { z } from 'zod';

const OwnerSchema = z.object({
  name: z.string(),
});

export type Owner = z.infer<typeof OwnerSchema>;

export function defineOwner(owner: Owner) {
  return owner;
}

const RuleSchema = z.object({
  patterns: z.array(z.string()),
  excludePatterns: z.array(z.string()).optional(),
  owners: z.array(OwnerSchema),
  comments: z.array(z.string()).optional(),
});

export type Rule = z.infer<typeof RuleSchema>;

export function defineRule(rule: Rule) {
  return rule;
}

export const UserConfigSchema = z.object({
  outDir: z.string(),
  rules: z.array(RuleSchema),
  _meta: z.record(z.string(), z.unknown()).optional().default({}),
});

export type UserConfig = z.infer<typeof UserConfigSchema>;

export function defineConfig(config: UserConfig) {
  return config;
}
