import {
  chain,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { noop } from 'rxjs';
import { ANGULAR_LOCALIZE } from '../../../shared/constants';
import { getAngularVersion } from '../../../shared/utils/package-utils';

function addPackageJsonDependencies(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const angularVersion = getAngularVersion(tree);
    const dependencies: NodeDependency[] = [
      {
        type: NodeDependencyType.Default,
        version: angularVersion,
        name: ANGULAR_LOCALIZE,
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
    context.addTask(new NodePackageInstallTask());
    context.logger.log('info', `🔍 Installing packages...`);
    return tree;
  };
}

function isAngularLocalizeInstalled(tree: Tree): boolean {
  const pkgPath = '/package.json';
  const buffer = tree.read(pkgPath);
  if (!buffer) {
    throw new SchematicsException('Could not find package.json');
  }

  return buffer.toString().includes(ANGULAR_LOCALIZE);
}

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const angularLocalizeInstalled = isAngularLocalizeInstalled(tree);
    if (angularLocalizeInstalled) {
      context.logger.info(
        `Skipping the installation of ${ANGULAR_LOCALIZE} as it's already installed.`
      );
    } else {
      context.logger.warn(
        `Please run the following: ng add ${ANGULAR_LOCALIZE}`
      );
    }

    return angularLocalizeInstalled
      ? noop()
      : chain([addPackageJsonDependencies(), installPackageJsonDependencies()])(
          tree,
          context
        );
  };
}
