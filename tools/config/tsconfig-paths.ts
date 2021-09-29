/**
 * Purpose of this script is to check/set correctly all required paths in `compilerOptions.paths` property in all our `tsconfig` files.
 * Use after adding new library or new entry point, or moving libraries in file system.
 *
 * This script is based on number of assumptions:
 * - libraries live in `core-libs`, `feature-libs`, `integration-libs` and `projects` directories (not in subdirectories!)
 * - libraries have all dependencies specified in their `package.json`
 * - all dependencies to other spartacus libs are peerDependencies
 * - script is run from the root project directory `ts-node ./tools/tsconfig-paths/index.ts`
 * - each entry point have it's own `ng-package.json` file
 * - we have `prettier:fix` script for formatting files
 * - libraries have `tsconfig.lib.json` files for configuration
 * - libraries have `tsconfig.schematics.json` files for schematics configuration
 * - all entry points are `.ts` files
 */

import chalk from 'chalk';
import { assign, parse, stringify } from 'comment-json';
import fs from 'fs';
import glob from 'glob';
import path from 'path';
import { SPARTACUS_SCHEMATICS, SPARTACUS_SCOPE } from './const';
import {
  error,
  Library,
  logUpdatedFile,
  ProgramOptions,
  reportProgress,
  Repository,
  success,
} from './index';

function readTsConfigFile(path: string): any {
  return parse(fs.readFileSync(path, 'utf-8'));
}

function setCompilerOptionsPaths(tsconfigPath: string, paths: Object) {
  const tsConfigContent = readTsConfigFile(tsconfigPath);
  assign(tsConfigContent.compilerOptions, { paths });
  fs.writeFileSync(tsconfigPath, stringify(tsConfigContent, null, 2));
}

function joinPaths(...parts: string[]) {
  return path.join(...parts).replace(/\\/g, '/');
}

interface LibraryWithSpartacusDeps extends Library {
  /**
   * All spartacus packages that this library depend on.
   */
  spartacusDependencies: string[];
}

/**
 * Checks and updates tsconfig files across repository.
 */
export function manageTsConfigs(
  repository: Repository,
  options: ProgramOptions
) {
  const libraries: Record<string, LibraryWithSpartacusDeps> = Object.values(
    repository
  )
    .map((lib) => {
      return {
        ...lib,
        spartacusDependencies: Object.keys(
          lib.peerDependencies ?? {}
        ).filter((dep) => dep.startsWith(`${SPARTACUS_SCOPE}/`)),
      };
    })
    .reduce((acc: Record<string, LibraryWithSpartacusDeps>, lib) => {
      acc[lib.name] = lib;
      return acc;
    }, {});

  handleSchematicsConfigs(libraries, options);
  handleLibConfigs(libraries, options);
  handleRootConfigs(libraries, options);
  handleAppConfigs(libraries, options);
}

/**
 * Compare target paths with current paths and reports extra or missing entries.
 *
 * @param targetPaths paths that should be in the file
 * @param tsConfigPath path to targeted config
 * @param silent set to tru if you don't want to output errors (eg. in fix mode)
 *
 * @returns true when there were some errors
 */
function comparePathsConfigs(
  targetPaths: Record<string, string[]>,
  tsConfigPath: string,
  silent = false
): boolean {
  const tsConfig = readTsConfigFile(tsConfigPath);
  const currentPaths: Record<string, string[]> =
    tsConfig?.compilerOptions?.paths ?? {};
  const errors: string[] = [];
  Object.keys(currentPaths).forEach((key) => {
    if (typeof targetPaths[key] === 'undefined') {
      errors.push(
        `Key ${chalk.bold(key)} should not be present in ${chalk.bold(
          `compilerOptions.paths`
        )}.`
      );
    }
  });
  Object.entries(targetPaths).forEach(([key, value]) => {
    if (typeof currentPaths[key] === 'undefined') {
      errors.push(
        `Property ${chalk.bold(
          `"${key}": ["${value[0]}"]`
        )} is missing in ${chalk.bold('compilerOptions.paths')}.`
      );
    } else if (value[0] !== currentPaths[key][0]) {
      errors.push(
        `Key ${chalk.bold(key)} should have value ${chalk.bold(
          `[${value[0]}]`
        )} in ${chalk.bold('compilerOptions.paths')}.`
      );
    }
  });
  if (!silent && errors.length > 0) {
    error(tsConfigPath, errors, [
      `This can be automatically fixed by running \`${chalk.bold(
        `yarn config:update`
      )}\`.`,
    ]);
  }
  return errors.length > 0;
}

