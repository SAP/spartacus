/**
 * Purpose of this script is to set correctly all required paths in `compilerOptions.paths` property in all our `tsconfig` files.
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
import { Library, prettyError, ProgramOptions, Repository } from './index';

function readTsConfigFile(path: string): any {
  return parse(fs.readFileSync(path, 'utf-8'));
}

function setCompilerOptionsPaths(tsconfigPath: string, paths: Object) {
  const tsConfigContent = parse(fs.readFileSync(tsconfigPath, 'utf-8'));
  assign(tsConfigContent.compilerOptions, { paths });
  fs.writeFileSync(tsconfigPath, stringify(tsConfigContent, null, 2));
}

function joinPaths(...parts: string[]) {
  return path.join(...parts).replace(/\\/g, '/');
}

function logUpdatedFile(path: string) {
  console.log(`✅ Updated ${path}`);
}
interface Lib extends Library {
  /**
   * All spartacus packages that this library depend on.
   */
  spartacusDependencies: string[];
}

export function manageTsConfigs(
  repository: Repository,
  options: ProgramOptions
) {
  const libraries: Record<string, Lib> = Object.values(repository)
    .map((lib) => {
      return {
        ...lib,
        spartacusDependencies: Object.keys(
          lib.peerDependencies ?? {}
        ).filter((dep) => dep.startsWith('@spartacus/')),
      };
    })
    .reduce((acc: Record<string, Lib>, lib) => {
      acc[lib.name] = lib;
      return acc;
    }, {});

  handleSchematicsConfigs(libraries, options);
  updateLibConfigs(libraries, options);
  updateRootConfigs(libraries, options);
  updateAppConfigs(libraries, options);
}

function comparePathsConfigs(
  targetPaths: Record<string, string[]>,
  tsConfigPath: string,
  silent = false
): boolean {
  const tsConfig = readTsConfigFile(tsConfigPath);
  const currentPaths: Record<string, string[]> =
    tsConfig?.compilerOptions?.paths ?? {};
  const errors = [];
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
    prettyError(
      tsConfigPath,
      errors,
      `This can be automatically fixed by running \`${chalk.bold(
        `yarn config:update`
      )}\`.`
    );
  }
  return errors.length > 0;
}

/**
 * When library have it's own schematics (tsconfig.schematics.json exists) and have
 * schematics as peerDependency we add path to `@spartacus/schematics` lib.
 */
function handleSchematicsConfigs(
  libraries: Record<string, Lib>,
  options: ProgramOptions
) {
  const targetPaths = {
    '@spartacus/schematics': ['../../projects/schematics/src/public_api'],
  };
  Object.values(libraries).forEach((library) => {
    const schematicsTsConfigPaths = glob.sync(
      `${library.directory}/tsconfig.schematics.json`
    );
    if (
      schematicsTsConfigPaths.length &&
      library.spartacusDependencies.includes('@spartacus/schematics')
    ) {
      const errorsPresent = comparePathsConfigs(
        targetPaths,
        schematicsTsConfigPaths[0],
        options.fix
      );
      if (errorsPresent && options.fix) {
        setCompilerOptionsPaths(schematicsTsConfigPaths[0], targetPaths);
        logUpdatedFile(schematicsTsConfigPaths[0]);
      }
    }
  });
}

/**
 * Adds paths to spartacus dependencies in libraries `tsconfig.lib.json` files.
 * We grab all spartacus dependencies and add for all of them all entry points.
 */
function updateLibConfigs(
  libraries: Record<string, Lib>,
  options: ProgramOptions
) {
  Object.values(libraries).forEach((library) => {
    const libraryTsConfigPaths = glob.sync(
      `${library.directory}/tsconfig.lib.json`
    );
    if (libraryTsConfigPaths.length) {
      let dependenciesEntryPoints = library.spartacusDependencies
        // @spartacus/schematics library should be used only in `tsconfig.schematics.json` file.
        .filter((dependency) => dependency !== '@spartacus/schematics')
        .map((library) => libraries[library])
        .reduce((entryPoints, dependency) => {
          let dependencyEntryPoints = dependency.entryPoints.reduce(
            (acc, entry) => {
              return {
                ...acc,
                // In tsconfig.lib.json files we reference builded paths. eg. `@spartacus/storefront`: ['dist/storefrontlib/src/public_api']`
                [entry.entryPoint]: [
                  joinPaths('dist', dependency.distDir, entry.directory),
                ],
              };
            },
            {}
          );
          return { ...entryPoints, ...dependencyEntryPoints };
        }, {});
      const errorsPresent = comparePathsConfigs(
        dependenciesEntryPoints,
        libraryTsConfigPaths[0],
        options.fix
      );
      if (errorsPresent && options.fix) {
        setCompilerOptionsPaths(
          libraryTsConfigPaths[0],
          dependenciesEntryPoints
        );
        logUpdatedFile(libraryTsConfigPaths[0]);
      }
    }
  });
}

