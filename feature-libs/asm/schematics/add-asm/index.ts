import {
  chain,
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
  LibraryOptions as SpartacusAsmOptions,
  readPackageJson,
  removeImport,
  SPARTACUS_SETUP,
  SPARTACUS_STOREFRONTLIB,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import * as ts from 'typescript';
import {
  ASM_FEATURE_NAME,
  ASM_MODULE,
  ASM_ROOT_MODULE,
  ASM_TRANSLATIONS,
  ASM_TRANSLATION_CHUNKS_CONFIG,
  SPARTACUS_ASM,
  SPARTACUS_ASM_ASSETS,
  SPARTACUS_ASM_ROOT,
} from '../constants';

export function addAsmFeatures(options: SpartacusAsmOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    const appModulePath = getAppModule(tree, options.project);

    return chain([
      updateAppModule(appModulePath),
      addAsmFeature(appModulePath, options),
      addAsmPackageJsonDependencies(packageJson),
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

function addAsmFeature(
  appModulePath: string,
  options: SpartacusAsmOptions
): Rule {
  return addLibraryFeature(appModulePath, options, {
    name: ASM_FEATURE_NAME,
    defaultConfig: {
      name: DEFAULT_B2B_OCC_CONFIG,
      importPath: SPARTACUS_SETUP,
    },
    featureModule: {
      name: ASM_MODULE,
      importPath: SPARTACUS_ASM,
    },
    rootModule: {
      name: ASM_ROOT_MODULE,
      importPath: SPARTACUS_ASM_ROOT,
    },
    i18n: {
      resources: ASM_TRANSLATIONS,
      chunks: ASM_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_ASM_ASSETS,
    },
    /*styles: {
      scssFileName: STORE_FINDER_SCSS_FILE_NAME,
      importStyle: SPARTACUS_STOREFINDER,
    },*/
  });
}

function addAsmPackageJsonDependencies(packageJson: any): Rule {
  const spartacusVersion = `^${getSpartacusSchematicsVersion()}`;
  const dependencies: NodeDependency[] = [
    {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_ASM,
    },
    /*{
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_SETUP,
    },*/
  ];
  return addPackageJsonDependencies(dependencies, packageJson);
}
