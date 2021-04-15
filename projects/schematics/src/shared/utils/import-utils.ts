import { Identifier, ts } from 'ts-morph';

export function isImportedFrom(node: Identifier, importPath: string): boolean {
  const definitions = node.getDefinitions();
  for (const def of definitions) {
    const node = def.getDeclarationNode();

    const declaration = node?.getFirstAncestorByKind(
      ts.SyntaxKind.ImportDeclaration
    );
    if (declaration?.getModuleSpecifier().getText().includes(importPath)) {
      return true;
    }
  }

  return false;
}

export function isImportedFromSpartacusLibs(node: Identifier): boolean {
  const definitions = node.getDefinitions();
  for (const def of definitions) {
    const node = def.getDeclarationNode();

    const declaration = node?.getFirstAncestorByKind(
      ts.SyntaxKind.ImportDeclaration
    );
    const moduleSpecifier = declaration?.getModuleSpecifier().getText();
    const spartacusScope = '@spartacus/';
    if (
      moduleSpecifier?.startsWith(`'${spartacusScope}`) ||
      moduleSpecifier?.startsWith(`"${spartacusScope}`)
    ) {
      return true;
    }
  }

  return false;
}