/**
 * Compares paths and reports errors or updates configs.
 *
 * @returns true when there were some errors
 */
function handleConfigUpdate(
  targetPaths: any,
  file: string,
  options: ProgramOptions
): boolean {
  const errorsPresent = comparePathsConfigs(targetPaths, file, options.fix);
  if (errorsPresent && options.fix) {
    setCompilerOptionsPaths(file, targetPaths);
    logUpdatedFile(file);
  }
  return errorsPresent;
}

/**
 * When library have its own schematics ts config (tsconfig.schematics.json exists) and have
 * schematics as peerDependency we add path to `@spartacus/schematics` lib.
 */
function handleSchematicsConfigs(
  libraries: Record<string, LibraryWithSpartacusDeps>,
  options: ProgramOptions
): void {
  const targetPaths = {
    [SPARTACUS_SCHEMATICS]: ['../../projects/schematics/index'],
  };
  if (options.fix) {
    reportProgress('Updating tsconfig.schematics.json files');
  } else {
    reportProgress('Checking tsconfig.schematics.json files');
  }
  let showAllGood = true;
  Object.values(libraries).forEach((library) => {
    const schematicsTsConfigPaths = glob.sync(
      `${library.directory}/tsconfig.schematics.json`
    );
    if (
      schematicsTsConfigPaths.length &&
      library.spartacusDependencies.includes(SPARTACUS_SCHEMATICS)
    ) {
      const hadErrors = handleConfigUpdate(
        targetPaths,
        schematicsTsConfigPaths[0],
        options
      );
      if (hadErrors) {
        showAllGood = false;
      }
    }
  });
  if (showAllGood) {
    success();
  }
}

/**
 * Adds paths to spartacus dependencies in `tsconfig.lib.json` files.
 * We grab all spartacus dependencies and add for all of them all entry points.
 */
function handleLibConfigs(
  libraries: Record<string, LibraryWithSpartacusDeps>,
  options: ProgramOptions
): void {
  if (options.fix) {
    reportProgress('Updating tsconfig.lib.json files');
  } else {
    reportProgress('Checking tsconfig.lib.json files');
  }
  let showAllGood = true;
  Object.values(libraries).forEach((library) => {
    const libraryTsConfigPaths = glob.sync(
      `${library.directory}/tsconfig.lib.json`
    );
    if (libraryTsConfigPaths.length) {
      // Collect all spartacus dependencies for this lib (also dependencies of dependencies)
      let previousSize = 0;
      const dependencies = new Set(library.spartacusDependencies);
      // We collect the dependencies till we have keep adding.
      while (dependencies.size !== previousSize) {
        previousSize = dependencies.size;
        let subDependencies = new Set<string>();
        dependencies.forEach((dependency) => {
          libraries[dependency].spartacusDependencies.forEach(
            (subDependency) => {
              subDependencies.add(subDependency);
            }
          );
        });
        subDependencies.forEach((subDependency) => {
          dependencies.add(subDependency);
        });
      }
      let dependenciesEntryPoints = Array.from(dependencies)
        // @spartacus/schematics library should be used only in `tsconfig.schematics.json` file.
        .filter((dependency) => dependency !== SPARTACUS_SCHEMATICS)
        .map((library) => libraries[library])
        .reduce((entryPoints, dependency) => {
          let dependencyEntryPoints = dependency.entryPoints.reduce(
            (acc, entry) => {
              return {
                ...acc,
                // In tsconfig.lib.json files we reference built paths. eg. `@spartacus/storefront`: ['dist/storefrontlib/public_api']
                [entry.entryPoint]: [
                  joinPaths('dist', dependency.distDir, entry.directory),
                ],
              };
            },
            {}
          );
          return { ...entryPoints, ...dependencyEntryPoints };
        }, {});
      const hadErrors = handleConfigUpdate(
        dependenciesEntryPoints,
        libraryTsConfigPaths[0],
        options
      );
      if (hadErrors) {
        showAllGood = false;
      }
    }
  });
  if (showAllGood) {
    success();
  }
}

