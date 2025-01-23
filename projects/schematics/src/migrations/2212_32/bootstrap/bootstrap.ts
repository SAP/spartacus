import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import { replaceBootstrapImports } from './replace-bootstrap-imports';
import { exec } from 'child_process';
import { updateLibraryScss } from './add-imports-in-libraries';

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return chain([
      uninstallBootstrap(),
      updateMainStylesFileImports(),
      replaceBootstrapImports(),
      updateLibraryScss(),
    ])(tree, context);
  };
}

export function uninstallBootstrap(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    // Execute the npm uninstall command
    exec('npm uninstall bootstrap', (error, stdout, stderr) => {
      if (error) {
        context.logger.error(`Error uninstalling Bootstrap: ${error.message}`);
        return;
      }
      if (stderr) {
        context.logger.warn(`Warnings during uninstall: ${stderr}`);
      }
      context.logger.info(`Bootstrap uninstalled successfully:\n${stdout}`);
    });

    return tree;
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

    const updatedContent = fileContent
      .replace(/@import\s+['"]@spartacus\/styles\/index['"];/g, '')
      .replace(
        /@import ['"]styles-config['"];/g,
        `/* You can add global styles to this file, and also import other style files */\n@import 'styles-config';\n\n// ORDER IMPORTANT: Spartacus core first\n@import '@spartacus/styles/scss/core';\n\n// ORDER IMPORTANT: Copy of Bootstrap files next\n@import '@spartacus/styles/vendor/bootstrap/scss/reboot';\n@import '@spartacus/styles/vendor/bootstrap/scss/type';\n@import '@spartacus/styles/vendor/bootstrap/scss/grid';\n@import '@spartacus/styles/vendor/bootstrap/scss/utilities';\n@import '@spartacus/styles/vendor/bootstrap/scss/transitions';\n@import '@spartacus/styles/vendor/bootstrap/scss/dropdown';\n@import '@spartacus/styles/vendor/bootstrap/scss/card';\n@import '@spartacus/styles/vendor/bootstrap/scss/nav';\n@import '@spartacus/styles/vendor/bootstrap/scss/buttons';\n@import '@spartacus/styles/vendor/bootstrap/scss/forms';\n@import '@spartacus/styles/vendor/bootstrap/scss/custom-forms';\n@import '@spartacus/styles/vendor/bootstrap/scss/modal';\n@import '@spartacus/styles/vendor/bootstrap/scss/close';\n@import '@spartacus/styles/vendor/bootstrap/scss/alert';\n@import '@spartacus/styles/vendor/bootstrap/scss/tooltip';\n\n// ORDER IMPORTANT: Spartacus styles last\n@import '@spartacus/styles/index';`
      );

    tree.overwrite(filePath, updatedContent);
    context.logger.info(`Updated imports in ${filePath}.`);

    return tree;
  };
}
