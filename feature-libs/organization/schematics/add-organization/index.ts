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
  ADMINISTRATION_MODULE,
  ADMINISTRATION_ROOT_MODULE,
  CLI_ORGANIZATION_ADMINISTRATION_FEATURE,
  CLI_ORGANIZATION_ORDER_APPROVAL_FEATURE,
  CLI_ORGANIZATION_USER_REGISTRATION_FEATURE,
  configureB2bFeatures,
  LibraryOptions as SpartacusOrganizationOptions,
  ORDER_APPROVAL_MODULE,
  ORDER_APPROVAL_ROOT_MODULE,
  ORGANIZATION_USER_REGISTRATION_MODULE,
  ORGANIZATION_USER_REGISTRATION_ROOT_MODULE,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_ORGANIZATION,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import {
  USER_REGISTRATION_TRANSLATIONS,
  USER_REGISTRATION_TRANSLATION_CHUNKS_CONFIG,
  ORDER_APPROVAL_TRANSLATIONS,
  ORDER_APPROVAL_TRANSLATION_CHUNKS_CONFIG,
  ORGANIZATION_ADMINISTRATION_FEATURE_NAME_CONSTANT,
  ORGANIZATION_ADMINISTRATION_MODULE_NAME,
  ORGANIZATION_FOLDER_NAME,
  ORGANIZATION_ORDER_APPROVAL_FEATURE_NAME_CONSTANT,
  ORGANIZATION_ORDER_APPROVAL_MODULE_NAME,
  ORGANIZATION_USER_REGISTRATION_FEATURE_NAME_CONSTANT,
  ORGANIZATION_USER_REGISTRATION_MODULE_NAME,
  ORGANIZATION_TRANSLATIONS,
  ORGANIZATION_TRANSLATION_CHUNKS_CONFIG,
  SCSS_FILE_NAME,
  SPARTACUS_ADMINISTRATION,
  SPARTACUS_ADMINISTRATION_ASSETS,
  SPARTACUS_ADMINISTRATION_ROOT,
  SPARTACUS_ORDER_APPROVAL,
  SPARTACUS_ORDER_APPROVAL_ASSETS,
  SPARTACUS_ORDER_APPROVAL_ROOT,
  SPARTACUS_USER_REGISTRATION,
  SPARTACUS_USER_REGISTRATION_ASSETS,
  SPARTACUS_USER_REGISTRATION_ROOT,
} from './../constants';
import { peerDependencies } from '../../package.json';

export function addSpartacusOrganization(
  options: SpartacusOrganizationOptions
): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      shouldAddFeature(
        CLI_ORGANIZATION_ADMINISTRATION_FEATURE,
        options.features
      )
        ? chain([
            addAdministrationFeature(options),
            configureB2bFeatures(options, packageJson),
          ])
        : noop(),

      shouldAddFeature(
        CLI_ORGANIZATION_ORDER_APPROVAL_FEATURE,
        options.features
      )
        ? chain([
            addOrderApprovalsFeature(options),
            configureB2bFeatures(options, packageJson),
          ])
        : noop(),

      shouldAddFeature(
        CLI_ORGANIZATION_USER_REGISTRATION_FEATURE,
        options.features
      )
        ? chain([
            addUserRegistrationFeature(options),
            configureB2bFeatures(options, packageJson),
          ])
        : noop(),
    ]);
  };
}

function addAdministrationFeature(options: SpartacusOrganizationOptions): Rule {
  return addLibraryFeature(options, {
    folderName: ORGANIZATION_FOLDER_NAME,
    moduleName: ORGANIZATION_ADMINISTRATION_MODULE_NAME,
    featureModule: {
      name: ADMINISTRATION_MODULE,
      importPath: SPARTACUS_ADMINISTRATION,
    },
    rootModule: {
      name: ADMINISTRATION_ROOT_MODULE,
      importPath: SPARTACUS_ADMINISTRATION_ROOT,
    },
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_ADMINISTRATION_ROOT,
      namedImports: [ORGANIZATION_ADMINISTRATION_FEATURE_NAME_CONSTANT],
    },
    i18n: {
      resources: ORGANIZATION_TRANSLATIONS,
      chunks: ORGANIZATION_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_ADMINISTRATION_ASSETS,
    },
    styles: {
      scssFileName: SCSS_FILE_NAME,
      importStyle: SPARTACUS_ORGANIZATION,
    },
  });
}

function addOrderApprovalsFeature(options: SpartacusOrganizationOptions): Rule {
  return addLibraryFeature(options, {
    folderName: ORGANIZATION_FOLDER_NAME,
    moduleName: ORGANIZATION_ORDER_APPROVAL_MODULE_NAME,
    featureModule: {
      name: ORDER_APPROVAL_MODULE,
      importPath: SPARTACUS_ORDER_APPROVAL,
    },
    rootModule: {
      name: ORDER_APPROVAL_ROOT_MODULE,
      importPath: SPARTACUS_ORDER_APPROVAL_ROOT,
    },
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_ORDER_APPROVAL_ROOT,
      namedImports: [ORGANIZATION_ORDER_APPROVAL_FEATURE_NAME_CONSTANT],
    },
    i18n: {
      resources: ORDER_APPROVAL_TRANSLATIONS,
      chunks: ORDER_APPROVAL_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_ORDER_APPROVAL_ASSETS,
    },
    styles: {
      scssFileName: SCSS_FILE_NAME,
      importStyle: SPARTACUS_ORGANIZATION,
    },
  });
}

function addUserRegistrationFeature(
  options: SpartacusOrganizationOptions
): Rule {
  return addLibraryFeature(options, {
    folderName: ORGANIZATION_FOLDER_NAME,
    moduleName: ORGANIZATION_USER_REGISTRATION_MODULE_NAME,
    featureModule: {
      name: ORGANIZATION_USER_REGISTRATION_MODULE,
      importPath: SPARTACUS_USER_REGISTRATION,
    },
    rootModule: {
      name: ORGANIZATION_USER_REGISTRATION_ROOT_MODULE,
      importPath: SPARTACUS_USER_REGISTRATION_ROOT,
    },
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_USER_REGISTRATION_ROOT,
      namedImports: [ORGANIZATION_USER_REGISTRATION_FEATURE_NAME_CONSTANT],
    },
    i18n: {
      resources: USER_REGISTRATION_TRANSLATIONS,
      chunks: USER_REGISTRATION_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_USER_REGISTRATION_ASSETS,
    },
    styles: {
      scssFileName: SCSS_FILE_NAME,
      importStyle: SPARTACUS_ORGANIZATION,
    },
  });
}
