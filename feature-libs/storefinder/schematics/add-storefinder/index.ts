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
  CLI_STOREFINDER_FEATURE,
  LibraryOptions as SpartacusStorefinderOptions,
  readPackageJson,
  shouldAddFeature,
  STOREFINDER_SCHEMATICS_CONFIG,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';

export function addStorefinderFeatures(
  options: SpartacusStorefinderOptions
): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      shouldAddFeature(CLI_STOREFINDER_FEATURE, options.features)
        ? addStorefinderFeature(options)
        : noop(),
    ]);
  };
}

function addStorefinderFeature(options: SpartacusStorefinderOptions): Rule {
  return addLibraryFeature(options, STOREFINDER_SCHEMATICS_CONFIG);
}
