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

    let content = tsconfigBuffer.toString();
    const tsconfig = parse(content, undefined, { allowTrailingComma: true });
    const options = { formattingOptions: { tabSize: 2, insertSpaces: true } };
    let hasChanges = false;

    // Remove obsolete compiler options
    if (tsconfig.compilerOptions?.outDir !== undefined) {
      context.logger.info('  ↳ Removing "outDir" from compilerOptions');
      content = applyEdits(
        content,
        modify(content, ['compilerOptions', 'outDir'], undefined, options)
      );
      hasChanges = true;
    }

    if (tsconfig.compilerOptions?.esModuleInterop !== undefined) {
      context.logger.info(
        '  ↳ Removing "esModuleInterop" from compilerOptions'
      );
      content = applyEdits(
        content,
        modify(
          content,
          ['compilerOptions', 'esModuleInterop'],
          undefined,
          options
        )
      );
      hasChanges = true;
    }

    if (tsconfig.compilerOptions?.moduleResolution !== undefined) {
      context.logger.info(
        '  ↳ Removing "moduleResolution" from compilerOptions'
      );
      content = applyEdits(
        content,
        modify(
          content,
          ['compilerOptions', 'moduleResolution'],
          undefined,
          options
        )
      );
      hasChanges = true;
    }

    // Update module to "preserve"
    if (
      tsconfig.compilerOptions?.module &&
      tsconfig.compilerOptions.module !== 'preserve'
    ) {
      context.logger.info('  ↳ Updating "module" to "preserve"');
      content = applyEdits(
        content,
        modify(content, ['compilerOptions', 'module'], 'preserve', options)
      );
      hasChanges = true;
    }

    // Add files array if not present
    if (!tsconfig.files) {
      context.logger.info('  ↳ Adding "files" array');
      content = applyEdits(content, modify(content, ['files'], [], options));
      hasChanges = true;
    }

    // Add references array if not present
    if (!tsconfig.references) {
      context.logger.info('  ↳ Adding "references" array');
      content = applyEdits(
        content,
        modify(
          content,
          ['references'],
          [{ path: './tsconfig.app.json' }, { path: './tsconfig.spec.json' }],
          options
        )
      );
      hasChanges = true;
    }

    if (hasChanges) {
      tree.overwrite(tsconfigPath, content);
      context.logger.info('✅ Updated tsconfig.json');
    }

    return tree;
  };
}
