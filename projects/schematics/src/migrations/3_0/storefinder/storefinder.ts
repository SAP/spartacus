import {
  chain,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import {
  getDecoratorMetadata,
  getMetadataField,
  isImported,
} from '@schematics/angular/utility/ast-utils';
import { Change, RemoveChange } from '@schematics/angular/utility/change';
import {
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import ts from 'typescript';
import {
  addPackageJsonDependencies,
  ANGULAR_CORE,
  commitChanges,
  getDefaultProjectNameFromWorkspace,
  getSpartacusSchematicsVersion,
  getTsSourceFile,
  installPackageJsonDependencies,
  readPackageJson,
  removeImport,
  SPARTACUS_STOREFINDER,
  SPARTACUS_STOREFRONTLIB,
  STOREFINDER_MODULE,
  STOREFRONT_MODULE,
} from '../../../shared/index';
import {
  getAngularJsonFile,
  validateSpartacusInstallation,
} from '../../../shared/utils/workspace-utils';

export function migrate(): Rule {
  return async (tree: Tree) => {
    const packageJson = readPackageJson(tree);

    const projectName = getDefaultProjectNameFromWorkspace(tree);
    const angularJson = getAngularJsonFile(tree);
    const mainPath = (
      angularJson.projects[projectName]?.architect?.build?.options as any
    )?.main;
    if (!mainPath) {
      throw new SchematicsException(`No main path specified in angular.json.`);
    }
    const appModulePath = getAppModulePath(tree, mainPath);

    return (await isStorefinderPresent(tree, packageJson, appModulePath))
      ? chain([
          removeOldSetup(appModulePath),

          addStorefinderPackageJsonDependencies(packageJson),
          // TODO: Re-enable once we have migration to new app structure
          // newStructureMigration(),
          // addStorefinderFeature(),
          installPackageJsonDependencies(),
        ])
      : noop();
  };
}

async function isStorefinderPresent(
  tree: Tree,
  packageJson: any,
  appModulePath: string
): Promise<boolean> {
  validateSpartacusInstallation(packageJson);
  const appModuleSource = getTsSourceFile(tree, appModulePath);
  return (
    isImported(appModuleSource, STOREFINDER_MODULE, SPARTACUS_STOREFRONTLIB) ||
    isImported(appModuleSource, STOREFRONT_MODULE, SPARTACUS_STOREFRONTLIB)
  );
}

function removeOldSetup(appModulePath: string): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const appModuleSource = getTsSourceFile(tree, appModulePath);

    const changes: Change[] = [];
    if (
      isImported(appModuleSource, STOREFINDER_MODULE, SPARTACUS_STOREFRONTLIB)
    ) {
      const importRemovalChanges = removeImport(appModuleSource, {
        className: STOREFINDER_MODULE,
        importPath: SPARTACUS_STOREFRONTLIB,
      });
      changes.push(importRemovalChanges);

      const node = getDecoratorMetadata(
        appModuleSource,
        'NgModule',
        ANGULAR_CORE
      )[0];
      const assignment = getMetadataField(
        node as ts.ObjectLiteralExpression,
        'imports'
      )[0] as ts.PropertyAssignment;
      const arrLiteral = assignment.initializer as ts.ArrayLiteralExpression;
      if (arrLiteral.elements.length !== 0) {
        arrLiteral.elements.every((el) => {
          if (el.getText() === STOREFINDER_MODULE) {
            const removeFromModulesArrayChange = new RemoveChange(
              appModulePath,
              el.getStart(),
              `${STOREFINDER_MODULE},`
            );
            changes.push(removeFromModulesArrayChange);
            return false;
          }

          return el;
        });
      }
    }

    commitChanges(tree, appModulePath, changes);
  };
}

function addStorefinderPackageJsonDependencies(packageJson: any): Rule {
  const spartacusVersion = `^${getSpartacusSchematicsVersion()}`;
  const dependencies: NodeDependency[] = [
    {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_STOREFINDER,
    },
  ];
  return addPackageJsonDependencies(dependencies, packageJson);
}

// function addStorefinderFeature(): Rule {
//   return addLibraryFeature(
//     { lazy: false, project: '', features: [CLI_STOREFINDER_FEATURE] },
//     {
//       name: STOREFINDER_FEATURE_NAME,
//       featureModule: {
//         name: STOREFINDER_MODULE,
//         importPath: SPARTACUS_STOREFINDER,
//       },
//       rootModule: {
//         name: STOREFINDER_ROOT_MODULE,
//         importPath: SPARTACUS_STOREFINDER_ROOT,
//       },
//       i18n: {
//         resources: STOREFINDER_TRANSLATIONS,
//         chunks: STOREFINDER_TRANSLATION_CHUNKS_CONFIG,
//         importPath: SPARTACUS_STOREFINDER_ASSETS,
//       },
//       styles: {
//         scssFileName: STORE_FINDER_SCSS_FILE_NAME,
//         importStyle: SPARTACUS_STOREFINDER,
//       },
//     }
//   );
// }
