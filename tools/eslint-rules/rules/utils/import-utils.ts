/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import {
  RuleFix,
  RuleFixer,
  SourceCode,
} from '@typescript-eslint/utils/ts-eslint';

/**
 * Adds an import in the file for `importedIdentifier` from `importPath`,
 * if it's missing in the file `sourceCode`.
 */
export function fixPossiblyMissingImport({
  fixer,
  importedIdentifier,
  importPath,
  sourceCode,
}: {
  fixer: RuleFixer;
  importedIdentifier: string;
  importPath: string;
  sourceCode: SourceCode;
}): RuleFix[] {
  if (isIdentifierImported({ sourceCode, importedIdentifier, importPath })) {
    return [];
  }

  return fixMissingImport({
    sourceCode,
    importedIdentifier,
    importPath,
    fixer,
  });
}

/**
 * Tells whether the `importedIdentifier` is imported from `importPath` in the file of `sourceCode`.
 */
export function isIdentifierImported({
  importedIdentifier,
  importPath,
  sourceCode,
}: {
  importedIdentifier: string;
  importPath: string;
  sourceCode: SourceCode;
}): boolean {
  const importDeclarations = sourceCode.ast.body.filter(
    (statement) => statement.type === AST_NODE_TYPES.ImportDeclaration
  );
  return importDeclarations.some(
    (declaration) =>
      declaration.type === AST_NODE_TYPES.ImportDeclaration &&
      declaration.source.value === importPath &&
      declaration.specifiers.some(
        (specifier) =>
          specifier.type === AST_NODE_TYPES.ImportSpecifier &&
          specifier.imported.name === importedIdentifier
      )
  );
}

/**
 * Adds an import in the file for `importedIdentifier` from `importPath`,
 * in the file `sourceCode`.
 */
export function fixMissingImport({
  fixer,
  importedIdentifier,
  importPath,
  sourceCode,
}: {
  fixer: RuleFixer;
  importedIdentifier: string;
  importPath: string;
  sourceCode: SourceCode;
}): RuleFix[] {
  const fixes = [];
  const importStatementText = `import { ${importedIdentifier} } from '${importPath}';\n`;
  const importDeclarations = sourceCode.ast.body.filter(
    (statement) => statement.type === AST_NODE_TYPES.ImportDeclaration
  );

  if (importDeclarations.length > 0) {
    const lastImport = importDeclarations[importDeclarations.length - 1];
    fixes.push(fixer.insertTextAfter(lastImport, `\n${importStatementText}`));
  } else {
    fixes.push(
      fixer.insertTextBefore(sourceCode.ast.body[0], importStatementText)
    );
  }

  return fixes;
}
