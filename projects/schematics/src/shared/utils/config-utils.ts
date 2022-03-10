import { Node, SourceFile } from 'ts-morph';
import { PROVIDE_CONFIG_FUNCTION } from '../constants';
import { SPARTACUS_CORE, SPARTACUS_SETUP } from '../feature-libs-constants';
import { isImportedFromSpartacusLibs } from './import-utils';
import { CustomConfig } from './lib-utils';
import { getModule, getModulePropertyInitializer } from './new-module-utils';

export function getSpartacusProviders(
  sourceFile: SourceFile,
  createIfMissing = true
): Node[] {
  const moduleNode = getModule(sourceFile);
  if (!moduleNode) {
    return [];
  }

  const initializer = getModulePropertyInitializer(
    sourceFile,
    'providers',
    createIfMissing
  );

  const providers: Node[] = [];
  initializer?.getElements().forEach((element) => {
    if (
      Node.isCallExpression(element) ||
      // TODO:#schematics - cover the spread in new module utils
      Node.isSpreadElement(element)
    ) {
      const expression = element.getExpression();
      if (
        Node.isIdentifier(expression) &&
        isImportedFromSpartacusLibs(expression)
      ) {
        providers.push(element);
      }
    }
  });

  return providers;
}

const EMPTY_SPACE_REG_EXP = /\s+/gm;
export function normalizeConfiguration(config: string | Node): string {
  let newConfig = typeof config === 'string' ? config : config.getText();

  newConfig = newConfig.trim();

  if (newConfig.startsWith(PROVIDE_CONFIG_FUNCTION)) {
    newConfig = newConfig.replace(`${PROVIDE_CONFIG_FUNCTION}(`, '');
    newConfig = newConfig.substring(0, newConfig.length - 1);
  }

  newConfig = newConfig.replace(EMPTY_SPACE_REG_EXP, '');

  return newConfig;
}

export function getB2bConfiguration(): CustomConfig[] {
  return [
    {
      import: [
        {
          moduleSpecifier: SPARTACUS_CORE,
          namedImports: [PROVIDE_CONFIG_FUNCTION],
        },
        {
          moduleSpecifier: SPARTACUS_SETUP,
          namedImports: ['defaultB2bOccConfig'],
        },
      ],
      content: `provideConfig(defaultB2bOccConfig)`,
    },
  ];
}
