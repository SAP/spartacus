import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  installPackageJsonDependencies,
  LibraryOptions as SpartacusProductOptions,
  readPackageJson,
  shouldAddFeature,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { CLI_VARIANTS_FEATURE } from '../constants';

import { addVariantsFeatures } from '../add-variants';

export function addSpartacusProduct(options: SpartacusProductOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      shouldAddFeature(options.features, CLI_VARIANTS_FEATURE)
        ? addVariantsFeatures(options)
        : noop(),
      installPackageJsonDependencies(),
    ]);
  };
}
