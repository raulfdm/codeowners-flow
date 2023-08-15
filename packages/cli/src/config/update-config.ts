import fs from 'node:fs';

import babelGenerator from '@babel/generator';
import babelParser from '@babel/parser';
import type {
  ArrayExpression,
  ObjectExpression,
  ObjectProperty,
  StringLiteral,
  VariableDeclaration,
} from '@babel/types';
import { findRoot } from '@manypkg/find-root';
import { format } from 'prettier';

import { loadUserConfig } from './load-user-config.js';
import type { UserConfig } from './schema.js';

type UpdateUserConfigCallback = (config: UserConfig) => Partial<UserConfig>;

export async function updateUserConfig(
  updateConfigCb: UpdateUserConfigCallback,
  configRelativePath?: string,
) {
  const { rootDir } = await findRoot(process.cwd());

  const { configPath, userConfig } = await loadUserConfig(
    rootDir,
    configRelativePath,
  );

  // console.log(JSON.stringify(userConfig));
  const updatedConfig = updateConfigCb(userConfig);
  const content = fs.readFileSync(configPath, 'utf8');

  const a = babelParser.parse(content, {
    sourceType: 'module',
  });

  const [program] = a.program.body;

  if (program.type === 'ExportDefaultDeclaration') {
    if (program.declaration.type === 'ObjectExpression') {
      if (updatedConfig.outDir) {
        const outDirNode = program.declaration.properties.find(
          (p) =>
            p.type === 'ObjectProperty' &&
            p.key.type === 'Identifier' &&
            p.key.name === 'outDir',
        ) as ObjectProperty | undefined;

        if (!outDirNode) {
          throw new Error('Could not find "outDir" node');
        }

        (outDirNode.value as StringLiteral).value = updatedConfig.outDir;
      }

      if (updatedConfig.rules) {
        const rulesNode = program.declaration.properties.find(
          (p) =>
            p.type === 'ObjectProperty' &&
            p.key.type === 'Identifier' &&
            p.key.name === 'rules',
        ) as ObjectProperty | undefined;

        if (!rulesNode) {
          throw new Error('Could not find "rules" node');
        }

        const b = (rulesNode.value as ArrayExpression)
          .elements[0] as ObjectExpression;

        /**
         * For now, I'm not going to support adding those with helpers. This would demand
         * some extra logic.
         */
        const rulesProperties = getRulesASTProperties(updatedConfig.rules);

        b.properties.push(...rulesProperties);
      }
    }
  }

  const updatedCode = babelGenerator.default(a).code;
  // console.log(updatedCode);
  console.log(await format(updatedCode, { parser: 'babel' }));

  // const fullPath = path.resolve(rootDir, configRelativePath);

  // const updatedConfig = callback(userConfig);

  // writeFileSync(configPath, JSON.stringify(updatedConfig, null, 2));
}

function getRulesASTProperties(rules: UserConfig['rules']): ObjectProperty[] {
  const rulesString = `const rules = ${JSON.stringify(rules, null, 2)}`;

  const newRule = babelParser.parse(rulesString, {}).program
    .body[0] as VariableDeclaration;

  const [astRules] = newRule.declarations;

  const elements = (astRules.init as ArrayExpression)
    .elements as ObjectExpression[];

  const properties = elements
    .map((e) => e.properties)
    .flat() as ObjectProperty[];
  // console.log(elements[0].properties);

  // console.log(babelGenerator.default(newRule).code);

  // return elements;
  return properties;
}
