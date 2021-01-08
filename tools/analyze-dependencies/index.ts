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
import * as ts from 'typescript';

/**
 * Paths to `package.json` files for all libraries.
 */
const librariesPaths = glob.sync(
  '{core-libs,feature-libs,integration-libs,projects}/!(node_modules)/package.json',
  {
    ignore: [
      'projects/storefrontapp-e2e-cypress/package.json',
      'projects/dev-schematics/package.json',
      'projects/storefrontapp/package.json',
    ],
  }
);

// Utility functions
function readJsonFile(path: string) {
  return JSON.parse(fs.readFileSync(path, 'utf-8'));
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

interface LibDepsMetaData {
  library: string;
  directory: string;
  version: string;
  peerDependencies: { [dep: string]: string };
  optionalDependencies: { [dep: string]: string };
  dependencies: { [dep: string]: string };
  devDependencies: { [dep: string]: string };
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

type LibsDepsMetaData = {
  [library: string]: LibDepsMetaData;
};

const libraries: LibsDepsMetaData = librariesPaths
  .map(
    (libPath: string): LibDepsMetaData => {
      const packageJson = readJsonFile(libPath);
      // const peerDependencies = Object.keys(packageJson.peerDependencies ?? {});
      const libDir = libPath.substring(
        0,
        libPath.length - `/package.json`.length
      );
      const name = packageJson.name;
      const tsImports = {};
      const scssImports = {};

      const tsFilesPaths = glob.sync(`${libDir}/**/*.ts`);

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

      const scssFilesPaths = glob.sync(`${libDir}/**/*.scss`);

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
        library: name,
        directory: libDir,
        peerDependencies: packageJson.peerDependencies ?? {},
        optionalDependencies: packageJson.optionalDependencies ?? {},
        devDependencies: packageJson.devDependencies ?? {},
        dependencies: packageJson.dependencies ?? {},
        scssImports,
        tsImports,
        version: packageJson.version,
        externalDependencies: {},
        externalDependenciesForPackageJson: {},
      };
    }
  )
  .reduce((acc, curr) => {
    acc[curr.library] = curr;
    return acc;
  }, {});

// Specify where imports are used (spec, lib, schematics, schematics spec)
categorizeUsageOfDependencies(libraries);
// Check if we reference files with relative paths outside of entry point
detectEntryPointsImportsViolations(libraries);
// Check if we use node dependencies where we should not
filterNativeNodeAPIs(libraries);
// Check if we use absolute paths where we should not
filterLocalAbsolutePathFiles(libraries);
// Define list of external dependencies for each library
getExternalDependenciesFromImports(libraries);

const rootPackageJson = readJsonFile('./package.json');

// Check if we have all dependencies directly referenced in package.json
checkIfWeHaveAllDependenciesInPackageJson(libraries, rootPackageJson);

// Filer out spec dependencies as we already checked everything related to them
filterOutSpecOnlyDependencies(libraries);

// console.log(Object.values(libraries)[9]);

/**
 * Detect relative imports for files outside of the entry point directory
 *
 * Remove these imports from the object as it is no longer useful in processing.
 */
function detectEntryPointsImportsViolations(libraries: LibsDepsMetaData) {
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
function filterNativeNodeAPIs(libraries: LibsDepsMetaData) {
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
function filterLocalAbsolutePathFiles(libraries: LibsDepsMetaData) {
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
function categorizeUsageOfDependencies(libraries: LibsDepsMetaData) {
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
 * Get external dependencies from imports
 */
function getExternalDependenciesFromImports(libraries: LibsDepsMetaData) {
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
  libraries: LibsDepsMetaData,
  packageJson: { dependencies: Object; devDependencies: Object }
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
          `Missing ${dep.dependency} in root package.json that is used directly in ${lib.library}!`
        );
      }
    });
  });
}

/**
 * Remove spec external dependencies as we already took care of them.
 */
function filterOutSpecOnlyDependencies(libraries: LibsDepsMetaData) {
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
