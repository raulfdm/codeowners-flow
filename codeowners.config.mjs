import {
  defineConfig,
  defineRule,
  defineOwner,
} from "codeowners-manager/config";

const mainTeams = [
  defineOwner({
    name: "@company/core-team",
  }),
  defineOwner({
    name: "@company/infra-team",
  }),
];

export default defineConfig({
  outDir: ".github",
  rules: [
    defineRule({
      match: "*",
      owners: mainTeams,
      comments: [
        "Everything else will be fallback to @company/core-team to approve",
      ],
    }),
    defineRule({
      match: "apps/website-frontend",
      excludeMatch: ["apps/website-frontend/github"],
      owners: [
        defineOwner({
          name: "@company/website-team",
        }),
        ...mainTeams,
      ],
    }),
  ],
});
