/**
 * Algorithm for managing dependencies in spartacus
 *
 * Assumptions:
 * - all dependencies for packages and app are stored only in top level node_modules
 * - internal tooling (cypress, github actions) can have separate node_modules
 * - if library have import in any *.ts, *.scss file to dependency it should be specified as peer (optional) dependency in lib package.json
 * - @spartacus/* peer deps should match version in their package.json
 * - deps version should match version in the root package.json
 * - all TS packages should have dependency on tslib
 * - all used deps must be listed in root package.json
 * - schematics should also have version synced from the root package.json and library list of dependencies (should be done in schematics)
 */

import chalk from 'chalk';
import { execSync } from 'child_process';
import fs, { readFileSync } from 'fs';
import glob from 'glob';
import postcss from 'postcss-scss';
import semver from 'semver';
import ts from 'typescript';
import {
  PACKAGE_JSON,
  SAPUI5_TYPES,
  SAP_SCOPE,
  SPARTACUS_SCHEMATICS,
  SPARTACUS_SCOPE,
} from './const';
import {
  error,
  Library,
  logUpdatedFile,
  PackageJson,
  ProgramOptions,
  reportProgress,
  Repository,
  success,
} from './index';

// ------------ Utilities ------------

/**
 * Read and parse json file content
 *
 * @param path json file path
 *
 * @returns content of the json
 */
