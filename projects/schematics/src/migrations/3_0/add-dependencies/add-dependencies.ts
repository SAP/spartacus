import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import {
  ANGULAR_OAUTH2_OIDC,
  DEFAULT_ANGULAR_OAUTH2_OIDC_VERSION,
} from '../../../shared/index';

export function migrate(): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    return chain([
      addPackageJsonDependencies(),
      installPackageJsonDependencies,
    ]);
  };
}

function addPackageJsonDependencies() {
  return (tree: Tree, context: SchematicContext) => {
    const dependencies: NodeDependency[] = [
      {
        type: NodeDependencyType.Default,
        version: DEFAULT_ANGULAR_OAUTH2_OIDC_VERSION,
        name: ANGULAR_OAUTH2_OIDC,
      },
    ];

    dependencies.forEach((dependency) => {
      addPackageJsonDependency(tree, dependency);
      context.logger.info(
        `✅️ Added '${dependency.name}' into ${dependency.type}`
      );
    });
  };
}

function installPackageJsonDependencies(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.logger.log('info', `🔍 Installing packages...`);
    return tree;
  };
}
