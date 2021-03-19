import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import { isImported } from '@schematics/angular/utility/ast-utils';
import { Change, ReplaceChange } from '@schematics/angular/utility/change';
import {
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import {
  addLibraryFeature,
  addPackageJsonDependencies,
  B2B_STOREFRONT_MODULE,
  B2C_STOREFRONT_MODULE,
  commitChanges,
  createImportChange,
  findMultiLevelNodesByTextAndKind,
  getAppModule,
  getSpartacusSchematicsVersion,
  getTsSourceFile,
  installPackageJsonDependencies,
  LibraryOptions as SpartacusOrganizationOptions,
  readPackageJson,
  removeImport,
  shouldAddFeature,
  SPARTACUS_SETUP,
  SPARTACUS_STOREFRONTLIB,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import * as ts from 'typescript';
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
  SPARTACUS_ORGANIZATION,
} from '../constants';

export function addSpartacusOrganization(
  options: SpartacusOrganizationOptions
): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    const appModulePath = getAppModule(tree, options.project);

    return chain([
      updateAppModule(appModulePath),
      shouldAddFeature(options.features, CLI_ADMINISTRATION_FEATURE)
        ? addAdministrationFeature(options)
        : noop(),
      shouldAddFeature(options.features, CLI_ORDER_APPROVAL_FEATURE)
        ? addOrderApprovalsFeature(options)
        : noop(),
      addOrganizationPackageJsonDependencies(packageJson),
      installPackageJsonDependencies(),
    ]);
  };
}

function updateAppModule(appModulePath: string): Rule {
  return (host: Tree, _context: SchematicContext) => {
    const changes: Change[] = [];
    if (
      isImported(
        getTsSourceFile(host, appModulePath),
        B2C_STOREFRONT_MODULE,
        SPARTACUS_STOREFRONTLIB
      )
    ) {
      const importRemovalChange = removeImport(
        getTsSourceFile(host, appModulePath),
        {
          className: B2C_STOREFRONT_MODULE,
          importPath: SPARTACUS_STOREFRONTLIB,
        }
      );
      changes.push(importRemovalChange);
    }

    const b2cNodeResults = findMultiLevelNodesByTextAndKind(
      getTsSourceFile(host, appModulePath).getChildren(),
      B2C_STOREFRONT_MODULE,
      ts.SyntaxKind.Identifier
    );

    b2cNodeResults.forEach((result) => {
      // skip the `import {B2cStorefrontModule} from '@spartacus/storefront'` node
      if (result.parent.kind !== ts.SyntaxKind.ImportSpecifier) {
        const b2bModuleReplaceChange = new ReplaceChange(
          appModulePath,
          result.getStart(),
          B2C_STOREFRONT_MODULE,
          B2B_STOREFRONT_MODULE
        );
        changes.push(b2bModuleReplaceChange);
      }
    });

    commitChanges(host, appModulePath, changes);

    if (
      !isImported(
        getTsSourceFile(host, appModulePath),
        B2B_STOREFRONT_MODULE,
        SPARTACUS_SETUP
      )
    ) {
      const b2bModuleImportChange = createImportChange(
        host,
        appModulePath,
        B2B_STOREFRONT_MODULE,
        SPARTACUS_SETUP
      );
      commitChanges(host, appModulePath, [b2bModuleImportChange]);
    }

    return host;
  };
}

function addOrganizationPackageJsonDependencies(packageJson: any): Rule {
  const spartacusVersion = `^${getSpartacusSchematicsVersion()}`;
  const dependencies: NodeDependency[] = [
    {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_ORGANIZATION,
    },
    {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_SETUP,
    },
  ];
  return addPackageJsonDependencies(dependencies, packageJson);
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
