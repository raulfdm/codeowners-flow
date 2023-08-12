import { loadConfig } from "@codeowners-js/config";

async function main() {
  const config = await loadConfig();

  console.log(config);
}

main();
