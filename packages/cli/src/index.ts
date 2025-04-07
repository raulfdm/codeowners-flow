import meow from 'meow';

import { generateCodeOwners } from './generate-codeowners.js';
import { initProject } from './init.js';
import { validateCodeowners } from './validate-codeowners.ts';

const cli = meow(
  `
  Usage
  $ codeowners-flow generate
  $ codeowners-flow generate --config /path/to/config.mjs
  $ codeowners-flow validate
  $ codeowners-flow init

  Example
    $ codeowners-flow generate

      CODEOWNERS file generated! 🎉
      You can find it at: "/path/to/CODEOWNERS".
`,
  {
    importMeta: import.meta,
    flags: {
      config: {
        type: 'string',
        shortFlag: 'c',
      },
    },
  },
);

const [command] = cli.input;

switch (command) {
  case 'validate': {
    validateCodeowners(cli.flags).then(console.log).catch(console.error);
    break;
  }
  case 'generate': {
    generateCodeOwners(cli.flags)
      .then(({ ownersPath }) => {
        console.log('Codeowners file generated! 🎉');
        console.log(`You can find it at: "${ownersPath}".\n`);
      })
      .catch((error) => {
        console.error('Error generating CODEOWNERS file:', error);
        process.exit(1);
      });
    break;
  }
  case 'init': {
    initProject()
      .then(() => {
        console.log('Configuration file created! 🎉');
      })
      .catch((error) => {
        console.error('Error initializing project:', error);
        process.exit(1);
      });
    break;
  }
  default: {
    cli.showHelp();
  }
}
