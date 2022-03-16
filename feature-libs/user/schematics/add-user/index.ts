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
  CLI_USER_ACCOUNT_FEATURE,
  CLI_USER_PROFILE_FEATURE,
  LibraryOptions as SpartacusUserOptions,
  readPackageJson,
  shouldAddFeature,
  USER_ACCOUNT_SCHEMATICS_CONFIG,
  USER_PROFILE_SCHEMATICS_CONFIG,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';

export function addUserFeatures(options: SpartacusUserOptions): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      shouldAddFeature(CLI_USER_ACCOUNT_FEATURE, options.features)
        ? addAccountFeature(options)
        : noop(),

      shouldAddFeature(CLI_USER_PROFILE_FEATURE, options.features)
        ? addProfileFeature(options)
        : noop(),
    ]);
  };
}

function addAccountFeature(options: SpartacusUserOptions): Rule {
  return addLibraryFeature(options, USER_ACCOUNT_SCHEMATICS_CONFIG);
}

function addProfileFeature(options: SpartacusUserOptions): Rule {
  return addLibraryFeature(options, USER_PROFILE_SCHEMATICS_CONFIG);
}
