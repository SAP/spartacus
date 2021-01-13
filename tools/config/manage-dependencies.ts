/**
 * Algorithm for managing dependencies in spartacus
 *
 * Assumptions:
 * - all dependencies for packages and app are stored only in top level node_modules
 * - internal tooling (cypress, github actions) can have separate node_modules
 * - if library have import in any *.ts, *.scss file to dependency it should be specified as peer (optional) dependency in lib package.json
 * - @spartacus/* peer deps should match version in their package.json
 * - deps version should match version in the root package.json
 * - all packages should have dependency on tslib
 * - all used deps must be listed in root package.json
 * - schematics should also have version synced from the root package.json and library list of dependencies
 *
 * Extra features
 * - option to bump all spartacus packages!
 * - check on CI to prompt with incorrect peerDeps
 */

import fs, { readFileSync } from 'fs';
import glob from 'glob';
import postcss from 'postcss-scss';
import semver from 'semver';
import * as ts from 'typescript';
import { Library, PackageJson, ProgramOptions, Repository } from './index';

// Utility functions
function readJsonFile(path: string) {
  return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

function saveJsonFile(path: string, content: any) {
  fs.writeFileSync(path, JSON.stringify(content, undefined, 2));
}

function delint(sourceFile: ts.SourceFile): Set<string> {
  const imports = new Set<string>();
  delintNode(sourceFile);

  function delintNode(node: ts.Node) {
    switch (node.kind) {
      case ts.SyntaxKind.ImportDeclaration:
        const imp = node as ts.ImportDeclaration;
        const text = imp.moduleSpecifier.getText();
        imports.add(text.replace(/['"]+/g, ''));
        break;
    }

    ts.forEachChild(node, delintNode);
  }
  return imports;
}

interface LibDepsMetaData extends Library {
  tsImports: {
    [importPath: string]: {
      importPath: string;
      files: Set<string>;
      usageIn: {
        spec: boolean;
        lib: boolean;
        schematics: boolean;
        schematicsSpec: boolean;
      };
    };
  };
  scssImports: {
    [importPath: string]: {
      importPath: string;
      files: Set<string>;
    };
  };
  externalDependencies?: {
    [dependency: string]: {
      dependency: string;
      files: Set<string>;
      usageIn: {
        spec: boolean;
        lib: boolean;
        schematics: boolean;
        schematicsSpec: boolean;
        styles: boolean;
      };
    };
  };
  externalDependenciesForPackageJson?: {
    [dependency: string]: {
      dependency: string;
      files: Set<string>;
      usageIn: {
        spec: boolean;
        lib: boolean;
        schematics: boolean;
        schematicsSpec: boolean;
        styles: boolean;
      };
    };
  };
}

export function manageDependencies(
  repository: Repository,
  options: ProgramOptions
) {
  const libraries = Object.values(repository)
    .map(
      (library: Library): LibDepsMetaData => {
        const tsImports = {};
        const scssImports = {};

        const tsFilesPaths = glob.sync(`${library.directory}/**/*.ts`);

        tsFilesPaths.forEach((fileName) => {
          // Parse a file
          const sourceFile = ts.createSourceFile(
            fileName,
            readFileSync(fileName).toString(),
            ts.ScriptTarget.ES2015,
            /*setParentNodes */ true
          );

          // delint it
          const fileImports = delint(sourceFile);
          fileImports.forEach((val) => {
            if (tsImports[val]) {
              tsImports[val].files.add(fileName);
            } else {
              tsImports[val] = {
                importPath: val,
                files: new Set<string>([fileName]),
                usageIn: {
                  spec: false,
                  lib: false,
                  schematics: false,
                  schematicsSpec: false,
                },
              };
            }
          });
        });

        const scssFilesPaths = glob.sync(`${library.directory}/**/*.scss`);

        scssFilesPaths.forEach((fileName) => {
          const ast = postcss.parse(readFileSync(fileName).toString());
          const imports = new Set<string>();
          ast.walk((node) => {
            if (node.type === 'atrule' && node.name === 'import') {
              const path = node.params.replace(/['"]+/g, '');
              imports.add(path);
            }
          });
          imports.forEach((val) => {
            if (scssImports[val]) {
              scssImports[val].files.add(fileName);
            } else {
              scssImports[val] = {
                importPath: val,
                files: new Set<string>([fileName]),
              };
            }
          });
        });

        return {
          ...library,
          scssImports,
          tsImports,
          externalDependencies: {},
          externalDependenciesForPackageJson: {},
        };
      }
    )
    .reduce((acc: Record<string, LibDepsMetaData>, curr) => {
      acc[curr.name] = curr;
      return acc;
    }, {});

  // Specify where imports are used (spec, lib, schematics, schematics spec)
  categorizeUsageOfDependencies(libraries);
  // Check for rxjs/internal imports
  warnAboutRxInternalImports(libraries);
  // Check if we reference files with relative paths outside of entry point
  detectEntryPointsImportsViolations(libraries);
  // Check if we use node dependencies where we should not
  filterNativeNodeAPIs(libraries);
  // Check if we use absolute paths where we should not
  filterLocalAbsolutePathFiles(libraries);
  // Define list of external dependencies for each library
  getExternalDependenciesFromImports(libraries);

  const rootPackageJson: PackageJson = readJsonFile('./package.json');

  // Check if we have all dependencies directly referenced in package.json
  checkIfWeHaveAllDependenciesInPackageJson(libraries, rootPackageJson);

  // Filer out spec dependencies as we already checked everything related to them
  filterOutSpecOnlyDependencies(libraries);

  addMissingDependenciesToPackageJson(libraries, rootPackageJson, options);
  removeNotUsedDependenciesFromPackageJson(libraries, options);
  checkEmptyDevDependencies(libraries);
  checkTsLibDep(libraries, rootPackageJson, options);
  checkForLockFile(libraries);
  updateDependenciesVersions(libraries, rootPackageJson, options);
}

// console.log(Object.values(libraries)[9]);

/**
 * Detect relative imports for files outside of the entry point directory
 *
 * Remove these imports from the object as it is no longer useful in processing.
 */
function detectEntryPointsImportsViolations(
  libraries: Record<string, LibDepsMetaData>
) {
  // TODO: Focus on the violations later.
  Object.values(libraries).forEach((lib) => {
    lib.tsImports = Object.values(lib.tsImports)
      .filter((imp) => !imp.importPath.startsWith('.'))
      .reduce((acc, curr) => {
        acc[curr.importPath] = curr;
        return acc;
      }, {});
    lib.scssImports = Object.values(lib.scssImports)
      .filter(
        (imp) =>
          imp.importPath.startsWith('node_modules/') ||
          imp.importPath.startsWith('~')
      )
      .reduce((acc, curr) => {
        acc[curr.importPath] = curr;
        return acc;
      }, {});
  });
}

/**
 * Filer native Node.js APIs
 */
function filterNativeNodeAPIs(libraries: Record<string, LibDepsMetaData>) {
  const nodeAPIs = ['fs', 'path', 'events'];

  // TODO: Focus on the violations later.
  Object.values(libraries).forEach((lib) => {
    lib.tsImports = Object.values(lib.tsImports)
      .filter((imp) => {
        if (nodeAPIs.includes(imp.importPath)) {
          // Don't allow to use node api outside of schematics spec files
          if (imp.usageIn.spec || imp.usageIn.lib || imp.usageIn.schematics) {
            imp.files.forEach((file) => {
              // Allow to use Node APIs in SSR
              if (!file.includes('ssr')) {
                console.log('Native dependency!', imp.importPath);
              }
            });
          }
          return false;
        }
        return true;
      })
      .reduce((acc, curr) => {
        acc[curr.importPath] = curr;
        return acc;
      }, {});
  });
}

/**
 * Filer native Node.js APIs
 */
function filterLocalAbsolutePathFiles(
  libraries: Record<string, LibDepsMetaData>
) {
  // TODO: Focus on the violations later.
  Object.values(libraries).forEach((lib) => {
    lib.tsImports = Object.values(lib.tsImports)
      .filter((imp) => {
        // Allow to use absolute paths for spec files
        if (
          fs.existsSync(imp.importPath) ||
          fs.existsSync(`${imp.importPath}.ts`)
        ) {
          if (
            imp.usageIn.lib ||
            imp.usageIn.schematics ||
            imp.usageIn.schematicsSpec
          ) {
            console.log('Local file used with absolute path', imp.importPath);
          }
          return false;
        }
        return true;
      })
      .reduce((acc, curr) => {
        acc[curr.importPath] = curr;
        return acc;
      }, {});
  });
}

/**
 * Categorize in which type of files we use different dependencies
 */
function categorizeUsageOfDependencies(
  libraries: Record<string, LibDepsMetaData>
) {
  Object.values(libraries).forEach((lib) => {
    Object.values(lib.tsImports).forEach((imp) => {
      imp.files.forEach((file) => {
        if (file.endsWith('_spec.ts')) {
          imp.usageIn.schematicsSpec = true;
        } else if (
          file.endsWith('spec.ts') ||
          file === `${lib.directory}/test.ts` ||
          file === `${lib.directory}/src/test.ts`
        ) {
          imp.usageIn.spec = true;
        } else if (file.includes('schematics')) {
          imp.usageIn.schematics = true;
        } else {
          imp.usageIn.lib = true;
        }
      });
    });
  });
}

/**
 * Warn about usage of rxjs/internal imports
 */
function warnAboutRxInternalImports(
  libraries: Record<string, LibDepsMetaData>
) {
  Object.values(libraries).forEach((lib) => {
    Object.values(lib.tsImports).forEach((imp) => {
      if (imp.importPath.includes('rxjs/internal')) {
        imp.files.forEach((file) => {
          console.log(`rxjs/internal import found in ${file}`);
        });
      }
    });
  });
}

/**
 * Get external dependencies from imports
 */
function getExternalDependenciesFromImports(
  libraries: Record<string, LibDepsMetaData>
) {
  Object.values(libraries).forEach((lib) => {
    Object.values(lib.tsImports).forEach((imp) => {
      let dependency;
      if (imp.importPath.startsWith('@')) {
        const [scope, name] = imp.importPath.split('/');
        dependency = `${scope}/${name}`;
      } else {
        const [name] = imp.importPath.split('/');
        dependency = `${name}`;
      }

      if (!lib.externalDependencies[dependency]) {
        lib.externalDependencies[dependency] = {
          dependency,
          files: new Set<string>(),
          usageIn: {
            lib: false,
            spec: false,
            schematics: false,
            schematicsSpec: false,
            styles: false,
          },
        };
      }
      imp.files.forEach((file) => {
        lib.externalDependencies[dependency].files.add(file);
      });
      if (imp.usageIn.lib) {
        lib.externalDependencies[dependency].usageIn.lib = true;
      }
      if (imp.usageIn.schematics) {
        lib.externalDependencies[dependency].usageIn.schematics = true;
      }
      if (imp.usageIn.schematicsSpec) {
        lib.externalDependencies[dependency].usageIn.schematicsSpec = true;
      }
      if (imp.usageIn.spec) {
        lib.externalDependencies[dependency].usageIn.spec = true;
      }
    });
    Object.values(lib.scssImports).forEach((imp) => {
      let dependency;
      let dep;
      if (imp.importPath.startsWith('~')) {
        dep = imp.importPath.substring(1);
      } else {
        dep = imp.importPath.substring('node_modules/'.length);
      }
      if (dep.startsWith('@')) {
        const [scope, name] = dep.split('/');
        dependency = `${scope}/${name}`;
      } else {
        const [name] = dep.split('/');
        dependency = `${name}`;
      }

      if (!lib.externalDependencies[dependency]) {
        lib.externalDependencies[dependency] = {
          dependency,
          files: new Set<string>(),
          usageIn: {
            lib: false,
            spec: false,
            schematics: false,
            schematicsSpec: false,
            styles: false,
          },
        };
      }
      imp.files.forEach((file) => {
        lib.externalDependencies[dependency].files.add(file);
      });
      lib.externalDependencies[dependency].usageIn.styles = true;
    });
  });
}

/**
 * Get external dependencies from imports
 */
function checkIfWeHaveAllDependenciesInPackageJson(
  libraries: Record<string, LibDepsMetaData>,
  packageJson: PackageJson
) {
  const allDeps = {
    ...packageJson.devDependencies,
    ...packageJson.dependencies,
  };
  Object.values(libraries).forEach((lib) => {
    Object.values(lib.externalDependencies).forEach((dep) => {
      if (
        !dep.dependency.startsWith('@spartacus/') &&
        !Object.keys(allDeps).includes(dep.dependency)
      ) {
        console.log(
          `Missing ${dep.dependency} in root package.json that is used directly in ${lib.name}!`
        );
      }
    });
  });
}

/**
 * Remove spec external dependencies as we already took care of them.
 */
function filterOutSpecOnlyDependencies(
  libraries: Record<string, LibDepsMetaData>
) {
  Object.values(libraries).forEach((lib) => {
    lib.externalDependenciesForPackageJson = Object.values(
      lib.externalDependencies
    )
      .filter((dep) => {
        if (
          !dep.usageIn.lib &&
          !dep.usageIn.schematics &&
          !dep.usageIn.styles
        ) {
          return false;
        }
        return true;
      })
      .reduce((acc, curr) => {
        acc[curr.dependency] = curr;
        return acc;
      }, {});
  });
}

function addMissingDependenciesToPackageJson(
  libraries: Record<string, LibDepsMetaData>,
  rootPackageJson: PackageJson,
  options: ProgramOptions
) {
  const deps = {
    ...rootPackageJson.dependencies,
    ...rootPackageJson.devDependencies,
  };
  let reportMissingPackages = false;
  Object.values(libraries).forEach((lib) => {
    Object.values(lib.externalDependenciesForPackageJson).forEach((dep) => {
      if (
        typeof lib.dependencies[dep.dependency] === 'undefined' &&
        typeof lib.peerDependencies[dep.dependency] === 'undefined' &&
        typeof lib.optionalDependencies[dep.dependency] === 'undefined'
      ) {
        if (options.fix) {
          const pathToPackageJson = `${lib.directory}/package.json`;
          const packageJson = readJsonFile(pathToPackageJson);
          const version = deps[dep.dependency];
          if (
            typeof version === 'undefined' &&
            !dep.dependency.startsWith('@spartacus/')
          ) {
            reportMissingPackages = true;
          } else {
            if (typeof packageJson.peerDependencies === 'undefined') {
              packageJson.peerDependencies = {};
            }
            if (typeof version !== 'undefined') {
              packageJson.peerDependencies[dep.dependency] = version;
            } else if (dep.dependency !== lib.name) {
              packageJson.peerDependencies[dep.dependency] =
                libraries[dep.dependency].version;
            }
            saveJsonFile(pathToPackageJson, packageJson);
          }
        } else {
          console.log(`Missing ${dep.dependency} in ${lib.name} package.json`);
        }
      }
    });
  });
  if (reportMissingPackages) {
    console.log(
      'Fix first violations of missing packages and then rerun script!'
    );
  }
}

function removeNotUsedDependenciesFromPackageJson(
  libraries: Record<string, LibDepsMetaData>,
  options: ProgramOptions
) {
  Object.values(libraries).forEach((lib) => {
    const deps = {
      ...lib.dependencies,
      ...lib.peerDependencies,
      ...lib.optionalDependencies,
    };
    Object.keys(deps).forEach((dep) => {
      if (
        typeof lib.externalDependenciesForPackageJson[dep] === 'undefined' &&
        dep !== `tslib`
      ) {
        if (options.fix) {
          const pathToPackageJson = `${lib.directory}/package.json`;
          const packageJson = readJsonFile(pathToPackageJson);
          if (typeof packageJson?.dependencies?.[dep] !== 'undefined') {
            delete packageJson.dependencies[dep];
          } else if (
            typeof packageJson?.peerDependencies?.[dep] !== 'undefined'
          ) {
            delete packageJson.peerDependencies[dep];
          } else if (
            typeof packageJson?.optionalDependencies?.[dep] !== 'undefined'
          ) {
            delete packageJson.optionalDependencies[dep];
          }
          saveJsonFile(pathToPackageJson, packageJson);
        } else {
          console.log(
            `Dependency ${dep} is not used in ${lib.name}. It should be removed from package.json`
          );
        }
      }
    });
  });
}

// Check if package does not have any devDependencies!
function checkEmptyDevDependencies(libraries: Record<string, LibDepsMetaData>) {
  Object.values(libraries).forEach((lib) => {
    if (Object.keys(lib.devDependencies).length > 0) {
      console.log(
        `Package ${lib.name} should not have devDependencies specified. It should be installed in root package.json`
      );
    }
  });
}

// Check if we have everywhere tslib dependency
function checkTsLibDep(
  libraries: Record<string, LibDepsMetaData>,
  rootPackageJson: PackageJson,
  options: ProgramOptions
) {
  const tsLibVersion = rootPackageJson.dependencies['tslib'];
  Object.values(libraries).forEach((lib) => {
    // Temporary workaround to not apply this to libraries without TS files. We should check presence of typescript
    if (lib.name !== '@spartacus/styles') {
      if (!Object.keys(lib.dependencies).includes('tslib')) {
        if (options.fix) {
          const pathToPackageJson = `${lib.directory}/package.json`;
          const packageJson = readJsonFile(pathToPackageJson);
          if (typeof packageJson?.dependencies === 'undefined') {
            packageJson.dependencies = {};
          }
          packageJson.dependencies['tslib'] = tsLibVersion;
          saveJsonFile(pathToPackageJson, packageJson);
        } else {
          console.log(
            `Package ${lib.name} doesn't have tslib specified as dependency.`
          );
        }
      }
      if (Object.keys(lib.peerDependencies).includes('tslib')) {
        if (options.fix) {
          const pathToPackageJson = `${lib.directory}/package.json`;
          const packageJson = readJsonFile(pathToPackageJson);

          delete packageJson.peerDependencies['tslib'];
          saveJsonFile(pathToPackageJson, packageJson);
        } else {
          console.log(
            `Package ${lib.name} should not have tslib specified as peerDependency. It should be dependency!`
          );
        }
      }
      if (Object.keys(lib.optionalDependencies).includes('tslib')) {
        if (options.fix) {
          const pathToPackageJson = `${lib.directory}/package.json`;
          const packageJson = readJsonFile(pathToPackageJson);

          delete packageJson.optionalDependencies['tslib'];
          saveJsonFile(pathToPackageJson, packageJson);
        } else {
          console.log(
            `Package ${lib.name} should not have tslib specified as optionalDependency. It should be dependency!`
          );
        }
      }
    }
  });
}

function checkForLockFile(libraries: Record<string, LibDepsMetaData>) {
  Object.values(libraries).forEach((lib) => {
    const lockFile = glob.sync(`${lib.directory}/yarn.lock`);
    if (lockFile.length > 0) {
      console.log(
        `Package ${lib.name} have yarn.lock! It should not be present in spartacus libraries.`
      );
    }
  });
}

/**
 * Update versions in all libraries package json files
 */
function updateDependenciesVersions(
  libraries: Record<string, LibDepsMetaData>,
  rootPackageJson: PackageJson,
  options: ProgramOptions
) {
  const rootDeps = {
    ...rootPackageJson.dependencies,
    ...rootPackageJson.devDependencies,
  };
  Object.values(libraries).forEach((lib) => {
    const pathToPackageJson = `${lib.directory}/package.json`;
    const packageJson = readJsonFile(pathToPackageJson);
    Object.keys(packageJson.dependencies ?? {}).forEach((dep) => {
      if (!semver.validRange(packageJson.dependencies[dep])) {
        console.log(`Not a valid range ${packageJson.dependencies[dep]}`);
      }
      if (dep.startsWith('@spartacus')) {
        if (packageJson.dependencies[dep] !== libraries[dep].version) {
          if (options.fix) {
            packageJson.dependencies[dep] = libraries[dep].version;
          } else {
            console.log(
              `Dependency ${dep} in ${lib.name} package.json have different version than the package in repository!`
            );
          }
        }
      } else if (
        typeof rootDeps[dep] !== 'undefined' &&
        packageJson.dependencies[dep] !== rootDeps[dep]
      ) {
        if (options.fix) {
          // Careful with breaking changes!
          if (
            semver.major(semver.minVersion(packageJson.dependencies[dep])) ===
              semver.major(semver.minVersion(rootDeps[dep])) &&
            semver.gte(
              semver.minVersion(packageJson.dependencies[dep]),
              semver.minVersion(rootDeps[dep])
            )
          ) {
            // not a breaking change!
            packageJson.dependencies[dep] = rootDeps[dep];
          } else {
            // breaking change!
            if (options.breakingChanges) {
              packageJson.dependencies[dep] = rootDeps[dep];
            } else {
              console.log(
                `Difference between library version of ${dep} and root package.json. Updating is a breaking change!`
              );
            }
          }
        } else {
          console.log(
            `Dependency ${dep} in ${lib.name} package.json have different version than the package in root package.json file!`
          );
        }
      }
    });
    Object.keys(packageJson.peerDependencies ?? {}).forEach((dep) => {
      if (!semver.validRange(packageJson.peerDependencies[dep])) {
        console.log(`Not a valid range ${packageJson.peerDependencies[dep]}`);
      }
      if (dep.startsWith('@spartacus')) {
        if (packageJson.peerDependencies[dep] !== libraries[dep].version) {
          if (options.fix) {
            packageJson.peerDependencies[dep] = libraries[dep].version;
          } else {
            console.log(
              `Dependency ${dep} in ${lib.name} package.json have different version than the package in repository!`
            );
          }
        }
      } else if (
        typeof rootDeps[dep] !== 'undefined' &&
        packageJson.peerDependencies[dep] !== rootDeps[dep]
      ) {
        if (options.fix) {
          // Careful with breaking changes!
          if (
            semver.major(
              semver.minVersion(packageJson.peerDependencies[dep])
            ) === semver.major(semver.minVersion(rootDeps[dep])) &&
            semver.gte(
              semver.minVersion(packageJson.peerDependencies[dep]),
              semver.minVersion(rootDeps[dep])
            )
          ) {
            // not a breaking change!
            packageJson.peerDependencies[dep] = rootDeps[dep];
          } else {
            // breaking change!
            if (options.breakingChanges) {
              packageJson.peerDependencies[dep] = rootDeps[dep];
            } else {
              console.log(
                `Difference between library version of ${dep} and root package.json. Updating is a breaking change!`
              );
            }
          }
        } else {
          console.log(
            `Dependency ${dep} in ${lib.name} package.json have different version than the package in root package.json file!`
          );
        }
      }
    });
    Object.keys(packageJson.optionalDependencies ?? {}).forEach((dep) => {
      if (!semver.validRange(packageJson.optionalDependencies[dep])) {
        console.log(
          `Not a valid range ${packageJson.optionalDependencies[dep]}`
        );
      }
      if (dep.startsWith('@spartacus')) {
        if (packageJson.optionalDependencies[dep] !== libraries[dep].version) {
          if (options.fix) {
            packageJson.optionalDependencies[dep] = libraries[dep].version;
          } else {
            console.log(
              `Dependency ${dep} in ${lib.name} package.json have different version than the package in repository!`
            );
          }
        }
      } else if (
        typeof rootDeps[dep] !== 'undefined' &&
        packageJson.optionalDependencies[dep] !== rootDeps[dep]
      ) {
        if (options.fix) {
          // Careful with breaking changes!
          if (
            semver.major(
              semver.minVersion(packageJson.optionalDependencies[dep])
            ) === semver.major(semver.minVersion(rootDeps[dep])) &&
            semver.gte(
              semver.minVersion(packageJson.optionalDependencies[dep]),
              semver.minVersion(rootDeps[dep])
            )
          ) {
            // not a breaking change!
            packageJson.optionalDependencies[dep] = rootDeps[dep];
          } else {
            // breaking change!
            if (options.breakingChanges) {
              packageJson.optionalDependencies[dep] = rootDeps[dep];
            } else {
              console.log(
                `Difference between library version of ${dep} and root package.json. Updating is a breaking change!`
              );
            }
          }
        } else {
          console.log(
            `Dependency ${dep} in ${lib.name} package.json have different version than the package in root package.json file!`
          );
        }
      }
    });
    saveJsonFile(pathToPackageJson, packageJson);
  });
}
