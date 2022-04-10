import {
  ArrowFunction,
  CallExpression,
  Identifier,
  ImportDeclaration,
  PropertyAccessExpression,
  SourceFile,
  ts as tsMorph,
} from 'ts-morph';
import { CORE_SPARTACUS_SCOPES, SPARTACUS_SCOPE } from '../libs-constants';
import { getSpartacusProviders } from './config-utils';
import { Import } from './new-module-utils';

// TODO:#test
// TODO:#comment
export function isImportedFromSpartacusLibs(
  node: Identifier | string
): boolean {
  return isImportedFrom(node, SPARTACUS_SCOPE);
}

// TODO:#test
// TODO:#comment
export function isImportedFromSpartacusCoreLib(
  node: Identifier | string
): boolean {
  for (const coreScope of CORE_SPARTACUS_SCOPES) {
    if (isImportedFrom(node, coreScope)) {
      return true;
    }
  }

  return false;
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
      tsMorph.SyntaxKind.ImportDeclaration
    );
    if (importDeclaration) {
      return importDeclaration;
    }
  }

  return undefined;
}

/**
 * Collects the higher-order arrow functions.
 * E.g. `() => import('@spartacus/cart/base/components/add-to-cart').then((m) => m.AddToCartModule)`,
 * but not the inner one `(m) => m.AddToCartModule`.
 */
export function collectDynamicImports(source: SourceFile): ArrowFunction[] {
  const providers = getSpartacusProviders(source, false);

  let arrowFunctions: ArrowFunction[] = [];
  for (const element of providers) {
    const higherArrowFunctions = element
      .getDescendantsOfKind(tsMorph.SyntaxKind.ArrowFunction)
      .filter((arrowFn) =>
        arrowFn.getParentIfKind(tsMorph.SyntaxKind.PropertyAssignment)
      );
    arrowFunctions = arrowFunctions.concat(higherArrowFunctions);
  }

  return arrowFunctions;
}

/**
 * Returns the import path of the dynamic import (if any).
 * E.g. for the given `() => import('@spartacus/cart/base').then((m) => m.CartBaseModule)` it returns TODO:#schematics - finish
 */
//  TODO:#schematics - test
export function getDynamicImportCallExpression(
  arrowFunction: ArrowFunction
): CallExpression | undefined {
  return arrowFunction
    .getFirstDescendantByKind(tsMorph.SyntaxKind.ImportKeyword)
    ?.getParentIfKind(tsMorph.SyntaxKind.CallExpression);
}

/**
 * Returns the import module of the dynamic import (if any).
 * E.g. for the given `() => import('@spartacus/cart/base').then((m) => m.CartBaseModule)` it returns TODO:#schematics - finish
 */
//  TODO:#schematics - test
export function getDynamicImportPropertyAccess(
  arrowFunction: ArrowFunction
): PropertyAccessExpression | undefined {
  return arrowFunction
    .getFirstDescendantByKind(tsMorph.SyntaxKind.ArrowFunction)
    ?.getFirstDescendantByKind(tsMorph.SyntaxKind.PropertyAccessExpression);
}

//  TODO:#schematics - test
//  TODO:#schematics - comment
export function getDynamicImportImportPath(
  arrowFunction: ArrowFunction
): string | undefined {
  return getDynamicImportCallExpression(arrowFunction)
    ?.getFirstDescendantByKind(tsMorph.SyntaxKind.StringLiteral)
    ?.getLiteralValue();
}

// TODO:#schematics - test
// TODO:#schematics - comment
export function createImports(
  sourceFile: SourceFile,
  imports: Import | Import[]
): ImportDeclaration[] {
  const importDeclarations: ImportDeclaration[] = [];
  ([] as Import[]).concat(imports).forEach((specifiedImport) => {
    const importDeclaration = sourceFile.addImportDeclaration({
      moduleSpecifier: specifiedImport.moduleSpecifier,
      namedImports: specifiedImport.namedImports,
    });
    importDeclarations.push(importDeclaration);
  });

  return importDeclarations;
}

/**
 * Searches through the given module's imports.
 * It first checks the import paths, and if
 * it finds the match, it continues to check if
 * the named imports is contained in the given config.
 */
// TODO:#schematics - test
export function findImport(
  featureModule: SourceFile,
  importPathToFind: string,
  moduleNameToFind: string
): boolean {
  const importDeclarations = featureModule.getImportDeclarations();
  for (const importDeclaration of importDeclarations) {
    const importPath = importDeclaration.getModuleSpecifierValue();
    if (importPathToFind === importPath) {
      const namedImports =
        importDeclaration.getImportClause()?.getNamedImports() ?? [];
      for (const namedImport of namedImports) {
        if (namedImport.getName() === moduleNameToFind) {
          return true;
        }
      }
    }
  }

  return false;
}

// TODO:#schematics - test
// TODO:#schematics - comment
export function isRelative(path: string): boolean {
  return path.startsWith('./') || path.startsWith('../');
}
