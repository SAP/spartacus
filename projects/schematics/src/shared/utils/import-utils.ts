import { Identifier, ts } from 'ts-morph';

export function isImportedFrom(node: Identifier, importPath: string): boolean {
  let result = false;

  const definitions = node.getDefinitions();
  for (const def of definitions) {
    const node = def.getDeclarationNode();

    const declaration = node?.getFirstAncestorByKind(
      ts.SyntaxKind.ImportDeclaration
    );
    if (declaration?.getModuleSpecifier().getText().includes(importPath)) {
      result = true;
      break;
    }
  }

  return result;
}
