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
  DEFAULT_B2B_OCC_CONFIG,
  findMultiLevelNodesByTextAndKind,
  getAppModule,
  getSpartacusSchematicsVersion,
  getTsSourceFile,
  installPackageJsonDependencies,
  LibraryOptions as SpartacusCartOptions,
  readPackageJson,
  removeImport,
  shouldAddFeature,
  SPARTACUS_SETUP,
  SPARTACUS_STOREFRONTLIB,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import * as ts from 'typescript';
import {
  CART_SAVED_CART_FEATURE_NAME,
  CLI_SAVED_CART_FEATURE,
  SAVED_CART_MODULE,
  SAVED_CART_ROOT_MODULE,
  SAVED_CART_TRANSLATIONS,
  SAVED_CART_TRANSLATION_CHUNKS_CONFIG,
  SCSS_FILE_NAME,
  SPARTACUS_CART,
  SPARTACUS_SAVED_CART,
  SPARTACUS_SAVED_CART_ASSETS,
  SPARTACUS_SAVED_CART_ROOT,
} from '../constants';

export function addSpartacusCart(options: SpartacusCartOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    const appModulePath = getAppModule(tree, options.project);

    return chain([
      updateAppModule(appModulePath),
      shouldAddFeature(options.features, CLI_SAVED_CART_FEATURE)
        ? addSavedCartFeature(appModulePath, options)
        : noop(),
      addCartPackageJsonDependencies(packageJson),
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

function addCartPackageJsonDependencies(packageJson: any): Rule {
  const spartacusVersion = `^${getSpartacusSchematicsVersion()}`;
  const dependencies: NodeDependency[] = [
    {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_CART,
    },
    {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_SETUP,
    },
  ];
  return addPackageJsonDependencies(dependencies, packageJson);
}

function addSavedCartFeature(
  appModulePath: string,
  options: SpartacusCartOptions
): Rule {
  return addLibraryFeature(appModulePath, options, {
    name: CART_SAVED_CART_FEATURE_NAME,
    defaultConfig: {
      name: DEFAULT_B2B_OCC_CONFIG,
      importPath: SPARTACUS_SETUP,
    },
    featureModule: {
      name: SAVED_CART_MODULE,
      importPath: SPARTACUS_SAVED_CART,
    },
    rootModule: {
      name: SAVED_CART_ROOT_MODULE,
      importPath: SPARTACUS_SAVED_CART_ROOT,
    },
    i18n: {
      resources: SAVED_CART_TRANSLATIONS,
      chunks: SAVED_CART_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_SAVED_CART_ASSETS,
    },
    styles: {
      scssFileName: SCSS_FILE_NAME,
      importStyle: SPARTACUS_CART,
    },
  });
}
