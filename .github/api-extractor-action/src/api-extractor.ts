import * as core from '@actions/core';
import * as exec from '@actions/exec';
import { ExecOptions } from '@actions/exec';
import * as glob from '@actions/glob';
import * as io from '@actions/io';
import * as fs from 'fs';
import { BASE_BRANCH_DIR, BUILD_DIR } from './const';

export enum Status {
  Unknown = 'unknown',
  Success = 'success',
  Failed = 'failed',
}

type UnknownStatus = {
  status: Status.Unknown;
};

type SuccessStatus = {
  status: Status.Success;
};

export type FailedStatus = {
  status: Status.Failed;
  errors: string[];
};

type BranchStatus = UnknownStatus | SuccessStatus | FailedStatus;

export interface EntryPointStatus {
  name: string;
  file: string;
  base: BranchStatus;
  head: BranchStatus;
}

export interface EntryPoints {
  [entryPoint: string]: EntryPointStatus;
}

/**
 * Run api-extractor on directory
 *
 * @param entryPointDir Directory with entry point to analyze
 *
 * @returns Array with exit code and errors array as a second element
 */
async function analyzeEntryPoint(
  entryPointDir: string
): Promise<[number, string[]]> {
  let errors: string[] = [];
  const options: ExecOptions = {
    ignoreReturnCode: true,
    delay: 1000,
  };
  options.listeners = {
    errline: (line) => {
      errors.push(line);
    },
  };
  const exitCode = await exec.exec(
    'sh',
    ['./.github/api-extractor-action/api-extractor.sh', entryPointDir],
    options
  );
  return [
    exitCode,
    errors.filter((line: string) => line.startsWith('ERROR: ')),
  ];
}

/**
 * Initialized new empty entry point in the passed object.
 *
 * @param entryPoints Object with entry points to mutate
 * @param name Name of the entry point
 * @param newName New name of the entry point in package.json
 */
function addEntryPoint(
  entryPoints: EntryPoints,
  name: string,
  newName: string
): void {
  if (!entryPoints[name]) {
    entryPoints[name] = {
      name: name,
      head: { status: Status.Unknown },
      base: { status: Status.Unknown },
      file: `${newName.split('/')[1]}.api.md`,
    };
  }
}

/**
 * Get the directory for the package.json file.
 *
 * @param path Path to package.json file
 *
 * @returns directory of the package.json file
 */
function getDirectoryOfPackageJson(path: string): string {
  return path.substring(0, path.length - `/package.json`.length);
}

/**
 * Copies api-extractor config to provided directory
 *
 * @param targetDir Directory to copy config to
 */
async function copyApiExtractorConfig(targetDir: string): Promise<void> {
  const globber = await glob.create(
    '.github/api-extractor-action/api-extractor.json',
    {}
  );
  const configs = await globber.glob();
  if (configs.length) {
    const apiExtractorConfigPath = (await globber.glob())[0];
    await io.cp(apiExtractorConfigPath, targetDir);
  } else {
    throw new Error('Could not find api-extractor.json config');
  }
}

/**
 * Updates name in package.json, so it doesn't have more than 1 `/`.
 *
 * @param path Path to `package.json` file
 *
 * @returns object with name and the newName
 */
function updateNameInPackageJson(
  path: string
): { name: string; newName: string } {
  const packageContent = JSON.parse(fs.readFileSync(path, 'utf-8'));
  const name: string = packageContent.name;
  const newName = name.replace(/\//g, '_').replace(/\_/, '/');
  fs.writeFileSync(
    path,
    JSON.stringify({ ...packageContent, name: newName }, undefined, 2)
  );
  return {
    name,
    newName,
  };
}

export async function analyzeEntryPoints(
  branch: 'head' | 'base',
  entryPoints: EntryPoints
) {
  const dir =
    branch === 'head'
      ? `${BUILD_DIR}/**/package.json`
      : `${BASE_BRANCH_DIR}/${BUILD_DIR}/**/package.json`;
  const globber = await glob.create(dir, {});
  const files = await globber.glob();

  core.info(`\u001b[35mAPI extractor for ${branch} branch`);
  for (let path of files) {
    const { name, newName } = updateNameInPackageJson(path);

    addEntryPoint(entryPoints, name, newName);

    const directory = getDirectoryOfPackageJson(path);

    await copyApiExtractorConfig(directory);
    core.startGroup(`${name}`);
    const [exitCode, errors] = await analyzeEntryPoint(directory);
    if (exitCode !== 0) {
      entryPoints[name][branch] = {
        status: Status.Failed,
        errors: errors,
      };
    } else {
      entryPoints[name][branch].status = Status.Success;
    }
    core.endGroup();
  }
}
