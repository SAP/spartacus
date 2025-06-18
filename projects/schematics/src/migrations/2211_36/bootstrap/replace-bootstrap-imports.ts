/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

const bootstrapImportsToReplace = [
  {
    find: 'bootstrap/scss/alert',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/alert',
  },
  {
    find: 'bootstrap/scss/badge',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/badge',
  },
  {
    find: 'bootstrap/scss/breadcrumb',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/breadcrumb',
  },
  {
    find: 'bootstrap/scss/button-group',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/button-group',
  },
  {
    find: 'bootstrap/scss/buttons',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/buttons',
  },
  {
    find: 'bootstrap/scss/card',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/card',
  },
  {
    find: 'bootstrap/scss/carousel',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/carousel',
  },
  {
    find: 'bootstrap/scss/close',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/close',
  },
  {
    find: 'bootstrap/scss/code',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/code',
  },
  {
    find: 'bootstrap/scss/custom-forms',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/custom-forms',
  },
  {
    find: 'bootstrap/scss/dropdown',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/dropdown',
  },
  {
    find: 'bootstrap/scss/forms',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/forms',
  },
  {
    find: 'bootstrap/scss/functions',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/functions',
  },
  {
    find: 'bootstrap/scss/grid',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/grid',
  },
  {
    find: 'bootstrap/scss/images',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/images',
  },
  {
    find: 'bootstrap/scss/input-group',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/input-group',
  },
  {
    find: 'bootstrap/scss/jumbotron',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/jumbotron',
  },
  {
    find: 'bootstrap/scss/list-group',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/list-group',
  },
  {
    find: 'bootstrap/scss/media',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/media',
  },
  {
    find: 'bootstrap/scss/mixins',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/mixins',
  },
  {
    find: 'bootstrap/scss/modal',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/modal',
  },
  {
    find: 'bootstrap/scss/nav',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/nav',
  },
  {
    find: 'bootstrap/scss/navbar',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/navbar',
  },
  {
    find: 'bootstrap/scss/pagination',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/pagination',
  },
  {
    find: 'bootstrap/scss/popover',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/popover',
  },
  {
    find: 'bootstrap/scss/print',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/print',
  },
  {
    find: 'bootstrap/scss/progress',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/progress',
  },
  {
    find: 'bootstrap/scss/reboot',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/reboot',
  },
  {
    find: 'bootstrap/scss/root',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/root',
  },
  {
    find: 'bootstrap/scss/tables',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/tables',
  },
  {
    find: 'bootstrap/scss/toasts',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/toasts',
  },
  {
    find: 'bootstrap/scss/tooltip',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/tooltip',
  },
  {
    find: 'bootstrap/scss/transitions',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/transitions',
  },
  {
    find: 'bootstrap/scss/type',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/type',
  },
  {
    find: 'bootstrap/scss/utilities',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/utilities',
  },
  {
    find: 'bootstrap/scss/variables',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/variables',
  },
  {
    find: 'bootstrap/scss/spinners',
    replaceWith: '@spartacus/styles/vendor/bootstrap/scss/spinners',
  },
];

export function replaceBootstrapImports(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info(
      'Scanning files for Bootstrap imports. ' +
        'Imports will be updated to use `@spartacus/styles/vendor/bootstrap/scss/`.'
    );

    tree.visit((filePath) => {
      if (filePath.endsWith('.scss')) {
        const fileContent = tree.read(filePath)?.toString('utf-8');
        if (fileContent) {
          let updatedContent = fileContent;
          let hasChanges = false;

          bootstrapImportsToReplace.forEach(({ find, replaceWith }) => {
            const regex = new RegExp(`@import\\s+['"]${find}['"];`, 'g');
            if (regex.test(updatedContent)) {
              updatedContent = updatedContent.replace(
                regex,
                `@import '${replaceWith}';`
              );
              hasChanges = true;
            }
          });

          if (hasChanges) {
            tree.overwrite(filePath, updatedContent);
            context.logger.info(
              `Updated imports of Bootstrap in file '${filePath}'`
            );
          }
        }
      }
    });

    context.logger.info('Bootstrap import replacement process completed.');
    return tree;
  };
}
