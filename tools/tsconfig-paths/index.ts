// steps: grab all packages (look for package.json files - exclude some files: app everything from dist/node_modules)
// validate spartacus dependencies for each package
// find all entrypoints for each package
// generate paths for dev/prod for each package
// in package tsconfig.paths config add the all the paths for the lib depending on prod/dev file

import { execSync } from 'child_process';
import fs from 'fs';
// TODO: Add as explicit dev dependency
import glob from 'glob';

const librariesPaths = glob.sync(
  '{core-libs,feature-libs,integration-libs,projects}/!(node_modules)/package.json',
  {
    ignore: [
      'projects/storefrontapp-e2e-cypress/package.json',
      'projects/dev-schematics/package.json',
      'projects/storefrontstyles/package.json',
      'projects/schematics/package.json',
    ],
  }
);

let libraries: {
  [a: string]: {
    name: string;
    distDir: string;
    entryPoints: string[];
    spartacusDependencies: string[];
    path: string;
  };
} = librariesPaths
  .map((path) => {
    const packageJson = JSON.parse(fs.readFileSync(path, 'utf-8'));
    const peerDependencies = Object.keys(packageJson.peerDependencies ?? {});
    const libDir = path.substring(0, path.length - `/package.json`.length);
    const ngPackagePaths = glob.sync(`${libDir}/**/ng-package.json`);
    const entryPoints =
      ngPackagePaths
        // remove lib directory from entry point path
        .map((ngPackagePath) => ngPackagePath.substring(libDir.length))
        // remove `/ng-package.json` from entry point path
        .map((ngPackagePath) =>
          ngPackagePath.substring(
            0,
            ngPackagePath.length - `/ng-package.json`.length
          )
        )
        // remove default root entry point
        .filter((ngPackagePath) => !!ngPackagePath) ?? [];
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

// Add path to `@spartacus/schematics` for schematics tsconfig.
Object.values(libraries).forEach((library) => {
  const schematicsTsConfig = glob.sync(
    `${library.path}/tsconfig.schematics.json`
  );
  if (
    schematicsTsConfig.length &&
    library.spartacusDependencies.includes('@spartacus/schematics')
  ) {
    const tsConfig = JSON.parse(
      fs.readFileSync(schematicsTsConfig[0], 'utf-8')
    );
    (tsConfig.compilerOptions.paths = {
      '@spartacus/schematics': ['../../projects/schematics/src/public_api'],
    }),
      fs.writeFileSync(
        schematicsTsConfig[0],
        JSON.stringify(tsConfig, undefined, 2)
      );
  }
});

console.log(libraries);

// Add path to dependencies in tsconfig.lib.json files
Object.values(libraries).forEach((library) => {
  const libTsConfig = glob.sync(`${library.path}/tsconfig.lib.json`);
  if (libTsConfig.length) {
    let depsEntryPoints = library.spartacusDependencies
      .filter((dep) => dep !== '@spartacus/schematics')
      .map((library) => libraries[library])
      .reduce((paths, dep) => {
        let mainEntry = { [dep.name]: [`dist/${dep.distDir}`] };
        let subEntries = dep.entryPoints.reduce((acc, entry) => {
          return {
            ...acc,
            [`${dep.name}${entry}`]: [`dist/${dep.distDir}${entry}`],
          };
        }, {});
        return { ...paths, ...mainEntry, ...subEntries };
      }, {});
    const tsConfigContent = JSON.parse(
      fs.readFileSync(libTsConfig[0], 'utf-8')
    );
    if (Object.keys(depsEntryPoints).length) {
      tsConfigContent.compilerOptions.paths = depsEntryPoints;
      fs.writeFileSync(
        libTsConfig[0],
        JSON.stringify(tsConfigContent, undefined, 2)
      );
    }
    console.log(library.name, depsEntryPoints);
  }
});

execSync('yarn prettier:fix');
