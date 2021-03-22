import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addLibraryFeature,
  installPackageJsonDependencies,
  LibraryOptions as SpartacusOrganizationOptions,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_ORGANIZATION,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import {
  ADMINISTRATION_MODULE,
  ADMINISTRATION_ROOT_MODULE,
  CLI_ADMINISTRATION_FEATURE,
  CLI_ORDER_APPROVAL_FEATURE,
  ORDER_APPROVAL_MODULE,
  ORDER_APPROVAL_ROOT_MODULE,
  ORDER_APPROVAL_TRANSLATIONS,
  ORDER_APPROVAL_TRANSLATION_CHUNKS_CONFIG,
  ORGANIZATION_ADMINISTRATION_FEATURE_NAME,
  ORGANIZATION_ORDER_APPROVAL_FEATURE_NAME,
  ORGANIZATION_TRANSLATIONS,
  ORGANIZATION_TRANSLATION_CHUNKS_CONFIG,
  SCSS_FILE_NAME,
  SPARTACUS_ADMINISTRATION,
  SPARTACUS_ADMINISTRATION_ASSETS,
  SPARTACUS_ADMINISTRATION_ROOT,
  SPARTACUS_ORDER_APPROVAL,
  SPARTACUS_ORDER_APPROVAL_ASSETS,
  SPARTACUS_ORDER_APPROVAL_ROOT,
} from '../constants';

export function addSpartacusOrganization(
  options: SpartacusOrganizationOptions
): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      shouldAddFeature(options.features, CLI_ADMINISTRATION_FEATURE)
        ? addAdministrationFeature(options)
        : noop(),
      shouldAddFeature(options.features, CLI_ORDER_APPROVAL_FEATURE)
        ? addOrderApprovalsFeature(options)
        : noop(),
      installPackageJsonDependencies(),
    ]);
  };
}

function addAdministrationFeature(options: SpartacusOrganizationOptions): Rule {
  return addLibraryFeature(options, {
    name: ORGANIZATION_ADMINISTRATION_FEATURE_NAME,
    featureModule: {
      name: ADMINISTRATION_MODULE,
      importPath: SPARTACUS_ADMINISTRATION,
    },
    rootModule: {
      name: ADMINISTRATION_ROOT_MODULE,
      importPath: SPARTACUS_ADMINISTRATION_ROOT,
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
    name: ORGANIZATION_ORDER_APPROVAL_FEATURE_NAME,
    featureModule: {
      name: ORDER_APPROVAL_MODULE,
      importPath: SPARTACUS_ORDER_APPROVAL,
    },
    rootModule: {
      name: ORDER_APPROVAL_ROOT_MODULE,
      importPath: SPARTACUS_ORDER_APPROVAL_ROOT,
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
