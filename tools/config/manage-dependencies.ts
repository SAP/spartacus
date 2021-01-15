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
 */

import chalk from 'chalk';
import fs, { readFileSync } from 'fs';
import glob from 'glob';
import postcss from 'postcss-scss';
import semver from 'semver';
import * as ts from 'typescript';
import {
  Library,
  PackageJson,
  prettyBreakingWarning,
  prettyError,
  ProgramOptions,
  reportProgress,
  Repository,
} from './index';

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
  filterLocalRelativeImports(libraries);
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

  if (options.fix) {
    savePackageJsonFiles(libraries);
  }
}

/**
 * Remove these imports from the object as it is no longer useful in processing.
 */
function filterLocalRelativeImports(
  libraries: Record<string, LibDepsMetaData>
) {
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
 * Filter native Node.js APIs
 */
function filterNativeNodeAPIs(libraries: Record<string, LibDepsMetaData>) {
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

  reportProgress('Checking imports of Node.js APIs');
  Object.values(libraries).forEach((lib) => {
    lib.tsImports = Object.values(lib.tsImports)
      .filter((imp) => {
        if (nodeAPIs.includes(imp.importPath)) {
          // Don't allow to use node api outside of schematics spec files
          if (imp.usageIn.spec || imp.usageIn.lib || imp.usageIn.schematics) {
            imp.files.forEach((file) => {
              // Allow to use Node APIs in SSR
              if (!file.includes('ssr')) {
                prettyError(
                  file,
                  [
                    `Node.js API \`${chalk.bold(
                      imp.importPath
                    )}\` is referenced.`,
                  ],
                  [
                    `Node.js APIs can only be used in SSR code or in schematics specs.`,
                    `You might have wanted to import it from some library instead.`,
                  ]
                );
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
  reportProgress('Checking absolute path imports');
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
            imp.files.forEach((file) => {
              prettyError(
                file,
                [
                  `Absolute import should not be used outside of spec files.\n   Referenced \`${chalk.bold(
                    imp.importPath
                  )}\``,
                ],
                [
                  `You should use absolute paths only for testing modules.`,
                  `Use relative or entry point import instead.`,
                ]
              );
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
  reportProgress('Checking `rx/internal` imports');
  Object.values(libraries).forEach((lib) => {
    Object.values(lib.tsImports).forEach((imp) => {
      if (imp.importPath.includes('rxjs/internal')) {
        imp.files.forEach((file) => {
          prettyError(
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
  const errors = [];
  reportProgress('Checking for missing dependencies in root package.json');
  Object.values(libraries).forEach((lib) => {
    Object.values(lib.externalDependencies).forEach((dep) => {
      if (
        !dep.dependency.startsWith('@spartacus/') &&
        !Object.keys(allDeps).includes(dep.dependency)
      ) {
        errors.push(
          `Missing \`${chalk.bold(
            dep.dependency
          )}\` dependency that is used directly in \`${chalk.bold(lib.name)}\`.`
        );
      }
    });
  });
  if (errors.length) {
    prettyError('package.json', errors, [
      `All dependencies that are directly referenced should be specified as \`${chalk.bold(
        'dependencies'
      )}\` or \`${chalk.bold('devDependencies')}\`.`,
      `Install them with \`${chalk.bold(
        'yarn add <dependency-name> (--dev)'
      )}\`.`,
    ]);
  }
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

  reportProgress('Checking for missing peerDependencies');
  Object.values(libraries).forEach((lib) => {
    const pathToPackageJson = `${lib.directory}/package.json`;
    const errors = [];
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
            !dep.dependency.startsWith('@spartacus/')
          ) {
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
          }
        } else {
          errors.push(
            `Missing \`${chalk.bold(
              dep.dependency
            )}\` dependency that is directly referenced in library.`
          );
        }
      }
    });
    if (errors.length) {
      prettyError(pathToPackageJson, errors, [
        `All dependencies that are directly referenced should be specified as \`${chalk.bold(
          'dependencies'
        )}\` or \`${chalk.bold('peerDependencies')}\`.`,
        `Adding new \`${chalk.bold(
          'peerDependency'
        )}\` is considered a breaking change!`,
        `This can be automatically fixed by running \`${chalk.bold(
          'yarn config:update'
        )}\`.`,
      ]);
    }
  });
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
    const errors = [];
    const pathToPackageJson = `${lib.directory}/package.json`;
    reportProgress('Checking unused dependencies');
    Object.keys(deps).forEach((dep) => {
      if (
        typeof lib.externalDependenciesForPackageJson[dep] === 'undefined' &&
        dep !== `tslib`
      ) {
        if (options.fix) {
          const packageJson = lib.packageJsonContent;
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
      prettyError(pathToPackageJson, errors, [
        `Dependencies that are not used should not be specified in package list of \`${chalk.bold(
          'dependencies'
        )}\` or \`${chalk.bold('peerDependencies')}\`.`,
        `This can be automatically fixed by running \`${chalk.bold(
          'yarn config:update'
        )}\`.`,
      ]);
    }
  });
}

// Check if package does not have any devDependencies!
function checkEmptyDevDependencies(libraries: Record<string, LibDepsMetaData>) {
  reportProgress('Checking unnecessary `devDependencies`');
  Object.values(libraries).forEach((lib) => {
    if (Object.keys(lib.devDependencies).length > 0) {
      const pathToPackageJson = `${lib.directory}/package.json`;
      prettyError(
        pathToPackageJson,
        [
          `Libraries should not have \`${chalk.bold(
            'devDependencies'
          )}\` specified in their package.json.`,
        ],
        [
          `You should use \`${chalk.bold(
            'devDependencies'
          )}\` from root package.json file.`,
          `You should remove this section from this package.json.`,
        ]
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

  reportProgress('Checking `tslib` dependency usage');
  Object.values(libraries).forEach((lib) => {
    // Temporary workaround to not apply this to libraries without TS files. We should check presence of typescript
    if (lib.name !== '@spartacus/styles') {
      const pathToPackageJson = `${lib.directory}/package.json`;
      const errors = [];
      if (!Object.keys(lib.dependencies).includes('tslib')) {
        if (options.fix) {
          const packageJson = lib.packageJsonContent;
          if (typeof packageJson?.dependencies === 'undefined') {
            packageJson.dependencies = {};
          }
          packageJson.dependencies['tslib'] = tsLibVersion;
        } else {
          errors.push(
            `Missing \`${chalk.bold('tslib')}\` dependency in \`${chalk.bold(
              'dependencies'
            )}\` list.`
          );
        }
      }
      if (Object.keys(lib.peerDependencies).includes('tslib')) {
        if (options.fix) {
          const packageJson = lib.packageJsonContent;
          delete packageJson.peerDependencies['tslib'];
        } else {
          errors.push(
            `Dependency \`${chalk.bold('tslib')}\` should be in \`${chalk.bold(
              'dependencies'
            )}\` list. Not in the \`${chalk.bold('peerDependencies')}\`.`
          );
        }
      }
      if (Object.keys(lib.optionalDependencies).includes('tslib')) {
        if (options.fix) {
          const packageJson = lib.packageJsonContent;
          delete packageJson.optionalDependencies['tslib'];
        } else {
          errors.push(
            `Dependency \`${chalk.bold('tslib')}\` should be in \`${chalk.bold(
              'dependencies'
            )}\` list. Not in the \`${chalk.bold('optionalDependency')}\`.`
          );
        }
      }
      if (errors.length > 0) {
        prettyError(pathToPackageJson, errors, [
          `Each TS package should have \`${chalk.bold(
            'tslib'
          )}\` specified as \`${chalk.bold('dependency')}.`,
          `This can be automatically fixed by running \`${chalk.bold(
            'yarn config:update'
          )}\`.`,
        ]);
      }
    }
  });
}

function checkForLockFile(libraries: Record<string, LibDepsMetaData>) {
  reportProgress('Checking for unnecessary `yarn.lock` files');
  Object.values(libraries).forEach((lib) => {
    const lockFile = glob.sync(`${lib.directory}/yarn.lock`);
    if (lockFile.length > 0) {
      prettyError(
        lockFile[0],
        [
          `Library \`${chalk.bold(
            lib.name
          )}\` should not have it's own \`${chalk.bold('yarn.lock')}\`.`,
        ],
        [
          `Libraries should use packages from root \`${chalk.bold(
            'package.json'
          )}\` and root \`${chalk.bold('node_modules')}\`.`,
        ]
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
  reportProgress(
    'Checking package versions between libraries and root package.json'
  );
  Object.values(libraries).forEach((lib) => {
    const pathToPackageJson = `${lib.directory}/package.json`;
    const packageJson = lib.packageJsonContent;
    const types = ['dependencies', 'peerDependencies', 'optionalDependencies'];
    const errors = [];
    const internalErrors = [];
    const breakingErrors = [];
    types.forEach((type) => {
      Object.keys(packageJson[type] ?? {}).forEach((dep) => {
        if (!semver.validRange(packageJson[type][dep])) {
          prettyError(
            pathToPackageJson,
            [
              `Package \`${chalk.bold(
                packageJson[type][dep]
              )}\` version is not correct.`,
            ],
            [`Install package version that follows semver.`]
          );
        }
        if (dep.startsWith('@spartacus')) {
          if (packageJson[type][dep] !== libraries[dep].version) {
            if (options.fix) {
              packageJson[type][dep] = libraries[dep].version;
            } else {
              internalErrors.push(
                `Dependency \`${chalk.bold(
                  dep
                )}\` have different version \`${chalk.bold(
                  packageJson[type][dep]
                )}\` than the package in repository \`${chalk.bold(
                  libraries[dep].version
                )}\`.`
              );
            }
          }
        } else if (
          typeof rootDeps[dep] !== 'undefined' &&
          packageJson[type][dep] !== rootDeps[dep]
        ) {
          // Careful with breaking changes!
          if (
            semver.major(semver.minVersion(packageJson[type][dep])) ===
              semver.major(semver.minVersion(rootDeps[dep])) &&
            semver.gte(
              semver.minVersion(packageJson[type][dep]),
              semver.minVersion(rootDeps[dep])
            )
          ) {
            // not a breaking change!
            if (options.fix) {
              packageJson[type][dep] = rootDeps[dep];
            } else {
              errors.push(
                `Dependency \`${chalk.bold(
                  dep
                )}\` have different version \`${chalk.bold(
                  packageJson[type][dep]
                )}\` than the package in root \`${chalk.bold(
                  'package.json'
                )}\` file \`${chalk.bold(rootDeps[dep])}\`.`
              );
            }
          } else {
            // breaking change!
            if (options.breakingChanges && options.fix) {
              packageJson[type][dep] = rootDeps[dep];
            } else {
              breakingErrors.push(
                `Dependency \`${chalk.bold(
                  dep
                )}\` have different version \`${chalk.bold(
                  packageJson[type][dep]
                )}\` than the package in root \`${chalk.bold(
                  'package.json'
                )}\` file \`${chalk.bold(rootDeps[dep])}\`.`
              );
            }
          }
        }
      });
    });
    if (internalErrors.length > 0) {
      prettyError(pathToPackageJson, internalErrors, [
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
      prettyError(pathToPackageJson, errors, [
        `All external dependencies should have the same version as in the root \`${chalk.bold(
          'package.json'
        )}\`.`,
        `This can be automatically fixed by running \`${chalk.bold(
          'yarn config:update'
        )}\`.`,
      ]);
    }
    if (breakingErrors.length > 0) {
      prettyBreakingWarning(pathToPackageJson, breakingErrors, [
        `All external dependencies should have the same version as in the root \`${chalk.bold(
          'package.json'
        )}\`.`,
        `Bumping to a higher dependency version is considered a breaking change!`,
        `This can be automatically fixed by running \`${chalk.bold(
          'yarn config:update --breaking-changes'
        )}\`.`,
      ]);
    }
  });
}

/**
 * Save updated package.json files.
 */
function savePackageJsonFiles(libraries: Record<string, LibDepsMetaData>) {
  Object.values(libraries).forEach((lib) => {
    const pathToPackageJson = `${lib.directory}/package.json`;
    const packageJson = lib.packageJsonContent;
    saveJsonFile(pathToPackageJson, packageJson);
  });
}
