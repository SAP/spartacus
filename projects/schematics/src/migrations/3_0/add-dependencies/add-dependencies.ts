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
import {
  addPackageJsonDependencies,
  ANGULAR_OAUTH2_OIDC,
  DEFAULT_ANGULAR_OAUTH2_OIDC_VERSION,
  installPackageJsonDependencies,
} from '../../../shared/index';

export function migrate(): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const dependencies: NodeDependency[] = [
      {
        type: NodeDependencyType.Default,
        version: DEFAULT_ANGULAR_OAUTH2_OIDC_VERSION,
        name: ANGULAR_OAUTH2_OIDC,
      },
    ];
    return chain([
      addPackageJsonDependencies(dependencies),
      installPackageJsonDependencies,
    ]);
  };
}
