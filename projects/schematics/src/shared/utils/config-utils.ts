import { ArrayLiteralExpression, Expression, Node, SourceFile } from 'ts-morph';
import { PROVIDE_CONFIG_FUNCTION } from '../constants';
import { SPARTACUS_CORE, SPARTACUS_SETUP } from '../libs-constants';
import { isImportedFromSpartacusLibs } from './import-utils';
import { CustomConfig } from './lib-utils';
import { getModule, getModulePropertyInitializer } from './new-module-utils';

export function getSpartacusProviders(
  sourceFile: SourceFile,
  createIfMissing = true
): Expression[] {
  const moduleNode = getModule(sourceFile);
  if (!moduleNode) {
    return [];
  }

  const initializer = getModulePropertyInitializer(
    sourceFile,
    'providers',
    createIfMissing
  );

  const providers: Expression[] = [];
  initializer?.getElements().forEach((element) => {
    if (Node.isCallExpression(element) || Node.isSpreadElement(element)) {
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

export function isSpartacusConfigDuplicate(
  newContent: string,
  initializer: ArrayLiteralExpression
): boolean {
  const normalizedContent = normalizeConfiguration(newContent);
  const configs = getSpartacusProviders(initializer.getSourceFile());
  for (const config of configs) {
    const normalizedConfig = normalizeConfiguration(config);
    if (normalizedContent === normalizedConfig) {
      return true;
    }
  }

  return false;
}

const EMPTY_SPACE_REG_EXP = /\s+/gm;
const COMMA_REG_EXP = /,+/gm;
function normalizeConfiguration(config: string | Node): string {
  let newConfig = typeof config === 'string' ? config : config.getText();

  newConfig = newConfig.trim();
  newConfig = newConfig.replace(COMMA_REG_EXP, '');

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
