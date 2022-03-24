import { Identifier, ImportDeclaration, ts } from 'ts-morph';
import { SPARTACUS_SCOPE } from '../libs-constants';

export function isImportedFromSpartacusLibs(
  node: Identifier | string
): boolean {
  return isImportedFrom(node, SPARTACUS_SCOPE);
}

export function isImportedFrom(
  node: Identifier | string,
  toCheck: string
): boolean {
  let moduleImportPath: string;
  if (typeof node === 'string') {
    moduleImportPath = node;
  } else {
    moduleImportPath = getImportPath(node) ?? '';
  }

  return moduleImportPath.startsWith(toCheck);
}

export function getImportPath(node: Identifier): string | undefined {
  const declaration = getImportDeclaration(node);
  if (declaration) {
    return declaration.getModuleSpecifierValue();
  }

  return undefined;
}

export function getImportDeclaration(
  node: Identifier
): ImportDeclaration | undefined {
  const references = node.findReferencesAsNodes();
  for (const reference of references) {
    const importDeclaration = reference?.getFirstAncestorByKind(
      ts.SyntaxKind.ImportDeclaration
    );
    if (importDeclaration) {
      return importDeclaration;
    }
  }

  return undefined;
}
