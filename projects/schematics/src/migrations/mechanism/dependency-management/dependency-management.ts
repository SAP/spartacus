/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
} from '../../../shared/libs-constants';
import { analyzeCrossLibraryDependenciesByLibraries } from '../../../shared/utils/dependency-utils';
import { installPackageJsonDependencies } from '../../../shared/utils/lib-utils';
import {
  createDependencies,
  readPackageJson,
  updatePackageJsonDependencies,
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
  const dependencies: Record<string, string> = packageJson.dependencies;
  const installedLibs = Object.keys(dependencies).filter((dependency) =>
    dependency.startsWith(SPARTACUS_SCOPE)
  );

  const spartacusPeerDeps =
    analyzeCrossLibraryDependenciesByLibraries(installedLibs);

  return {
    installedLibs,
    spartacusPeerDeps,
  };
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
  let allSpartacusDeps: string[] = [];
  for (const libraryName of installedSpartacusLibs) {
    const spartacusLibrary = (
      collectedDependencies as Record<string, Record<string, string>>
    )[libraryName];
    allSpartacusDeps = allSpartacusDeps.concat(Object.keys(spartacusLibrary));
  }

  const dependencies =
    (packageJson.dependencies as Record<string, string>) ?? {};
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
