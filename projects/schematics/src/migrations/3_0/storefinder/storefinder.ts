import {
  chain,
  externalSchematic,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  getDecoratorMetadata,
  getMetadataField,
  isImported,
} from '@schematics/angular/utility/ast-utils';
import { Change, RemoveChange } from '@schematics/angular/utility/change';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import * as ts from 'typescript';
import {
  ANGULAR_CORE,
  commitChanges,
  getDefaultProjectNameFromWorkspace,
  getSpartacusSchematicsVersion,
  getTsSourceFile,
  readPackageJson,
  removeImport,
  SPARTACUS_MISC,
  SPARTACUS_STOREFRONTLIB,
  STOREFINDER_MODULE,
  STOREFRONT_MODULE,
} from '../../../shared/index';
import {
  getAngularJsonFile,
  validateSpartacusInstallation,
} from '../../../shared/utils/workspace-utils';

export function migrate(): Rule {
  return async (host: Tree) => {
    return (await isStorefinderPresent(host))
      ? chain([
          removeOldSetup(),
          addPackageJsonDependencies(),
          installPackageJsonDependencies(),
          externalSchematic(
            SPARTACUS_MISC,
            'ng-add',
            {},
            { interactive: false }
          ),
        ])
      : noop();
  };
}

async function isStorefinderPresent(tree: Tree): Promise<boolean> {
  const packageJson = readPackageJson(tree);
  validateSpartacusInstallation(packageJson);

  const projectName = getDefaultProjectNameFromWorkspace(tree);
  const angularJson = getAngularJsonFile(tree);
  const mainPath =
    angularJson.projects[projectName]?.architect?.build?.options?.main;
  if (!mainPath) {
    throw new SchematicsException(`No main path specified in angular.json.`);
  }
  const appModulePath = getAppModulePath(tree, mainPath);
  const appModuleSource = getTsSourceFile(tree, appModulePath);
  return (
    isImported(appModuleSource, STOREFINDER_MODULE, SPARTACUS_STOREFRONTLIB) ||
    isImported(appModuleSource, STOREFRONT_MODULE, SPARTACUS_STOREFRONTLIB)
  );
}

function removeOldSetup(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const projectName = getDefaultProjectNameFromWorkspace(tree);
    const angularJson = getAngularJsonFile(tree);
    const mainPath =
      angularJson.projects[projectName]?.architect?.build?.options?.main;
    if (!mainPath) {
      throw new SchematicsException(`No main path specified in angular.json.`);
    }
    const appModulePath = getAppModulePath(tree, mainPath);
    const appModuleSource = getTsSourceFile(tree, appModulePath);

    const changes: Change[] = [];
    if (
      isImported(appModuleSource, STOREFINDER_MODULE, SPARTACUS_STOREFRONTLIB)
    ) {
      const importRemovalChanges = removeImport(
        appModuleSource,
        appModulePath,
        {
          className: STOREFINDER_MODULE,
          importPath: SPARTACUS_STOREFRONTLIB,
        }
      );
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

function addPackageJsonDependencies(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const miscVersion = getSpartacusSchematicsVersion();
    const dependencies: NodeDependency[] = [
      {
        type: NodeDependencyType.Default,
        version: miscVersion,
        name: SPARTACUS_MISC,
      },
    ];

    dependencies.forEach((dependency) => {
      addPackageJsonDependency(tree, dependency);
      context.logger.log(
        'info',
        `✅️ Added '${dependency.name}' into ${dependency.type}`
      );
    });

    return tree;
  };
}

function installPackageJsonDependencies(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    console.log('xxx installPackageJsonDependencies');
    context.addTask(new NodePackageInstallTask());
    context.logger.log('info', `🔍 Installing packages...`);
    return tree;
  };
}
