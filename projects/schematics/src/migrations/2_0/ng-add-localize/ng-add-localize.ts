import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { noop } from 'rxjs';
import { ANGULAR_LOCALIZE } from '../../../shared/constants';
import {
  addPackageJsonDependencies,
  installPackageJsonDependencies,
} from '../../../shared/utils/lib-utils';
import {
  getAngularVersion,
  isAngularLocalizeInstalled,
} from '../../../shared/utils/package-utils';

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

    const angularVersion = getAngularVersion(tree);
    const dependencies: NodeDependency[] = [
      {
        type: NodeDependencyType.Default,
        version: angularVersion,
        name: ANGULAR_LOCALIZE,
      },
    ];

    return angularLocalizeInstalled
      ? noop()
      : chain([
          addPackageJsonDependencies(dependencies),
          installPackageJsonDependencies(),
        ]);
  };
}
