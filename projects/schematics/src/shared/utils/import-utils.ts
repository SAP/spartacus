import { Identifier, ts } from 'ts-morph';
import { SPARTACUS_SCOPE } from '../constants';

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
    if (
      moduleSpecifier?.startsWith(`'${SPARTACUS_SCOPE}`) ||
      moduleSpecifier?.startsWith(`"${SPARTACUS_SCOPE}`)
    ) {
      return true;
    }
  }

  return false;
}
