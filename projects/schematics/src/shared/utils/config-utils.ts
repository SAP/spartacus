import { Node, SourceFile, ts as tsMorph } from 'ts-morph';
import { isImportedFromSpartacusLibs } from './import-utils';
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
