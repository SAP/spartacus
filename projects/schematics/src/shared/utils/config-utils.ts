import { Node, SourceFile, ts as tsMorph } from 'ts-morph';
import {
  PROVIDE_CONFIG_FUNCTION,
  SPARTACUS_CORE,
  SPARTACUS_SETUP,
} from '../constants';
import { isImportedFromSpartacusLibs } from './import-utils';
import { CustomConfig } from './lib-utils';
import { getModule } from './new-module-utils';

export function getSpartacusProviders(sourceFile: SourceFile): Node[] {
  const module = getModule(sourceFile);
  if (!module) {
    return [];
  }
  const literal = module.getFirstDescendantByKind(
    tsMorph.SyntaxKind.ObjectLiteralExpression
  );
  const providers: Node[] = [];
  if (literal) {
    const properties =
      literal.getChildrenOfKind(tsMorph.SyntaxKind.PropertyAssignment) ?? [];
    properties.forEach((property) => {
      if (
        property.getNameNode().getText() === 'providers' &&
        property.getInitializerIfKind(tsMorph.SyntaxKind.ArrayLiteralExpression)
      ) {
        const initializer = property.getInitializerIfKind(
          tsMorph.SyntaxKind.ArrayLiteralExpression
        );
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
      }
    });
  }
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
    {
      import: [
        {
          moduleSpecifier: SPARTACUS_CORE,
          namedImports: [PROVIDE_CONFIG_FUNCTION],
        },
        {
          moduleSpecifier: SPARTACUS_SETUP,
          namedImports: ['defaultB2bCheckoutConfig'],
        },
      ],
      content: `provideConfig(defaultB2bCheckoutConfig)`,
    },
  ];
}
