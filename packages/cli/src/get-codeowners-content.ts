import type { UserConfig } from "@codeowners-js/config";

export function getCodeOwnersContent(userConfig: UserConfig) {
  const content = [
    "# This file was generated automatically by codeowners-js. Do not edit it manually.",
    "# Instead, change the `codeowners.config.mjs` file in the root of your project.\n",
  ];

  for (const rule of userConfig.rules) {
    const partialConfig: string[] = [getSectionDivider("START")];

    const ownersString = rule.owners.map((owner) => owner.name).join(" ");

    if (rule.comments) {
      partialConfig.push(...rule.comments.map((comment) => `# ${comment}`));
    }

    partialConfig.push("## Matching patterns...");

    for (const pattern of rule.patterns) {
      partialConfig.push(`${pattern} ${ownersString}`);
    }

    if (rule.excludePatterns) {
      partialConfig.push("## Except...");

      for (const excludePattern of rule.excludePatterns) {
        partialConfig.push(excludePattern);
      }
    }

    partialConfig.push(getSectionDivider("END") + "\n");

    content.push(...partialConfig);
  }

  return content.join("\n");
}

function getSectionDivider(heading: string): string {
  return `# -------------------- ${heading} -------------------- #`;
}