/**
 * Add paths to all libraries and all their entry points to root `tsconfig.json` and `tsconfig.compodoc.json` files.
 */
function updateRootConfigs(
  libraries: Record<string, Lib>,
  options: ProgramOptions
) {
  const entryPoints = Object.values(libraries).reduce((acc, curr) => {
    curr.entryPoints.forEach((entryPoint) => {
      acc[entryPoint.entryPoint] = [
        // We reference source files entry points in these configs. eg. `projects/storefrontlib/src/public_api`
        joinPaths(curr.directory, entryPoint.directory, entryPoint.entryFile),
      ];
    });
    return acc;
  }, {});

  const errorsPresent = comparePathsConfigs(
    entryPoints,
    './tsconfig.json',
    options.fix
  );
  if (errorsPresent && options.fix) {
    setCompilerOptionsPaths('./tsconfig.json', entryPoints);
    logUpdatedFile('./tsconfig.json');
  }

  const errorsPresent2 = comparePathsConfigs(
    entryPoints,
    './tsconfig.compodoc.json',
    options.fix
  );
  if (errorsPresent2 && options.fix) {
    setCompilerOptionsPaths('./tsconfig.compodoc.json', entryPoints);
    logUpdatedFile('./tsconfig.compodoc.json');
  }
}

function updateAppConfigs(
  libraries: Record<string, Lib>,
  options: ProgramOptions
) {
  /**
   * Add paths to `projects/storefrontapp/tsconfig.app.prod.json` config.
   */
  const appEntryPoints = Object.values(libraries)
    .filter((lib) => lib.name !== '@spartacus/schematics')
    .reduce((acc, curr) => {
      curr.entryPoints.forEach((entryPoint) => {
        acc[entryPoint.entryPoint] = [
          joinPaths('dist', curr.distDir, entryPoint.directory),
        ];
      });
      return acc;
    }, {});

  const errorsPresent = comparePathsConfigs(
    appEntryPoints,
    'projects/storefrontapp/tsconfig.app.prod.json',
    options.fix
  );
  if (errorsPresent && options.fix) {
    setCompilerOptionsPaths(
      'projects/storefrontapp/tsconfig.app.prod.json',
      appEntryPoints
    );
    logUpdatedFile('projects/storefrontapp/tsconfig.app.prod.json');
  }

  /**
   * Add paths to `projects/storefrontapp/tsconfig.server.json` config.
   */
  const serverEntryPoints = Object.values(libraries)
    .filter((lib) => lib.name !== '@spartacus/schematics')
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
    }, {});

  const errorsPresent2 = comparePathsConfigs(
    serverEntryPoints,
    'projects/storefrontapp/tsconfig.server.json',
    options.fix
  );
  if (errorsPresent2 && options.fix) {
    setCompilerOptionsPaths(
      'projects/storefrontapp/tsconfig.server.json',
      serverEntryPoints
    );
    logUpdatedFile('projects/storefrontapp/tsconfig.server.json');
  }

  /**
   * Add paths to `projects/storefrontapp/tsconfig.server.prod.json` config.
   */
  const serverProdEntryPoints = Object.values(libraries)
    .filter((lib) => lib.name !== '@spartacus/schematics')
    .reduce((acc, curr) => {
      curr.entryPoints.forEach((entryPoint) => {
        // For server configuration we need relative paths that's why we append `../..`
        acc[entryPoint.entryPoint] = [
          joinPaths('../..', 'dist', curr.distDir, entryPoint.directory),
        ];
      });
      return acc;
    }, {});

  const errorsPresent3 = comparePathsConfigs(
    serverProdEntryPoints,
    'projects/storefrontapp/tsconfig.server.prod.json',
    options.fix
  );
  if (errorsPresent3 && options.fix) {
    setCompilerOptionsPaths(
      'projects/storefrontapp/tsconfig.server.prod.json',
      serverProdEntryPoints
    );
    logUpdatedFile('projects/storefrontapp/tsconfig.server.prod.json');
  }
}
