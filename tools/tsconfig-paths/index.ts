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

import { execSync } from 'child_process';
import { assign, parse, stringify } from 'comment-json';
import fs from 'fs';
import glob from 'glob';
import path from 'path';

/**
 * Paths to `package.json` files for all libraries.
 */
const librariesPaths = glob.sync(
  '{core-libs,feature-libs,integration-libs,projects}/!(node_modules)/package.json',
  {
    ignore: [
      'projects/storefrontapp-e2e-cypress/package.json',
      'projects/dev-schematics/package.json',
      'projects/storefrontstyles/package.json',
      'projects/schematics/package.json', // excluded as it is treated differently than feature libraries
    ],
  }
);

// Utility functions
function readJsonFile(path: string) {
  return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

function setCompilerOptionsPaths(tsconfigPath: string, paths: Object) {
  const tsConfigContent = parse(fs.readFileSync(tsconfigPath, 'utf-8'));
  if (Object.keys(paths).length) {
    assign(tsConfigContent.compilerOptions, { paths });
    fs.writeFileSync(tsconfigPath, stringify(tsConfigContent, null, 2));
  }
}

function joinPaths(...parts: string[]) {
  return path.join(...parts).replace(/\\/g, '/');
}

function logUpdatedFile(path: string) {
  console.log(`✅ Updated ${path}`);
}

console.log('\nAnalyzing project structure...');
const libraries: {
  [library: string]: {
    /**
     * Name of the library.
     * eg. `@spartacus/core`
     */
    name: string;
    /**
     * Directory to which the builded lib lands in `dist` directory.
     * eg. for `@spartacus/storefront` -> `storefrontlib`
     */
    distDir: string;
    /**
     * All entry points for library (including the main entry point).
     */
    entryPoints: Array<{
      /**
       * Reference to entry point.
       * eg. `@spartacus/organization/administration`
       */
      entryPoint: string;
      /**
       * Directory of entry point.
       * eg. `/administration`
       */
      path: string;
      /**
       * Path to entry file for entry point (inside directory from property `path`).
       * eg. `src/public_api` (without .ts extension)
       */
      entryFile: string;
    }>;
    /**
     * All spartacus packages that this library depend on.
     */
    spartacusDependencies: string[];
    /**
     * Directory where package lives.
     * eg. for `@spartacus/core` -> `projects/core`
     */
    path: string;
  };
} = librariesPaths
  .map((libPath) => {
    const packageJson = readJsonFile(libPath);
    const peerDependencies = Object.keys(packageJson.peerDependencies ?? {});
    const libDir = libPath.substring(
      0,
      libPath.length - `/package.json`.length
    );

    const ngPackageFilesPaths = glob.sync(`${libDir}/**/ng-package.json`);
    const entryPoints = ngPackageFilesPaths.map((ngPackagePath) => {
      const ngPackageFileContent = readJsonFile(ngPackagePath);
      let pathWithoutLibDirectory = ngPackagePath.substring(libDir.length);
      let pathWithoutNgPackage = pathWithoutLibDirectory.substring(
        0,
        pathWithoutLibDirectory.length - `/ng-package.json`.length
      );
      return {
        entryPoint: `${packageJson.name}${pathWithoutNgPackage}`, // eg. `@spartacus/organization/administration`
        path: `${pathWithoutNgPackage}`, // eg. `/administration`
        entryFile: `${ngPackageFileContent.lib.entryFile.replace('.ts', '')}`, // eg. `src/public_api` (without .ts extension)
      };
    });

    return {
      name: packageJson.name,
      distDir: libDir.split('/')[1],
      spartacusDependencies: peerDependencies.filter((dep) =>
        dep.startsWith('@spartacus/')
      ),
      path: libDir,
      entryPoints,
    };
  })
  .reduce((acc, lib) => {
    acc[lib.name] = lib;
    return acc;
  }, {});

/**
 * When library have it's own schematics (tsconfig.schematics.json exists) and have
 * schematics as peerDependency we add path to `@spartacus/schematics` lib.
 */
console.log('\nUpdating tsconfig.schematics.json files\n');
Object.values(libraries).forEach((library) => {
  const schematicsTsConfigPaths = glob.sync(
    `${library.path}/tsconfig.schematics.json`
  );
  if (
    schematicsTsConfigPaths.length &&
    library.spartacusDependencies.includes('@spartacus/schematics')
  ) {
    setCompilerOptionsPaths(schematicsTsConfigPaths[0], {
      '@spartacus/schematics': ['../../projects/schematics/src/public_api'],
    });
  }
  if (schematicsTsConfigPaths.length) {
    logUpdatedFile(schematicsTsConfigPaths[0]);
  }
});

/**
 * Adds paths to spartacus dependencies in libraries `tsconfig.lib.json` files.
 * We grab all spartacus dependencies and add for all of them all entry points.
 */
console.log('\nUpdating tsconfig.lib.json files\n');
Object.values(libraries).forEach((library) => {
  const libraryTsConfigPaths = glob.sync(`${library.path}/tsconfig.lib.json`);
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
                joinPaths('dist', dependency.distDir, entry.path),
              ],
            };
          },
          {}
        );
        return { ...entryPoints, ...dependencyEntryPoints };
      }, {});
    setCompilerOptionsPaths(libraryTsConfigPaths[0], dependenciesEntryPoints);
    logUpdatedFile(libraryTsConfigPaths[0]);
  }
});

