import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addLibraryFeature,
  addPackageJsonDependencies,
  createDependencies,
  createSpartacusDependencies,
  installPackageJsonDependencies,
  LibraryOptions as SpartacusUserOptions,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_USER,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import {
  CLI_ACCOUNT_FEATURE,
  CLI_PROFILE_FEATURE,
  SCSS_FILE_NAME,
  SPARTACUS_USER_ACCOUNT,
  SPARTACUS_USER_ACCOUNT_ASSETS,
  SPARTACUS_USER_ACCOUNT_ROOT,
  SPARTACUS_USER_PROFILE,
  SPARTACUS_USER_PROFILE_ASSETS,
  SPARTACUS_USER_PROFILE_ROOT,
  USER_ACCOUNT_FEATURE_NAME,
  USER_ACCOUNT_MODULE,
  USER_ACCOUNT_ROOT_MODULE,
  USER_ACCOUNT_TRANSLATIONS,
  USER_ACCOUNT_TRANSLATION_CHUNKS_CONFIG,
  USER_FEATURE_NAME,
  USER_FOLDER_NAME,
  USER_PROFILE_FEATURE_NAME,
  USER_PROFILE_MODULE,
  USER_PROFILE_ROOT_MODULE,
  USER_PROFILE_TRANSLATIONS,
  USER_PROFILE_TRANSLATION_CHUNKS_CONFIG,
} from '../constants';

export function addUserFeatures(options: SpartacusUserOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      shouldAddFeature(CLI_ACCOUNT_FEATURE, options.features)
        ? addAccountFeature(options)
        : noop(),

      shouldAddFeature(CLI_PROFILE_FEATURE, options.features)
        ? addProfileFeature(options)
        : noop(),

      addUserPackageJsonDependencies(packageJson),
      installPackageJsonDependencies(),
    ]);
  };
}

function addUserPackageJsonDependencies(packageJson: any): Rule {
  const spartacusLibraries = createSpartacusDependencies(peerDependencies);
  const thirdPartyDependencies = createDependencies(peerDependencies);
  const dependencies = spartacusLibraries.concat(thirdPartyDependencies);

  return addPackageJsonDependencies(dependencies, packageJson);
}

function addAccountFeature(options: SpartacusUserOptions): Rule {
  return addLibraryFeature(options, {
    folderName: USER_FOLDER_NAME,
    name: USER_FEATURE_NAME,
    lazyModuleName: USER_ACCOUNT_FEATURE_NAME,
    featureModule: {
      name: USER_ACCOUNT_MODULE,
      importPath: SPARTACUS_USER_ACCOUNT,
    },
    rootModule: {
      name: USER_ACCOUNT_ROOT_MODULE,
      importPath: SPARTACUS_USER_ACCOUNT_ROOT,
    },
    i18n: {
      resources: USER_ACCOUNT_TRANSLATIONS,
      chunks: USER_ACCOUNT_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_USER_ACCOUNT_ASSETS,
    },
    styles: {
      scssFileName: SCSS_FILE_NAME,
      importStyle: SPARTACUS_USER,
    },
  });
}

function addProfileFeature(options: SpartacusUserOptions): Rule {
  return addLibraryFeature(options, {
    folderName: USER_FOLDER_NAME,
    name: USER_FEATURE_NAME,
    lazyModuleName: USER_PROFILE_FEATURE_NAME,
    featureModule: {
      name: USER_PROFILE_MODULE,
      importPath: SPARTACUS_USER_PROFILE,
    },
    rootModule: {
      name: USER_PROFILE_ROOT_MODULE,
      importPath: SPARTACUS_USER_PROFILE_ROOT,
    },
    i18n: {
      resources: USER_PROFILE_TRANSLATIONS,
      chunks: USER_PROFILE_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_USER_PROFILE_ASSETS,
    },
    styles: {
      scssFileName: SCSS_FILE_NAME,
      importStyle: SPARTACUS_USER,
    },
  });
}
