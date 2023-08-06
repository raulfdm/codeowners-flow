const mainTeams = ["@company/core-team", "@company/infra-team"];

/** @type {import('./dist/src/config.d.ts').UserConfig} */
export default {
  outDir: ".github",
  rules: [
    {
      match: "*",
      owners: mainTeams,
      comments: [
        "Everything else will be fallback to @company/core-team to approve",
      ],
    },
    {
      match: "apps/website-frontend",
      excludeMatch: ["apps/website-frontend/github"],
      owners: ["@company/website-team", ...mainTeams],
    },
  ],
};