/**
 * Add paths to all libraries and all their entry points to root `tsconfig.json` and `tsconfig.compodoc.json` files.
 */
console.log('\nUpdating base tsconfig files\n');
const entryPoints = Object.values(libraries).reduce(
  (acc, curr) => {
    curr.entryPoints.forEach((entryPoint) => {
      acc[entryPoint.entryPoint] = [
        // We reference source files entry points in these configs. eg. `projects/storefrontlib/src/public_api`
        joinPaths(curr.path, entryPoint.path, entryPoint.entryFile),
      ];
    });
    return acc;
  },
  {
    // Add schematics library by hand, as we don't traverse this library.
    '@spartacus/schematics': ['projects/schematics/src/public_api'],
  }
);

setCompilerOptionsPaths('./tsconfig.json', entryPoints);
logUpdatedFile('tsconfig.json');
setCompilerOptionsPaths('./tsconfig.compodoc.json', entryPoints);
logUpdatedFile('tsconfig.compodoc.json');

console.log('\nUpdating storefrontapp configuration\n');
/**
 * Add paths to `projects/storefrontapp/tsconfig.app.prod.json` config.
 */
const appEntryPoints = Object.values(libraries).reduce((acc, curr) => {
  curr.entryPoints.forEach((entryPoint) => {
    acc[entryPoint.entryPoint] = [
      joinPaths('dist', curr.distDir, entryPoint.path),
    ];
  });
  return acc;
}, {});

setCompilerOptionsPaths(
  'projects/storefrontapp/tsconfig.app.prod.json',
  appEntryPoints
);
logUpdatedFile('projects/storefrontapp/tsconfig.app.prod.json');

/**
 * Add paths to `projects/storefrontapp/tsconfig.server.json` config.
 */
const serverEntryPoints = Object.values(libraries).reduce((acc, curr) => {
  curr.entryPoints.forEach((entryPoint) => {
    // For server configuration we need relative paths that's why we append `../..`
    acc[entryPoint.entryPoint] = [
      joinPaths('../..', curr.path, entryPoint.path, entryPoint.entryFile),
    ];
  });
  return acc;
}, {});

setCompilerOptionsPaths(
  'projects/storefrontapp/tsconfig.server.json',
  serverEntryPoints
);
logUpdatedFile('projects/storefrontapp/tsconfig.server.json');

/**
 * Add paths to `projects/storefrontapp/tsconfig.server.prod.json` config.
 */
const serverProdEntryPoints = Object.values(libraries).reduce((acc, curr) => {
  curr.entryPoints.forEach((entryPoint) => {
    // For server configuration we need relative paths that's why we append `../..`
    acc[entryPoint.entryPoint] = [
      joinPaths('../..', 'dist', curr.distDir, entryPoint.path),
    ];
  });
  return acc;
}, {});

setCompilerOptionsPaths(
  'projects/storefrontapp/tsconfig.server.prod.json',
  serverProdEntryPoints
);
logUpdatedFile('projects/storefrontapp/tsconfig.server.prod.json');

/**
 * Format all files.
 */
console.log('\nFormatting files (might take some time)...\n');
execSync('yarn prettier:fix');
console.log('✨ Update completed');
