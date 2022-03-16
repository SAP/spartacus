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
  CLI_QUALTRICS_FEATURE,
  LibraryOptions as SpartacusQualtricsOptions,
  QUALTRICS_SCHEMATICS_CONFIG,
  readPackageJson,
  shouldAddFeature,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';

export function addQualtricsFeatures(options: SpartacusQualtricsOptions): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      shouldAddFeature(CLI_QUALTRICS_FEATURE, options.features)
        ? addQualtricsFeature(options)
        : noop(),
    ]);
  };
}

function addQualtricsFeature(options: SpartacusQualtricsOptions): Rule {
  return addLibraryFeature(options, QUALTRICS_SCHEMATICS_CONFIG);
}
