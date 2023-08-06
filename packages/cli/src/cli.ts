import { cosmiconfig } from "cosmiconfig";

const explorer = cosmiconfig("codeowners");

async function loadConfig() {
  const config = await explorer.search();

  console.log(config?.config);
}

loadConfig();
