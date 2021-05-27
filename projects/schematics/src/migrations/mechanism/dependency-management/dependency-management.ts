import { logging } from '@angular-devkit/core';
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
  createDependencies,
  readPackageJson,
} from '../../../shared/utils/package-utils';

export function migrateDependencies(
  tree: Tree,
  context: SchematicContext,
  removedDependencies: string[]
): Rule {
  context.logger.info('Updating dependencies...');

  const packageJson = readPackageJson(tree);
  const installedSpartacusLibs = collectSpartacusLibraryDependencies(
    packageJson
  );

  const dependencies = createSpartacusLibraryDependencies(
    installedSpartacusLibs
  );

  checkAndLogRemovedDependencies(
    packageJson,
    installedSpartacusLibs,
    removedDependencies,
    context.logger
  );

  return chain([
    addPackageJsonDependencies(dependencies),
    installPackageJsonDependencies(),
  ]);
}

function collectSpartacusLibraryDependencies(packageJson: any): string[] {
  const dependencies =
    (packageJson.dependencies as Record<string, string>) ?? {};
  return Object.keys(dependencies).filter((d) => d.startsWith(SPARTACUS_SCOPE));
}

function createSpartacusLibraryDependencies(
  installedSpartacusLibs: string[]
): NodeDependency[] {
  const dependenciesToAdd: NodeDependency[] = [];

  for (const libraryName of installedSpartacusLibs) {
    const spartacusLibrary = (collectedDependencies as Record<
      string,
      Record<string, string>
    >)[libraryName];

    dependenciesToAdd.push(...createDependencies(spartacusLibrary));
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

  const removed: string[] = [];
  for (const removedDependency of removedDependencies) {
    if (!dependencies[removedDependency]) {
      continue;
    }

    for (const libraryName of installedSpartacusLibs) {
      const spartacusLibrary = (collectedDependencies as Record<
        string,
        Record<string, string>
      >)[libraryName];

      if (spartacusLibrary[removedDependency]) {
        removed.push(removedDependency);
        break;
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
}
