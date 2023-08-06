import { z } from "zod";

const OwnersSchema = z.object({
  pattern: z.string(),
  excludePatterns: z.array(z.string()).optional(),
  owners: z.array(z.string()),
  comments: z.array(z.string()).optional(),
});

export const UserConfigSchema = z.object({
  outDir: z.string(),
  rules: z.array(OwnersSchema.required()),
});

export type UserConfig = z.infer<typeof UserConfigSchema>;
