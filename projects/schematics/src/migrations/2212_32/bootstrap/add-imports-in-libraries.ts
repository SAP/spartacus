import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

const affectedLibraries = [
  'cart',
  'checkout',
  'organization',
  'pick-up-in-store',
  'product',
  'product-multi-dimensional',
  'qualtrics',
  'quote',
  'storefinder',
  'epd-visualization',
  'opf',
];

// Each affected library used these three imports
const bootstrapImports = `
@import '@spartacus/styles/vendor/bootstrap/scss/functions';
@import '@spartacus/styles/vendor/bootstrap/scss/variables';
@import '@spartacus/styles/vendor/bootstrap/scss/_mixins';
`;

export function updateLibraryScss(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Starting SCSS updates for affected libraries.');

    tree.visit((filePath) => {
      // Check if the file is an SCSS file and belongs to an affected library
      if (filePath.endsWith('.scss') && isAffectedLibraryFile(filePath)) {
        const fileContent = tree.read(filePath)?.toString('utf-8');
        if (fileContent) {
          // Check for original imports to determine where to insert new imports
          if (fileContent.includes('@import "@spartacus/')) {
            // Insert new imports after the original ones
            const updatedContent = fileContent.replace(
              /(@import\s+['"][^;]+['"];\s*)+/,
              (match) => `${match}\n${bootstrapImports}`
            );

            // Overwrite the file if changes were made
            if (updatedContent !== fileContent) {
              tree.overwrite(filePath, updatedContent);
              context.logger.info(`Updated imports in: ${filePath}`);
            }
          }
        }
      }
    });

    context.logger.info('SCSS updates completed.');
    return tree;
  };
}

function isAffectedLibraryFile(filePath: string): boolean {
  return affectedLibraries.some((library) => filePath.includes(library));
}
