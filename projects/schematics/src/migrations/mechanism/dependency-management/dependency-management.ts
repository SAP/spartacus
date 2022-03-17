import { logging } from '@angular-devkit/core';
import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import { NodeDependency } from '@schematics/angular/utility/dependencies';
import collectedDependencies from '../../../dependencies.json';
import {
  SPARTACUS_SCHEMATICS,
  SPARTACUS_SCOPE,
} from '../../../shared/constants';
import {
  installPackageJsonDependencies,
  updatePackageJsonDependencies,
} from '../../../shared/utils/lib-utils';
import {
  CORE_SPARTACUS_SCOPES,
  createDependencies,
  readPackageJson,
} from '../../../shared/utils/package-utils';

export function migrateDependencies(
  tree: Tree,
  context: SchematicContext,
  removedDependencies: string[]
): Rule {
  const packageJson = readPackageJson(tree);
  const { spartacusPeerDeps, installedLibs } =
    collectSpartacusLibraryDependencies(packageJson);
  const allSpartacusDeps = installedLibs.concat(spartacusPeerDeps);

  checkAndLogRemovedDependencies(
    packageJson,
    allSpartacusDeps,
    removedDependencies,
    context.logger
  );

  const dependencies = createSpartacusLibraryDependencies(
    allSpartacusDeps,
    installedLibs
  )
    .filter((d) => d.name !== SPARTACUS_SCHEMATICS)
    .sort((d1, d2) => d1.name.localeCompare(d2.name));
  return chain([
    updatePackageJsonDependencies(dependencies, packageJson),
    installPackageJsonDependencies(),
  ]);
}

function collectSpartacusLibraryDependencies(packageJson: any): {
  installedLibs: string[];
  spartacusPeerDeps: string[];
} {
  const dependencies =
    (packageJson.dependencies as Record<string, string>) ?? {};
  const installedLibs = Object.keys(dependencies).filter((dep) =>
    dep.startsWith(SPARTACUS_SCOPE)
  );

  let spartacusPeerDeps: string[] = [];
  for (const spartacusLib of installedLibs) {
    spartacusPeerDeps = collectSpartacusPeerDeps(
      spartacusPeerDeps,
      spartacusLib
    );
  }

  // remove the duplicates
  spartacusPeerDeps = Array.from(new Set<string>(spartacusPeerDeps));
  return {
    installedLibs,
    spartacusPeerDeps,
  };
}

function collectSpartacusPeerDeps(
  collectedDeps: string[],
  name: string
): string[] {
  const peerDepsWithVersions = (
    collectedDependencies as Record<string, Record<string, string>>
  )[name];
  const peerDeps = Object.keys(peerDepsWithVersions)
    .filter((d) => d.startsWith(SPARTACUS_SCOPE))
    .filter((d) => !CORE_SPARTACUS_SCOPES.includes(d))
    .filter((d) => !collectedDeps.includes(d));

  collectedDeps = collectedDeps.concat(peerDeps);
  for (const peerDep of peerDeps) {
    collectedDeps = collectSpartacusPeerDeps(collectedDeps, peerDep);
  }

  return collectedDeps;
}

function createSpartacusLibraryDependencies(
  allSpartacusLibraries: string[],
  skipScopes: string[]
): NodeDependency[] {
  const dependenciesToAdd: NodeDependency[] = [];

  for (const libraryName of allSpartacusLibraries) {
    const spartacusLibrary = (
      collectedDependencies as Record<string, Record<string, string>>
    )[libraryName];

    const newDependencies = createDependencies(spartacusLibrary, {
      skipScopes,
      overwrite: true,
    });

    // ensure no duplicates are created
    newDependencies.forEach((newDependency) => {
      if (
        !dependenciesToAdd.some(
          (existingDependency) => existingDependency.name === newDependency.name
        )
      ) {
        dependenciesToAdd.push(newDependency);
      }
    });
  }

  return dependenciesToAdd;
}

function checkAndLogRemovedDependencies(
  packageJson: any,
  installedSpartacusLibs: string[],
  removedDependencies: string[],
  logger: logging.LoggerApi
): void {
  const dependencies =
    (packageJson.dependencies as Record<string, string>) ?? {};

  let allSpartacusDeps: string[] = [];
  for (const libraryName of installedSpartacusLibs) {
    const spartacusLibrary = (
      collectedDependencies as Record<string, Record<string, string>>
    )[libraryName];
    allSpartacusDeps = allSpartacusDeps.concat(Object.keys(spartacusLibrary));
  }

  const removed: string[] = [];
  for (const removedDependency of removedDependencies) {
    if (!dependencies[removedDependency]) {
      continue;
    }
    if (!allSpartacusDeps.includes(removedDependency)) {
      removed.push(removedDependency);
    }
  }

  if (removed.length) {
    logger.warn(
      `Spartacus libraries no longer require the following dependencies: ${removed.join(
        ','
      )}. If you don't use these dependencies in your application, you might want to consider removing them from your dependencies list.`
    );
  }
}
