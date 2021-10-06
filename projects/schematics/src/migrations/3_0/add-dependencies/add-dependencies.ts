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
  installPackageJsonDependencies,
  readPackageJson,
} from '../../../shared/index';

export function migrate(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const dependencies: NodeDependency[] = [
      {
        type: NodeDependencyType.Default,
        version: '^10.0.0',
        name: ANGULAR_OAUTH2_OIDC,
      },
    ];
    return chain([
      addPackageJsonDependencies(dependencies, readPackageJson(tree)),
      installPackageJsonDependencies,
    ]);
  };
}
