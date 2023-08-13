import { generateCodeOwners } from "./generate-codeowners.js";

generateCodeOwners()
  .then(({ ownersPath }) => {
    console.log("Codeowners file generated! 🎉");
    console.log(`You can find it at: "${ownersPath}".\n`);
  })
  .catch((error) => {
    console.error("Error generating CODEOWNERS file:", error);
    process.exit(1);
  });
