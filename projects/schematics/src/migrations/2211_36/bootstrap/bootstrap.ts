/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import { replaceBootstrapImports } from './replace-bootstrap-imports';
import { spawn } from 'node:child_process';

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return chain([
      uninstallBootstrap(),
      updateMainStylesFileImports(),
      replaceBootstrapImports(),
    ])(tree, context);
  };
}

function uninstallBootstrap(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return async () => {
      // Detect the package manager
      let packageManager = '';
      if (tree.exists('yarn.lock')) {
        packageManager = 'yarn';
      } else if (tree.exists('pnpm-lock.yaml')) {
        packageManager = 'pnpm';
      } else if (tree.exists('package-lock.json')) {
        packageManager = 'npm';
      }

      let uninstallCommand = '';
      if (packageManager === 'yarn') {
        uninstallCommand = 'yarn remove bootstrap';
      } else if (packageManager === 'pnpm') {
        uninstallCommand = 'pnpm remove bootstrap';
      } else if (packageManager === 'npm') {
        uninstallCommand = 'npm uninstall bootstrap';
      } else {
        context.logger.warn(
          'Could not detect a package manager. Please uninstall Bootstrap manually.'
        );
        return;
      }

      context.logger.info(`Running uninstall command: ${uninstallCommand}`);

      await new Promise<void>((resolve) => {
        const child = spawn(uninstallCommand, { shell: true });

        child.on('close', (code) => {
          if (code === 0) {
            context.logger.info('Bootstrap uninstalled successfully.');
            resolve();
          } else {
            context.logger.error(
              `Bootstrap uninstall failed with exit code ${code}. Please uninstall Bootstrap manually.`
            );
            resolve();
          }
        });
      });
    };
  };
}

function updateMainStylesFileImports(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const filePath = 'src/styles.scss';

    if (!tree.exists(filePath)) {
      context.logger.warn(`File ${filePath} does not exist.`);
      return tree;
    }

    const fileContent = tree.read(filePath)?.toString('utf-8');

    if (!fileContent) {
      context.logger.warn(`File ${filePath} is empty or could not be read.`);
      return tree;
    }

    context.logger.info(`Updating Bootstrap imports in '${filePath}'...`);

    const styleImportsToInsert =
      `@import 'styles-config';\n` +
      `\n// ORDER IMPORTANT: Spartacus core first\n` +
      `@import '@spartacus/styles/scss/core';\n\n` +
      `// ORDER IMPORTANT: Copy of Bootstrap files next\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/reboot';\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/type';\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/grid';\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/utilities';\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/transitions';\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/dropdown';\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/card';\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/nav';\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/buttons';\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/forms';\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/custom-forms';\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/modal';\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/close';\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/alert';\n` +
      `@import '@spartacus/styles/vendor/bootstrap/scss/tooltip';\n\n` +
      `// ORDER IMPORTANT: Spartacus styles last\n` +
      `@import '@spartacus/styles/index';\n`;

    const updatedContent = fileContent
      .replace(
        /\/\* You can add global styles to this file, and also import other style files \*\//g,
        ''
      )
      .replace(/@import\s+['"]@spartacus\/styles\/index['"];/g, '')
      .replace(/@import ['"]styles-config['"];/g, styleImportsToInsert);

    tree.overwrite(filePath, updatedContent);

    context.logger.info(
      `Bootstrap imports updated successfully in '${filePath}'.`
    );

    return tree;
  };
}
