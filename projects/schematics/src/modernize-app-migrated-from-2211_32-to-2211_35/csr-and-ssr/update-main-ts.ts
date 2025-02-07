/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { printErrorWithDocsForMigrated_2211_32_To_2211_35 as printErrorWithDocs } from '../fallback-advice-to-follow-docs';
import * as ts from 'typescript';

/**
 * Updates `src/main.ts` to include a config object with `ngZoneEventCoalescing: true` in the `bootstrapModule()` call,
 * to adapt to the new Angular v19 standards.
 */
export function updateMainTs(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const mainTsPath = 'src/main.ts';
    context.logger.info(`\n⏳ Updating ${mainTsPath}...`);

    if (!tree.exists(mainTsPath)) {
      printErrorWithDocs(`${mainTsPath} file not found`, context);
      return;
    }

    const content = tree.read(mainTsPath);
    if (!content) {
      printErrorWithDocs(`Failed to read ${mainTsPath} file`, context);
      return;
    }
    const originalContent = content.toString();

    context.logger.info(
      '  ↳ Updating `bootstrapModule()` call to include `ngZoneEventCoalescing: true`'
    );
    const updatedContent = updateBootstrapCall(originalContent);
    if (updatedContent === originalContent) {
      printErrorWithDocs(
        'Could not update `bootstrapModule()` call to include `ngZoneEventCoalescing: true`',
        context
      );
      return;
    }

    tree.overwrite(mainTsPath, updatedContent);
    context.logger.info(`✅ Updated ${mainTsPath}`);
  };
}

/**
 * Updates the `bootstrapModule()` call to include a config object with `ngZoneEventCoalescing: true`.
 */
function updateBootstrapCall(content: string): string {
  const sourceFile = ts.createSourceFile(
    '',
    content,
    ts.ScriptTarget.Latest,
    true
  );

  /**
   * Visits the node and checks if it's a method call to `bootstrapModule()`.
   * If it is, it updates the options to include `ngZoneEventCoalescing: true`.
   *
   * @returns { updated: boolean } - tells whether the update was performed
   */
  function visit(node: ts.Node): { updated: boolean } {
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.text === 'bootstrapModule'
    ) {
      const options = node.arguments[1];
      const ngZoneOption = `{ ngZoneEventCoalescing: true }`;

      if (!options) {
        // No options - insert new ones
        const start = node.arguments[0].getEnd();
        content = `${content.slice(0, start)}, ${ngZoneOption}${content.slice(start)}`;
        return { updated: true };
      }

      if (ts.isObjectLiteralExpression(options)) {
        // Find ngZoneEventCoalescing property if it exists
        const existingProperty = options.properties.find(
          (prop): prop is ts.PropertyAssignment =>
            ts.isPropertyAssignment(prop) &&
            prop.name.getText() === 'ngZoneEventCoalescing'
        );

        if (!existingProperty) {
          // Add to other existing options
          const start = options.getStart() + 1; // After {
          content = `${content.slice(0, start)}ngZoneEventCoalescing: true,${content.slice(start)}`;
        } else {
          // Update existing property
          const valueStart = existingProperty.initializer.getStart();
          const valueEnd = existingProperty.initializer.getEnd();
          content = `${content.slice(0, valueStart)}true${content.slice(valueEnd)}`;
        }
        return { updated: true };
      }
    }

    for (const child of node.getChildren()) {
      // short-circuit and early return if the update has been already performed in one of the children nodes
      if (visit(child).updated) {
        return { updated: true };
      }
    }
    return { updated: false };
  }

  visit(sourceFile);
  return content;
}
