/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import * as ts from 'typescript';
import { printErrorWithDocsForMigrated_2211_32_To_2211_36 as printErrorWithDocs } from '../fallback-advice-to-follow-docs';

/**
 * Updates the i18n lazy loading config to use the new path with the `public/` folder,
 * instead of `../../assets`, because of moving the assets folder with respect to the new Angular v19 standards.
 *
 * It checks whether the config for i18n lazy loading is present.
 * If it is, it updates the path from `../../assets` to `../../../public`.
 * Otherwise, no changes are made.
 */
export function updateI18nLazyLoadingConfig(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const configurationModulePath =
      'src/app/spartacus/spartacus-configuration.module.ts';
    context.logger.info(
      `\n⏳ Updating config for i18n lazy loading in "${configurationModulePath}", if needed...`
    );

    if (!tree.exists(configurationModulePath)) {
      printErrorWithDocs(`${configurationModulePath} file not found`, context);
      return;
    }

    const content = tree.read(configurationModulePath);
    if (!content) {
      printErrorWithDocs(
        `Failed to read ${configurationModulePath} file`,
        context
      );
      return;
    }

    let updatedContent = content.toString();

    context.logger.info(
      '    ↳ Checking if app has a config for i18n lazy loading...'
    );
    if (!hasConfigForLazyLoadingI18n(updatedContent)) {
      context.logger.info('      ↳ No.');
      context.logger.info(
        `✅ Updating config for i18n lazy loading in "${configurationModulePath}" was not needed`
      );
      return;
    }
    context.logger.info(
      '      ↳ Updating the path from "../../assets" to "../../../public"'
    );

    updatedContent = updateDynamicImportPath(updatedContent);

    tree.overwrite(configurationModulePath, updatedContent);
    context.logger.info('✅ Updated config for i18n lazy loading');
  };
}

/**
 * Checks if the content has a config for lazy loaded i18n.
 *
 * It looks for an object literal with the following structure:
 * ```
 * {
 *   i18n: {
 *     backend: {
 *       loader: ...
 *     }
 *   }
 * }
 */
function hasConfigForLazyLoadingI18n(content: string): boolean {
  const sourceFile = ts.createSourceFile(
    '',
    content,
    ts.ScriptTarget.Latest,
    true
  );

  const objectLiterals = findObjectLiterals(sourceFile);
  return objectLiterals.some(isConfigForLazyLoadingI18n);
}

/**
 * Checks if the given node is a config for lazy loaded i18n.
 *
 * It looks for an object literal with the following structure:
 * ```
 * {
 *   i18n: {
 *     backend: {
 *       loader: ...
 *     }
 *   }
 * }
 * ```
 */
function isConfigForLazyLoadingI18n(node: ts.ObjectLiteralExpression): boolean {
  // Expecting syntax: `i18n: { ... }`
  const i18nProp = node.properties.find(
    (prop): prop is ts.PropertyAssignment =>
      ts.isPropertyAssignment(prop) &&
      ts.isIdentifier(prop.name) &&
      prop.name.text === 'i18n'
  );
  if (!i18nProp || !ts.isObjectLiteralExpression(i18nProp.initializer)) {
    return false;
  }

  // Expecting syntax: `backend: { ... }`
  const backendProp = i18nProp.initializer.properties.find(
    (prop): prop is ts.PropertyAssignment =>
      ts.isPropertyAssignment(prop) &&
      ts.isIdentifier(prop.name) &&
      prop.name.text === 'backend'
  );
  if (!backendProp || !ts.isObjectLiteralExpression(backendProp.initializer)) {
    return false;
  }

  // Expecting one of the following syntaxes:
  // - `loader: (lang: string, chunkName: string) => { ... }`
  // - `loader(lang: string, chunkName: string) { ... }`
  return backendProp.initializer.properties.some((prop) => {
    if (!ts.isPropertyAssignment(prop) && !ts.isMethodDeclaration(prop)) {
      return false;
    }
    const name = prop.name;
    return (
      (ts.isIdentifier(name) || ts.isStringLiteral(name)) &&
      name.text === 'loader'
    );
  });
}

/**
 * Returns all object literals in the given node.
 */
function findObjectLiterals(node: ts.Node): ts.ObjectLiteralExpression[] {
  const objects: ts.ObjectLiteralExpression[] = [];

  if (ts.isObjectLiteralExpression(node)) {
    objects.push(node);
  }

  ts.forEachChild(node, (child) => {
    objects.push(...findObjectLiterals(child));
  });

  return objects;
}

/**
 * Updates the path of dynamic imports by replacing `../../assets` with `../../../public`.
 */
function updateDynamicImportPath(content: string): string {
  const sourceFile = ts.createSourceFile(
    '',
    content,
    ts.ScriptTarget.Latest,
    true
  );

  enum ImportPathPrefixes {
    OLD = '../../assets/',
    NEW = '../../../public/',
  }

  function visitor(node: ts.Node): void {
    // Expect syntax: import(    )
    if (!isDynamicImport(node)) {
      ts.forEachChild(node, visitor);
      return;
    }

    // Expect syntax: import( ` ... ` )
    const argument = node.arguments[0];
    if (!ts.isTemplateLiteral(argument)) {
      ts.forEachChild(node, visitor);
      return;
    }

    // Expect syntax: import( `... <old path part> ...` )
    const importPath = content.substring(
      argument.getStart(),
      argument.getEnd()
    );
    if (!importPath.includes(ImportPathPrefixes.OLD)) {
      ts.forEachChild(node, visitor);
      return;
    }

    // Update the path
    const updatedPath = importPath.replace(
      ImportPathPrefixes.OLD,
      ImportPathPrefixes.NEW
    );
    content =
      content.slice(0, argument.getStart()) +
      updatedPath +
      content.slice(argument.getEnd());

    ts.forEachChild(node, visitor);
  }

  visitor(sourceFile);
  return content;
}

function isDynamicImport(node: ts.Node): node is ts.CallExpression {
  return (
    ts.isCallExpression(node) &&
    node.expression.kind === ts.SyntaxKind.ImportKeyword
  );
}
