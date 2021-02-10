import { Identifier, ts } from 'ts-morph';

export function isImportedFrom(node: Identifier, importPath: string): boolean {
  let result = false;
  const definitions = node.getDefinitions();
  definitions.forEach((def) => {
    const node = def.getDeclarationNode();
    if (node) {
      const declaration = node.getFirstAncestorByKind(
        ts.SyntaxKind.ImportDeclaration
      );
      if (declaration) {
        if (declaration.getModuleSpecifier().getText().includes(importPath)) {
          result = true;
        }
      }
    }
  });
  return result;
}