function readJsonFile(path: string): any {
  return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

/**
 * Stringify and safe json file content
 *
 * @param path json file path
 * @param content content to save
 */
function saveJsonFile(path: string, content: any): void {
  fs.writeFileSync(path, JSON.stringify(content, undefined, 2));
}

/**
 * Get list of all imports (paths)
 *
 * @param sourceFile ts source file
 *
 * @returns set with import paths
 */
function getAllImports(sourceFile: ts.SourceFile): Set<string> {
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

// ------------ Utilities end ------------

interface LibraryWithDependencies extends Library {
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
  externalDependencies: {
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
  externalDependenciesForPackageJson: {
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
    .map((library: Library): LibraryWithDependencies => {
      const tsImports: LibraryWithDependencies['tsImports'] = {};
      const scssImports: LibraryWithDependencies['scssImports'] = {};

      // Gather data about ts imports
      const tsFilesPaths = glob.sync(`${library.directory}/**/*.ts`, {
        // Ignore assets json translation scripts
        // TODO: Remove when translation script will be moved to lib builder
        ignore: [`projects/assets/generate-translations-*.ts`],
      });

      tsFilesPaths.forEach((fileName) => {
        const sourceFile = ts.createSourceFile(
          fileName,
          readFileSync(fileName).toString(),
          ts.ScriptTarget.ES2015,
          true
        );

        const fileImports = getAllImports(sourceFile);
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

      // Gather data about scss imports
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
    })
    .reduce((acc: Record<string, LibraryWithDependencies>, curr) => {
      acc[curr.name] = curr;
      return acc;
    }, {});

  // Check where imports are used (spec, lib, schematics, schematics spec)
  categorizeUsageOfDependencies(libraries);

  // Check for rxjs/internal imports
  checkRxInternalImports(libraries, options);

  // Filter out al the relative paths for our source code
  filterLocalRelativeImports(libraries);

  // Check if we use node dependencies where we should not, then filter native Node imports.
  filterNativeNodeAPIs(libraries, options);

  // Check if we use absolute paths where we should not, then filter these.
  filterLocalAbsolutePathFiles(libraries, options);

  // Define list of external dependencies for each library
  extractExternalDependenciesFromImports(libraries);

  const rootPackageJsonContent: PackageJson = readJsonFile(`./${PACKAGE_JSON}`);

  // Check if we have all dependencies directly referenced in root package.json
  checkIfWeHaveAllDependenciesInPackageJson(
    libraries,
    rootPackageJsonContent,
    options
  );

  // Filer out spec dependencies as we already checked everything related to them
  filterOutSpecOnlyDependencies(libraries);

  // Add to lib package.json missing dependencies
  addMissingDependenciesToPackageJson(
    libraries,
    rootPackageJsonContent,
    options
  );

  // Remove unused dependencies from libraries package.json files
  removeNotUsedDependenciesFromPackageJson(libraries, options);

  // Make sure that libraries don't have devDependencies
  checkEmptyDevDependencies(libraries, options);

  // Check if all TS packages have dependency on tslib
  checkTsLibDep(libraries, rootPackageJsonContent, options);

  // Check if libraries doesn't use local node_modules
  checkForLockFile(libraries, options);

  // Synchronize version in libraries dependencies to root package.json
  updateDependenciesVersions(libraries, rootPackageJsonContent, options);

  if (options.fix) {
    savePackageJsonFiles(libraries);
  }
}

/**
 * Remove these imports from the object as it is no longer useful in processing.
 */
function filterLocalRelativeImports(
  libraries: Record<string, LibraryWithDependencies>
): void {
  Object.values(libraries).forEach((lib) => {
    lib.tsImports = Object.values(lib.tsImports)
      .filter((imp) => !imp.importPath.startsWith('.'))
      .reduce((acc, curr) => {
        acc[curr.importPath] = curr;
        return acc;
      }, {} as LibraryWithDependencies['tsImports']);
    lib.scssImports = Object.values(lib.scssImports)
      .filter(
        (imp) =>
          imp.importPath.startsWith('node_modules/') ||
          imp.importPath.startsWith('~')
      )
      .reduce((acc, curr) => {
        acc[curr.importPath] = curr;
        return acc;
      }, {} as LibraryWithDependencies['scssImports']);
  });
}

/**
 * Filter native Node.js APIs
 */
function filterNativeNodeAPIs(
  libraries: Record<string, LibraryWithDependencies>,
  options: ProgramOptions
): void {
  const nodeAPIs = [
    'fs',
    'fs/promise',
    'path',
    'events',
    'assert',
    'async_hooks',
    'child_process',
    'cluster',
    'crypto',
    'diagnostics_channel',
    'dns',
    'domain',
    'http',
    'http2',
    'https',
    'inspector',
    'net',
    'os',
    'perf_hooks',
    'process',
    'punycode',
    'querystring',
    'readline',
    'repl',
    'stream',
    'string_decoder',
    'tls',
    'trace_events',
    'tty',
    'dgram',
    'url',
    'util',
    'v8',
    'vm',
    'wasi',
    'worker_threads',
    'zlib',
  ];

  if (!options.fix) {
    reportProgress('Checking imports of Node.js APIs');

    let errorsFound = false;
    Object.values(libraries).forEach((lib) => {
      lib.tsImports = Object.values(lib.tsImports)
        .filter((imp) => {
          if (nodeAPIs.includes(imp.importPath)) {
            // Don't run the check in fix mode
            if (!options.fix) {
              // Don't allow to use node api outside of schematics files
              if (imp.usageIn.spec || imp.usageIn.lib) {
                imp.files.forEach((file) => {
                  // Allow to use Node APIs in SSR
                  if (!file.includes('ssr')) {
                    errorsFound = true;
                    error(
                      file,
                      [
                        `Node.js API \`${chalk.bold(
                          imp.importPath
                        )}\` is referenced.`,
                      ],
                      [
                        `Node.js APIs can only be used in SSR code or in schematics.`,
                        `You might have wanted to import it from some library instead.`,
                      ]
                    );
                  }
                });
              }
            }
            return false;
          }
          return true;
        })
        .reduce((acc, curr) => {
          acc[curr.importPath] = curr;
          return acc;
        }, {} as LibraryWithDependencies['tsImports']);
    });
    if (!errorsFound) {
      success();
    }
  }
}

/**
 * Filer native Node.js APIs
 */
function filterLocalAbsolutePathFiles(
  libraries: Record<string, LibraryWithDependencies>,
  options: ProgramOptions
): void {
  if (!options.fix) {
    reportProgress('Checking absolute path imports');

    let errorsFound = false;
    Object.values(libraries).forEach((lib) => {
      lib.tsImports = Object.values(lib.tsImports)
        .filter((imp) => {
          if (
            fs.existsSync(imp.importPath) ||
            fs.existsSync(`${imp.importPath}.ts`)
          ) {
            // Don't run in fix mode
            if (!options.fix) {
              // Allow to use absolute paths for spec files
              if (
                imp.usageIn.lib ||
                imp.usageIn.schematics ||
                imp.usageIn.schematicsSpec
              ) {
                imp.files.forEach((file) => {
                  errorsFound = true;
                  error(
                    file,
                    [
                      `Absolute import should not be used outside of spec files.\n    Referenced \`${chalk.bold(
                        imp.importPath
                      )}\``,
                    ],
                    [
                      `You can use absolute paths only in test files.`,
                      `Use relative or entry point import instead.`,
                    ]
                  );
                });
              }
            }
            return false;
          }
          return true;
        })
        .reduce((acc, curr) => {
          acc[curr.importPath] = curr;
          return acc;
        }, {} as LibraryWithDependencies['tsImports']);
    });
    if (!errorsFound) {
      success();
    }
  }
}

/**
 * Categorize in which type of files we use different dependencies
 */
function categorizeUsageOfDependencies(
  libraries: Record<string, LibraryWithDependencies>
): void {
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
 * Check rxjs/internal imports
 */
function checkRxInternalImports(
  libraries: Record<string, LibraryWithDependencies>,
  options: ProgramOptions
): void {
  if (!options.fix) {
    reportProgress('Checking `rx/internal` imports');
    let errorsFound = false;
    Object.values(libraries).forEach((lib) => {
      Object.values(lib.tsImports).forEach((imp) => {
        if (imp.importPath.includes('rxjs/internal')) {
          imp.files.forEach((file) => {
            errorsFound = true;
            error(
              file,
              [`\`${chalk.bold(imp.importPath)}\` internal import used.`],
              [
                `To import from rxjs library you should use \`${chalk.bold(
                  'rxjs'
                )}\` or \`${chalk.bold('rxjs/operators')}\` imports.`,
              ]
            );
          });
        }
      });
    });
    if (!errorsFound) {
      success();
    }
  }
}

/**
 * Extract external dependencies from imports
 */
function extractExternalDependenciesFromImports(
  libraries: Record<string, LibraryWithDependencies>
): void {
  Object.values(libraries).forEach((lib) => {
    Object.values(lib.tsImports).forEach((imp) => {
      let dependency: string;
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
      let dependency: string;
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
  libraries: Record<string, LibraryWithDependencies>,
  packageJson: PackageJson,
  options: ProgramOptions
): void {
  if (!options.fix) {
    const allDeps = {
      ...packageJson.devDependencies,
      ...packageJson.dependencies,
    };
    const errors: string[] = [];
    reportProgress(`Checking for missing dependencies in root ${PACKAGE_JSON}`);
    Object.values(libraries).forEach((lib) => {
      Object.values(lib.externalDependencies).forEach((dep) => {
        if (
          !dep.dependency.startsWith(`${SPARTACUS_SCOPE}/`) &&
          dep.dependency !== SAP_SCOPE &&
          !Object.keys(allDeps).includes(dep.dependency)
        ) {
          errors.push(
            `Missing \`${chalk.bold(
              dep.dependency
            )}\` dependency that is used directly in \`${chalk.bold(
              lib.name
            )}\`.`
          );
        }
      });
    });
    if (errors.length) {
      error(PACKAGE_JSON, errors, [
        `All dependencies that are directly referenced should be specified as \`${chalk.bold(
          'dependencies'
        )}\` or \`${chalk.bold('devDependencies')}\`.`,
        `Install them with \`${chalk.bold(
          'yarn add <dependency-name> [--dev]'
        )}\`.`,
      ]);
    } else {
      success();
    }
  }
}

/**
 * Remove spec external dependencies as we already took care of them.
 */
function filterOutSpecOnlyDependencies(
  libraries: Record<string, LibraryWithDependencies>
): void {
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
      }, {} as LibraryWithDependencies['externalDependenciesForPackageJson']);
  });
}

/**
 * Adds peerDependencies to libraries package.json files
 */
function addMissingDependenciesToPackageJson(
  libraries: Record<string, LibraryWithDependencies>,
  rootPackageJson: PackageJson,
  options: ProgramOptions
): void {
  const deps: PackageJson['dependencies'] | PackageJson['devDependencies'] = {
    ...rootPackageJson.dependencies,
    ...rootPackageJson.devDependencies,
  };
  if (options.fix) {
    reportProgress('Updating missing peerDependencies');
  } else {
    reportProgress('Checking for missing peerDependencies');
  }
  const updates = new Set<string>();
  let errorsFound = false;
  Object.values(libraries).forEach((lib) => {
    const pathToPackageJson = `${lib.directory}/${PACKAGE_JSON}`;
    const errors: string[] = [];
    Object.values(lib.externalDependenciesForPackageJson).forEach((dep) => {
      if (
        typeof lib.dependencies[dep.dependency] === 'undefined' &&
        typeof lib.peerDependencies[dep.dependency] === 'undefined' &&
        typeof lib.optionalDependencies[dep.dependency] === 'undefined' &&
        dep.dependency !== lib.name
      ) {
        if (options.fix) {
          const packageJson = lib.packageJsonContent;
          const version = deps[dep.dependency];
          if (
            typeof version === 'undefined' &&
            !dep.dependency.startsWith(`${SPARTACUS_SCOPE}/`)
          ) {
            // Nothing we can do here. First the dependencies must be added to root package.json (previous check).
          } else if (dep.dependency === SAP_SCOPE) {
            // Work around mismatch between package name (@sapui5/ts-types-esm) and module names (sap/...) for UI5 type definitions
          } else {
            if (typeof packageJson.peerDependencies === 'undefined') {
              packageJson.peerDependencies = {};
            }
            if (typeof version !== 'undefined') {
              packageJson.peerDependencies[dep.dependency] = version;
              updates.add(pathToPackageJson);
            } else if (dep.dependency !== lib.name) {
              packageJson.peerDependencies[dep.dependency] =
                libraries[dep.dependency].version;
              updates.add(pathToPackageJson);
            }
          }
        } else {
          if (dep.dependency === SAP_SCOPE) {
            // Work around mismatch between package name (@sapui5/ts-types-esm) and module names (sap/...) for UI5 type definitions
          } else {
            errors.push(
              `Missing \`${chalk.bold(
                dep.dependency
              )}\` dependency that is directly referenced in library.`
            );
          }
        }
      }
    });
    if (errors.length) {
      errorsFound = true;
      error(pathToPackageJson, errors, [
        `All dependencies that are directly referenced should be specified as \`${chalk.bold(
          'dependencies'
        )}\` or \`${chalk.bold('peerDependencies')}\`.`,
        `Adding new \`${chalk.bold(
          'peerDependency'
        )}\` might be a breaking change!`,
        `This can be automatically fixed by running \`${chalk.bold(
          'yarn config:update'
        )}\`.`,
      ]);
    }
  });
  if (options.fix) {
    if (updates.size > 0) {
      updates.forEach((packageJsonPath) => {
        logUpdatedFile(packageJsonPath);
      });
    } else {
      success();
    }
  } else if (!errorsFound) {
    success();
  }
}

/**
 * Remove dependencies that are no longer referenced in the library
 */
function removeNotUsedDependenciesFromPackageJson(
  libraries: Record<string, LibraryWithDependencies>,
  options: ProgramOptions
): void {
  // Keep these dependencies in schematics as these are used as external schematics
  const externalSchematics = ['@angular/pwa', '@nguniversal/express-engine'];

  if (options.fix) {
    reportProgress('Removing unused dependencies');
  } else {
    reportProgress('Checking unused dependencies');
  }
  const updates = new Set<string>();
  let errorsFound = false;
  Object.values(libraries).forEach((lib) => {
    const deps = {
      ...lib.dependencies,
      ...lib.peerDependencies,
      ...lib.optionalDependencies,
    };
    const errors: string[] = [];
    const pathToPackageJson = `${lib.directory}/${PACKAGE_JSON}`;
    Object.keys(deps).forEach((dep) => {
      if (
        typeof lib.externalDependenciesForPackageJson[dep] === 'undefined' &&
        dep !== SAPUI5_TYPES &&
        dep !== `tslib` &&
        ((lib.name === SPARTACUS_SCHEMATICS &&
          !externalSchematics.includes(dep)) ||
          lib.name !== SPARTACUS_SCHEMATICS)
      ) {
        if (options.fix) {
          const packageJson = lib.packageJsonContent;
          if (typeof packageJson?.dependencies?.[dep] !== 'undefined') {
            delete packageJson.dependencies[dep];
            updates.add(pathToPackageJson);
          } else if (
            typeof packageJson?.peerDependencies?.[dep] !== 'undefined'
          ) {
            delete packageJson.peerDependencies[dep];
            updates.add(pathToPackageJson);
          } else if (
            typeof packageJson?.optionalDependencies?.[dep] !== 'undefined'
          ) {
            delete packageJson.optionalDependencies[dep];
            updates.add(pathToPackageJson);
          }
        } else {
          errors.push(
            `Dependency \`${chalk.bold(
              dep
            )}\` is not used in the \`${chalk.bold(lib.name)}\`.`
          );
        }
      }
    });
    if (errors.length > 0) {
      errorsFound = true;
      error(pathToPackageJson, errors, [
        `Dependencies that are not used should not be specified in package list of \`${chalk.bold(
          'dependencies'
        )}\` or \`${chalk.bold('peerDependencies')}\`.`,
        `This can be automatically fixed by running \`${chalk.bold(
          'yarn config:update'
        )}\`.`,
      ]);
    }
  });
  if (options.fix) {
    if (updates.size > 0) {
      updates.forEach((packageJsonPath) => {
        logUpdatedFile(packageJsonPath);
      });
    } else {
      success();
    }
  } else if (!errorsFound) {
    success();
  }
}

/**
 * Check if package does not have any devDependencies
 */
function checkEmptyDevDependencies(
  libraries: Record<string, LibraryWithDependencies>,
  options: ProgramOptions
): void {
  if (!options.fix) {
    reportProgress('Checking unnecessary `devDependencies`');
    let errorsFound = false;
    Object.values(libraries).forEach((lib) => {
      if (Object.keys(lib.devDependencies).length > 0) {
        const pathToPackageJson = `${lib.directory}/${PACKAGE_JSON}`;
        errorsFound = true;
        error(
          pathToPackageJson,
          [
            `Libraries should not have \`${chalk.bold(
              'devDependencies'
            )}\` specified in their ${PACKAGE_JSON}.`,
          ],
          [
            `You should use \`${chalk.bold(
              'devDependencies'
            )}\` from root ${PACKAGE_JSON} file.`,
            `You should remove this section from this ${PACKAGE_JSON}.`,
          ]
        );
      }
    });
    if (!errorsFound) {
      success();
    }
  }
}

// Check if we have everywhere tslib dependency
function checkTsLibDep(
  libraries: Record<string, LibraryWithDependencies>,
  rootPackageJson: PackageJson,
  options: ProgramOptions
): void {
  const tsLibName = 'tslib';
  const tsLibVersion = rootPackageJson.dependencies?.[tsLibName];
  if (options.fix) {
    reportProgress(`Updating \`${tsLibName}\` dependency usage`);
  } else {
    reportProgress(`Checking \`${tsLibName}\` dependency usage`);
  }
  const updates = new Set<string>();
  let errorsFound = false;
  Object.values(libraries).forEach((lib) => {
    // Styles library is the only library without TS
    if (lib.name !== `${SPARTACUS_SCOPE}/styles`) {
      const pathToPackageJson = `${lib.directory}/${PACKAGE_JSON}`;
      const errors = [];
      if (!Object.keys(lib.dependencies).includes(tsLibName)) {
        if (options.fix) {
          const packageJson = lib.packageJsonContent;
          if (typeof packageJson?.dependencies === 'undefined') {
            packageJson.dependencies = {};
          }
          packageJson.dependencies[tsLibName] = tsLibVersion!;
          updates.add(pathToPackageJson);
        } else {
          errors.push(
            `Missing \`${chalk.bold(tsLibName)}\` dependency in \`${chalk.bold(
              'dependencies'
            )}\` list.`
          );
        }
      }
      if (Object.keys(lib.peerDependencies).includes(tsLibName)) {
        if (options.fix) {
          const packageJson = lib.packageJsonContent;
          delete packageJson.peerDependencies?.[tsLibName];
          updates.add(pathToPackageJson);
        } else {
          errors.push(
            `Dependency \`${chalk.bold(
              tsLibName
            )}\` should be in \`${chalk.bold(
              'dependencies'
            )}\` list. Not in the \`${chalk.bold('peerDependencies')}\`.`
          );
        }
      }
      if (Object.keys(lib.optionalDependencies).includes(tsLibName)) {
        if (options.fix) {
          const packageJson = lib.packageJsonContent;
          delete packageJson.optionalDependencies?.[tsLibName];
          updates.add(pathToPackageJson);
        } else {
          errors.push(
            `Dependency \`${chalk.bold(
              tsLibName
            )}\` should be in \`${chalk.bold(
              'dependencies'
            )}\` list. Not in the \`${chalk.bold('optionalDependency')}\`.`
          );
        }
      }
      if (errors.length > 0) {
        errorsFound = true;
        error(pathToPackageJson, errors, [
          `Each TS package should have \`${chalk.bold(
            tsLibName
          )}\` specified as \`${chalk.bold('dependency')}.`,
          `This can be automatically fixed by running \`${chalk.bold(
            'yarn config:update'
          )}\`.`,
        ]);
      }
    }
  });
  if (options.fix) {
    if (updates.size > 0) {
      updates.forEach((packageJsonPath) => {
        logUpdatedFile(packageJsonPath);
      });
    } else {
      success();
    }
  } else if (!errorsFound) {
    success();
  }
}

function checkForLockFile(
  libraries: Record<string, LibraryWithDependencies>,
  options: ProgramOptions
): void {
  if (!options.fix) {
    reportProgress('Checking for unnecessary `yarn.lock` files');
    let errorsFound = false;
    Object.values(libraries).forEach((lib) => {
      const lockFile = glob.sync(`${lib.directory}/yarn.lock`);
      if (lockFile.length > 0) {
        errorsFound = true;
        error(
          lockFile[0],
          [
            `Library \`${chalk.bold(
              lib.name
            )}\` should not have its own \`${chalk.bold('yarn.lock')}\`.`,
          ],
          [
            `Libraries should use packages from root \`${chalk.bold(
              PACKAGE_JSON
            )}\` and root \`${chalk.bold('node_modules')}\`.`,
          ]
        );
      }
    });
    if (!errorsFound) {
      success();
    }
  }
}

/**
 * Update versions in all libraries package json files
 */
function updateDependenciesVersions(
  libraries: Record<string, LibraryWithDependencies>,
  rootPackageJson: PackageJson,
  options: ProgramOptions
): void {
  const rootDeps: PackageJson['dependencies'] | PackageJson['devDependencies'] =
    {
      ...rootPackageJson.dependencies,
      ...rootPackageJson.devDependencies,
    };
  if (options.fix) {
    reportProgress(
      `Updating packages versions between libraries and root ${PACKAGE_JSON}`
    );
  } else {
    reportProgress(
      `Checking packages versions between libraries and root ${PACKAGE_JSON}`
    );
  }
  const updates = new Set<string>();
  let errorsFound = false;
  Object.values(libraries).forEach((lib) => {
    const pathToPackageJson = `${lib.directory}/${PACKAGE_JSON}`;
    const packageJson = lib.packageJsonContent;
    const types = [
      'dependencies',
      'peerDependencies',
      'optionalDependencies',
    ] as const;
    const errors: string[] = [];
    const internalErrors: string[] = [];
    const breakingErrors: string[] = [];
    types.forEach((type) => {
      Object.keys(packageJson[type] ?? {}).forEach((dep) => {
        if (!semver.validRange(packageJson[type]?.[dep])) {
          if (!options.fix) {
            errorsFound = true;
            error(
              pathToPackageJson,
              [
                `Package \`${chalk.bold(
                  packageJson[type]?.[dep]
                )}\` version is not correct.`,
              ],
              [`Install package version that follows semver.`]
            );
          }
          return;
        }
        if (dep.startsWith(SPARTACUS_SCOPE)) {
          if (packageJson[type]?.[dep] !== libraries[dep].version) {
            if (options.fix) {
              packageJson[type]![dep] = libraries[dep].version;
              updates.add(pathToPackageJson);
            } else {
              internalErrors.push(
                `Dependency \`${chalk.bold(
                  dep
                )}\` have different version \`${chalk.bold(
                  packageJson[type]?.[dep]
                )}\` than the package in repository \`${chalk.bold(
                  libraries[dep].version
                )}\`.`
              );
            }
          }
        } else if (
          typeof rootDeps[dep] !== 'undefined' &&
          packageJson[type]?.[dep] !== rootDeps[dep]
        ) {
          // Careful with breaking changes!
          if (
            semver.major(semver.minVersion(packageJson[type]![dep])!) ===
              semver.major(semver.minVersion(rootDeps[dep])!) &&
            semver.gte(
              semver.minVersion(packageJson[type]![dep])!,
              semver.minVersion(rootDeps[dep])!
            )
          ) {
            // not a breaking change!
            if (options.fix) {
              packageJson[type]![dep] = rootDeps[dep];
              updates.add(pathToPackageJson);
            } else {
              errors.push(
                `Dependency \`${chalk.bold(
                  dep
                )}\` have different version \`${chalk.bold(
                  packageJson[type]?.[dep]
                )}\` than the package in root \`${chalk.bold(
                  PACKAGE_JSON
                )}\` file \`${chalk.bold(rootDeps[dep])}\`.`
              );
            }
          } else {
            // breaking change!
            if (options.bumpVersions && options.fix) {
              packageJson[type]![dep] = rootDeps[dep];
              updates.add(pathToPackageJson);
            } else if (!options.fix) {
              breakingErrors.push(
                `Dependency \`${chalk.bold(
                  dep
                )}\` have different version \`${chalk.bold(
                  packageJson[type]?.[dep]
                )}\` than the package in root \`${chalk.bold(
                  PACKAGE_JSON
                )}\` file \`${chalk.bold(rootDeps[dep])}\`.`
              );
            }
          }
        }
      });
    });
    if (internalErrors.length > 0) {
      errorsFound = true;
      error(pathToPackageJson, internalErrors, [
        `All spartacus dependencies should be version synchronized.`,
        `Version of the package in \`${chalk.bold(
          'peerDependencies'
        )}\` should match package \`${chalk.bold(
          'version'
        )}\` from repository.`,
        `This can be automatically fixed by running \`${chalk.bold(
          'yarn config:update'
        )}\`.`,
      ]);
    }
    if (errors.length > 0) {
      errorsFound = true;
      error(pathToPackageJson, errors, [
        `All external dependencies should have the same version as in the root \`${chalk.bold(
          PACKAGE_JSON
        )}\`.`,
        `This can be automatically fixed by running \`${chalk.bold(
          'yarn config:update'
        )}\`.`,
      ]);
    }
    if (breakingErrors.length > 0) {
      errorsFound = true;
      error(pathToPackageJson, breakingErrors, [
        `All external dependencies should have the same version as in the root \`${chalk.bold(
          PACKAGE_JSON
        )}\`.`,
        `Bumping to a higher dependency version should be only done in major releases!`,
        `We want to specify everywhere the lowest compatible dependency version with Spartacus.`,
        `This can be automatically fixed by running \`${chalk.bold(
          'yarn config:update --bump-versions'
        )}\`.`,
      ]);
    }
  });
  if (options.fix) {
    if (updates.size > 0) {
      updates.forEach((packageJsonPath) => {
        logUpdatedFile(packageJsonPath);
      });
    } else {
      success();
    }
  } else if (!errorsFound) {
    success();
  }
}

/**
 * Save updated package.json files.
 */
function savePackageJsonFiles(
  libraries: Record<string, LibraryWithDependencies>
) {
  reportProgress('Saving package.json files to disk');
  Object.values(libraries).forEach((lib) => {
    const pathToPackageJson = `${lib.directory}/${PACKAGE_JSON}`;
    const packageJson = lib.packageJsonContent;
    saveJsonFile(pathToPackageJson, packageJson);
    execSync(`cd ${lib.directory} && npx sort-package-json`, {
      stdio: 'ignore',
    });
    logUpdatedFile(pathToPackageJson);
  });
}
