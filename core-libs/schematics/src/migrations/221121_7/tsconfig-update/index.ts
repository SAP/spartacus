/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { applyEdits, modify, parse } from 'jsonc-parser';

/**
 * Updates tsconfig.json to be compatible with Angular 21.
 *
 * Changes made:
 * - Removes `outDir` from compilerOptions
 * - Removes `esModuleInterop` from compilerOptions
 * - Removes `moduleResolution` from compilerOptions
 * - Changes `module` from "ES2022" to "preserve"
 * - Adds `files: []` at the root level
 * - Adds `references` array with paths to tsconfig.app.json and tsconfig.spec.json
 *
 * For more, see: https://angular.dev/reference/configs/angular-compiler-options
 */
export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    const tsconfigPath = '/tsconfig.json';

    if (!tree.exists(tsconfigPath)) {
      return tree;
    }

    const tsconfigBuffer = tree.read(tsconfigPath);
    if (!tsconfigBuffer) {
      return tree;
    }

    const content = tsconfigBuffer.toString();
    const tsconfig = parse(content, undefined, { allowTrailingComma: true });
    const options = { formattingOptions: { tabSize: 2, insertSpaces: true } };

    const { hasChanges, updatedContent } = updateTsconfigProperties(
      content,
      tsconfig,
      options,
      context
    );

    if (hasChanges) {
      tree.overwrite(tsconfigPath, updatedContent);
      context.logger.info('✅ Updated tsconfig.json');
    }

    return tree;
  };
}

function updateTsconfigProperties(
  content: string,
  tsconfig: any,
  options: { formattingOptions: { tabSize: number; insertSpaces: boolean } },
  context: SchematicContext
): { hasChanges: boolean; updatedContent: string } {
  let updatedContent = content;
  let hasChanges = false;

  // Remove obsolete compiler options
  const propsToRemove = ['outDir', 'esModuleInterop', 'moduleResolution'];
  for (const prop of propsToRemove) {
    if (tsconfig.compilerOptions?.[prop] !== undefined) {
      context.logger.info(`  ↳ Removing "${prop}" from compilerOptions`);
      updatedContent = applyEdits(
        updatedContent,
        modify(updatedContent, ['compilerOptions', prop], undefined, options)
      );
      hasChanges = true;
    }
  }

  // Update module to "preserve"
  if (
    tsconfig.compilerOptions?.module &&
    tsconfig.compilerOptions.module !== 'preserve'
  ) {
    context.logger.info('  ↳ Updating "module" to "preserve"');
    updatedContent = applyEdits(
      updatedContent,
      modify(updatedContent, ['compilerOptions', 'module'], 'preserve', options)
    );
    hasChanges = true;
  }

  // Add files array if not present
  if (!tsconfig.files) {
    context.logger.info('  ↳ Adding "files" array');
    updatedContent = applyEdits(
      updatedContent,
      modify(updatedContent, ['files'], [], options)
    );
    hasChanges = true;
  }

  // Add references array if not present
  if (!tsconfig.references) {
    context.logger.info('  ↳ Adding "references" array');
    updatedContent = applyEdits(
      updatedContent,
      modify(
        updatedContent,
        ['references'],
        [{ path: './tsconfig.app.json' }, { path: './tsconfig.spec.json' }],
        options
      )
    );
    hasChanges = true;
  }

  return { hasChanges, updatedContent };
}
