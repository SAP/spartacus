/**
 * Set of tools for managing configuration in this repository
 *
 * Currently:
 * - sets paths in tsconfig files
 * - manage dependencies and their versions in libraries
 *
 * To do:
 * - sonar cloud configuration
 */

import chalk from 'chalk';
import { execSync } from 'child_process';
import { Command } from 'commander';
import { readFileSync } from 'fs';
import glob from 'glob';
import { NG_PACKAGE_JSON, PACKAGE_JSON } from './const';
import { manageDependencies } from './manage-dependencies';
import { manageTsConfigs } from './tsconfig-paths';

// ------------ Utilities ------------

/**
 * Logger when everything was ok
 */
export function success(message?: string): void {
  if (options.fix) {
    console.log(chalk.green(message ?? ' ✔  Nothing to update'));
  } else {
    console.log(chalk.green(message ?? ' ✔  No problems found'));
  }
}

/**
 * Log updated file
 *
 * @param path updated file path
 */
export function logUpdatedFile(path: string): void {
  console.log(chalk.green(` ✔  File \`${chalk.bold(path)}\` updated`));
}

/**
 * Log violation (warning,error) for file
 *
 * @param file related file
 * @param errors violation
 * @param help help information
 */
function logViolation(
  file: string,
  violation: string,
  [help, ...extraHelp]: string[]
): void {
  let minLength = 76;
  console.log(`
${chalk.gray(
  `--- ${file} ${`-`.repeat(Math.max(0, minLength - file.length - 1))}`
)}
${violation}

${chalk.blue(`${chalk.bold(' i  ')}${help}`)}${extraHelp
    .map((help) => chalk.blue(`\n    ${help}`))
    .join('')}
${chalk.gray(`----${`-`.repeat(Math.max(file.length, minLength))}`)}
`);
}

/**
 * Print error
 *
 * @param file related file
 * @param errors list of errors
 * @param help help information
 */
export function error(file: string, errors: string[], help: string[]): void {
  errorsCount += errors.length;
  logViolation(
    file,
    errors.map((error) => chalk.red(` ✖  ${error}`)).join('\n'),
    help
  );
}

/**
 * Print warning
 *
 * @param file related file
 * @param warnings list of warnings
 * @param help help information
 */
export function warning(
  file: string,
  warnings: string[],
  help: string[]
): void {
  warningsCount += warnings.length;
  logViolation(
    file,
    warnings.map((warning) => chalk.yellow(` ⚠  ${warning}`)).join('\n'),
    help
  );
}

/**
 * Read content of json file
 *
 * @param path file path
 */
function readJsonFile(path: string): any {
  return JSON.parse(readFileSync(path, 'utf-8'));
}

/**
 * Log script step
 *
 * @param message step to log
 */
export function reportProgress(message: string): void {
  console.log(`\n${message}`);
}

// ------------ Utilities end ------------

const program = new Command();
program
  .description('Check configuration in repository for inconsistencies')
  .option('--fix', 'Apply automatic fixes when possible')
  .option('--bump-versions', 'Bump deps versions to match root package.json');

program.parse(process.argv);

let errorsCount = 0;
let warningsCount = 0;

/**
 * Options you can pass to the script
 */
export type ProgramOptions = {
  /**
   * Defines if the script should be run in fix mode instead of check
   */
  fix: boolean | undefined;
  /**
   * Sets if versions should be bumped. Use for majors only.
   */
  bumpVersions: boolean | undefined;
};

const options: ProgramOptions = program.opts() as any;

/**
 * Type to match package.json structure
 */
export type PackageJson = {
  /**
   * Package name
   */
  name: string;
  /**
   * Package version
   */
  version: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
};

export type Library = {
  /**
   * Library name
   */
  name: string;
  /**
   * Library version
   */
  version: string;
  /**
   * Directory of the library
   */
  directory: string;
  /**
   * Directory where the library lands
   */
  distDir: string;
  /**
   * Content of the library package.json
   */
  packageJsonContent: PackageJson;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  optionalDependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
  /**
   * Entry points in the library
   */
  entryPoints: Array<{
    /**
     * Name of the entry point eg. @spartacus/asm/core
     */
    entryPoint: string;
    /**
     * Directory of the entry point relative to library directory eg. ./core
     */
    directory: string;
    /**
     * Entry file for the entry point. Eg. ./public_api
     */
    entryFile: string;
  }>;
};

export type Repository = {
  [library: string]: Library;
};

/**
 * Paths to `package.json` files for all libraries.
 */
const librariesPaths = glob.sync(
  `{core-libs,feature-libs,integration-libs,projects}/!(node_modules)/${PACKAGE_JSON}`,
  {
    ignore: [
      `projects/storefrontapp-e2e-cypress/${PACKAGE_JSON}`,
      `projects/storefrontapp/${PACKAGE_JSON}`,
    ],
  }
);

// Representation of repository content and structure
const repository = librariesPaths
  .map((libraryPath) => {
    const packageJson: PackageJson = readJsonFile(libraryPath);
    const directory = libraryPath.substring(
      0,
      libraryPath.length - `/${PACKAGE_JSON}`.length
    );

    const ngPackageFilesPaths = glob.sync(`${directory}/**/${NG_PACKAGE_JSON}`);
    const entryPoints = ngPackageFilesPaths.map((ngPackagePath) => {
      const ngPackageFileContent = readJsonFile(ngPackagePath);
      let pathWithoutLibDirectory = ngPackagePath.substring(directory.length);
      let pathWithoutNgPackage = pathWithoutLibDirectory.substring(
        0,
        pathWithoutLibDirectory.length - `/${NG_PACKAGE_JSON}`.length
      );
      return {
        entryPoint: `${packageJson.name}${pathWithoutNgPackage}`,
        directory: `${pathWithoutNgPackage}`,
        entryFile: `${ngPackageFileContent.lib.entryFile.replace('.ts', '')}`,
      };
    });

    return {
      name: packageJson.name as string,
      packageJsonContent: packageJson,
      version: packageJson.version as string,
      directory,
      distDir: directory.split('/')[1],
      dependencies: packageJson.dependencies ?? {},
      devDependencies: packageJson.devDependencies ?? {},
      peerDependencies: packageJson.peerDependencies ?? {},
      optionalDependencies: packageJson.optionalDependencies ?? {},
      entryPoints,
    };
  })
  .reduce((acc: Repository, library) => {
    acc[library.name] = library;
    return acc;
  }, {});

manageDependencies(repository, options);
// Keep it after dependencies, because fixes from deps might might result in different tsconfig files
manageTsConfigs(repository, options);

// collect and generate dependencies.json file.
execSync(`yarn generate:deps --compare=true`);

/**
 * Format all files.
 */
if (options.fix) {
  console.log('\nFormatting files (might take some time)...\n');
  execSync('yarn prettier:fix');
  console.log(`✨ ${chalk.green('Update completed')}`);
}

/**
 * Log total number of errors and warnings when there are some
 */
if (!options.fix && (errorsCount > 0 || warningsCount > 0)) {
  console.log(chalk.red(`\nErrors: ${errorsCount}`));
  console.log(chalk.yellow(`Warnings: ${warningsCount}\n`));
}

// Fail script when there are some errors
if (errorsCount > 0) {
  process.exitCode = 1;
}
