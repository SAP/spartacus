import { Node, SourceFile, ts as tsMorph } from 'ts-morph';
import { SPARTACUS_CORE } from '../constants';
import { isImportedFrom, isImportedFromSpartacusLibs } from './import-utils';
import { getModule } from './new-module-utils';

export function getConfigs(sourceFile: SourceFile): Node[] {
  const module = getModule(sourceFile);
  if (!module) {
    return [];
  }
  const literal = module.getFirstDescendantByKind(
    tsMorph.SyntaxKind.ObjectLiteralExpression
  );
  const configs: Node[] = [];
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
          if (Node.isCallExpression(element)) {
            const expression = element.getExpression();
            if (
              Node.isIdentifier(expression) &&
              expression.getText() === 'provideConfig' &&
              isImportedFrom(expression, SPARTACUS_CORE)
            ) {
              if (element.getArguments()?.[0]) {
                const config = element.getArguments()[0];
                // "type assertion" and "as expression" is useless for us, so we can skip it and add it's children
                if (
                  Node.isTypeAssertion(config) ||
                  Node.isAsExpression(config)
                ) {
                  configs.push(config.getExpression());
                } else {
                  configs.push(config);
                }
              }
            }
          }
        });
      }
    });
  }
  return configs;
}

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