/**
 * Add paths to all libraries and all their entry points to root `tsconfig.json` and `tsconfig.compodoc.json` files.
 */
function handleRootConfigs(
  libraries: Record<string, LibraryWithSpartacusDeps>,
  options: ProgramOptions
): void {
  if (options.fix) {
    reportProgress('Updating root tsconfig files');
  } else {
    reportProgress('Checking root tsconfig files');
  }
  let showAllGood = true;
  const entryPoints = Object.values(libraries).reduce(
    (acc, curr) => {
      curr.entryPoints.forEach((entryPoint) => {
        acc[entryPoint.entryPoint] = [
          // We reference source files entry points in these configs. E.g. `projects/storefrontlib/public_api`
          joinPaths(curr.directory, entryPoint.directory, entryPoint.entryFile),
        ];
      });
      return acc;
    },
    { [SPARTACUS_SCHEMATICS]: ['projects/schematics/index'] } as {
      [key: string]: [string];
    }
  );

  const hadErrors = handleConfigUpdate(entryPoints, 'tsconfig.json', options);
  const hadErrorsCompodoc = handleConfigUpdate(
    entryPoints,
    'tsconfig.compodoc.json',
    options
  );
  if (hadErrors || hadErrorsCompodoc) {
    showAllGood = false;
  }
  if (showAllGood) {
    success();
  }
}

function handleAppConfigs(
  libraries: Record<string, LibraryWithSpartacusDeps>,
  options: ProgramOptions
): void {
  if (options.fix) {
    reportProgress('Updating app tsconfig files');
  } else {
    reportProgress('Checking app tsconfig files');
  }
  let showAllGood = true;
  // Add paths to `projects/storefrontapp/tsconfig.app.prod.json` config.
  const appEntryPoints = Object.values(libraries)
    .filter((lib) => lib.name !== SPARTACUS_SCHEMATICS)
    .reduce((acc, curr) => {
      curr.entryPoints.forEach((entryPoint) => {
        acc[entryPoint.entryPoint] = [
          joinPaths('dist', curr.distDir, entryPoint.directory),
        ];
      });
      return acc;
    }, {} as { [key: string]: [string] });

  const hadErrorsApp = handleConfigUpdate(
    appEntryPoints,
    'projects/storefrontapp/tsconfig.app.prod.json',
    options
  );

  // Add paths to `projects/storefrontapp/tsconfig.server.json` config.
  const serverEntryPoints = Object.values(libraries)
    .filter((lib) => lib.name !== SPARTACUS_SCHEMATICS)
    .reduce((acc, curr) => {
      curr.entryPoints.forEach((entryPoint) => {
        // For server configuration we need relative paths that's why we append `../..`
        acc[entryPoint.entryPoint] = [
          joinPaths(
            '../..',
            curr.directory,
            entryPoint.directory,
            entryPoint.entryFile
          ),
        ];
      });
      return acc;
    }, {} as { [key: string]: [string] });
  const hadErrorsServer = handleConfigUpdate(
    serverEntryPoints,
    'projects/storefrontapp/tsconfig.server.json',
    options
  );

  // Add paths to `projects/storefrontapp/tsconfig.server.prod.json` config.
  const serverProdEntryPoints = Object.values(libraries)
    .filter((lib) => lib.name !== SPARTACUS_SCHEMATICS)
    .reduce((acc, curr) => {
      curr.entryPoints.forEach((entryPoint) => {
        // For server configuration we need relative paths that's why we append `../..`
        acc[entryPoint.entryPoint] = [
          joinPaths('../..', 'dist', curr.distDir, entryPoint.directory),
        ];
      });
      return acc;
    }, {} as { [key: string]: [string] });

  const hadErrorsServerProd = handleConfigUpdate(
    serverProdEntryPoints,
    'projects/storefrontapp/tsconfig.server.prod.json',
    options
  );

  if (hadErrorsApp || hadErrorsServer || hadErrorsServerProd) {
    showAllGood = false;
  }
  if (showAllGood) {
    success();
  }
}
