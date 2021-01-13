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
import { manageDependencies } from './manage-dependencies';
import { manageTsConfigs } from './tsconfig-paths';

const program = new Command();
program
  .description('Check configuration in repository for inconsistencies')
  .option('--fix', 'Apply automatic fixes when possible')
  .option('--breaking-changes', 'Allow breaking changes in transformations');

program.parse(process.argv);

let errorsReported = false;

export function warn(message) {
  console.log(chalk.yellow(message));
}

export function error(message) {
  errorsReported = true;
  console.log(chalk.red(message));
}

export function prettyError(file, error, help) {
  errorsReported = true;
  console.log(`
${chalk.gray(`----- ${file} -----`)}

${chalk.red(` ✖ ${error}`)}

${chalk.blue(`${chalk.bold(' i ')}${help}`)}
${chalk.gray(`------${`-`.repeat(file.length)}------`)}
`);
}

export type ProgramOptions = {
  fix: boolean | undefined;
  breakingChanges: boolean | undefined;
};

const options: ProgramOptions = program.opts() as any;

export type PackageJson = {
  /**
   * Library name
   */
  name: string;
  /**
   * Library version
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
  packageJsonContent: PackageJson;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  optionalDependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
  entryPoints: Array<{
    entryPoint: string;
    directory: string;
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
  '{core-libs,feature-libs,integration-libs,projects}/!(node_modules)/package.json',
  {
    ignore: [
      'projects/storefrontapp-e2e-cypress/package.json',
      'projects/dev-schematics/package.json',
      'projects/storefrontapp/package.json',
    ],
  }
);

function readJsonFile(path: string) {
  return JSON.parse(readFileSync(path, 'utf-8'));
}

const repository = librariesPaths
  .map((libraryPath) => {
    const packageJson: PackageJson = readJsonFile(libraryPath);
    const directory = libraryPath.substring(
      0,
      libraryPath.length - `/package.json`.length
    );

    const ngPackageFilesPaths = glob.sync(`${directory}/**/ng-package.json`);
    const entryPoints = ngPackageFilesPaths.map((ngPackagePath) => {
      const ngPackageFileContent = readJsonFile(ngPackagePath);
      let pathWithoutLibDirectory = ngPackagePath.substring(directory.length);
      let pathWithoutNgPackage = pathWithoutLibDirectory.substring(
        0,
        pathWithoutLibDirectory.length - `/ng-package.json`.length
      );
      return {
        entryPoint: `${packageJson.name}${pathWithoutNgPackage}`, // eg. `@spartacus/organization/administration`
        directory: `${pathWithoutNgPackage}`, // eg. `/administration`
        entryFile: `${ngPackageFileContent.lib.entryFile.replace('.ts', '')}`, // eg. `src/public_api` (without .ts extension)
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
manageTsConfigs(repository, options);

/**
 * Format all files.
 */

if (options.fix) {
  console.log('\nFormatting files (might take some time)...\n');
  execSync('yarn prettier:fix');
  console.log('✨ Update completed');
}

if (errorsReported) {
  process.exitCode = 1;
}
