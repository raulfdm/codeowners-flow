import { defineConfig, defineRule, defineOwner } from "@codeowners-js/config";

const mainTeams = [
  defineOwner({
    name: "@company/core-team",
  }),
  defineOwner({
    name: "@company/infra-team",
  }),
];

/** @type  */
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
