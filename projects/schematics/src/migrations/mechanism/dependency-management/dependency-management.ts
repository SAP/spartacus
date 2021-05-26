import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import { NodeDependency } from '@schematics/angular/utility/dependencies';
import collectedDependencies from '../../../dependencies.json';
import { SPARTACUS_SCOPE } from '../../../shared/constants';
import {
  addPackageJsonDependencies,
  installPackageJsonDependencies,
} from '../../../shared/utils/lib-utils';
import {
  CORE_SPARTACUS_SCOPES,
  createDependencies,
  prepare3rdPartyDependencies,
  readPackageJson,
} from '../../../shared/utils/package-utils';

export function migrate(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const spartacusDependencies = collectSpartacusLibraryDependencies(
      readPackageJson(tree)
    );

    const thirdPartyDependencies = prepare3rdPartyDependencies();
    const libraryDependencies = createSpartacusLibraryDependencies(
      spartacusDependencies
    );

    const dependencies = thirdPartyDependencies.concat(libraryDependencies);
    return chain([
      addPackageJsonDependencies(dependencies),
      installPackageJsonDependencies(),
    ]);
  };
}

function collectSpartacusLibraryDependencies(packageJson: any): string[] {
  const dependencies = packageJson.dependencies as Record<string, string>;
  return Object.keys(dependencies)
    .filter((d) => d.startsWith(SPARTACUS_SCOPE))
    .filter((d) => !CORE_SPARTACUS_SCOPES.includes(d));
}

function createSpartacusLibraryDependencies(
  spartacusDependencies: string[]
): NodeDependency[] {
  const dependenciesToAdd: NodeDependency[] = [];

  for (const libraryName of spartacusDependencies) {
    const spartacusLibrary = (collectedDependencies as Record<
      string,
      Record<string, string>
    >)[libraryName];

    dependenciesToAdd.push(...createDependencies(spartacusLibrary));
  }

  return dependenciesToAdd;
}
