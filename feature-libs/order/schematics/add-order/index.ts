import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addLibraryFeature,
  addPackageJsonDependenciesForLibrary,
  CLI_ORDER_FEATURE,
  LibraryOptions as SpartacusOrderOptions,
  ORDER_SCHEMATICS_CONFIG,
  readPackageJson,
  shouldAddFeature,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';

export function addOrderFeatures(options: SpartacusOrderOptions): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      shouldAddFeature(CLI_ORDER_FEATURE, options.features)
        ? addOrderFeature(options)
        : noop(),
    ]);
  };
}

function addOrderFeature(options: SpartacusOrderOptions): Rule {
  return addLibraryFeature(options, ORDER_SCHEMATICS_CONFIG);
}
