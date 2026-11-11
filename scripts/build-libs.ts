/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { globSync } from 'glob';

const workspaceRoot = resolve(__dirname, '..');
const nxCli = join(workspaceRoot, 'node_modules/nx/dist/bin/nx.js');
const tsNodeCli = join(workspaceRoot, 'node_modules/ts-node/dist/bin.js');

interface Library {
  name: string;
  directory: string;
  scripts: Record<string, string>;
}

function getLibraries(): Library[] {
  return globSync('{core-libs,feature-libs,integration-libs}/*/project.json', {
    cwd: workspaceRoot,
  }).flatMap((file) => {
    const project = JSON.parse(
      readFileSync(join(workspaceRoot, file), 'utf8')
    ) as { name: string; targets?: { build?: unknown } };
    if (!project.targets?.build) {
      return [];
    }
    const directory = join(workspaceRoot, dirname(file));
    const manifest = JSON.parse(
      readFileSync(join(directory, 'package.json'), 'utf8')
    ) as { scripts?: Record<string, string> };
    return [{ name: project.name, directory, scripts: manifest.scripts ?? {} }];
  });
}

function run(args: string[], cwd = workspaceRoot): Promise<void> {
  return new Promise((resolveCommand, reject) => {
    const child = spawn(process.execPath, args, { cwd, stdio: 'inherit' });
    child.once('error', reject);
    child.once('close', (code) => {
      if (code === 0) {
        resolveCommand();
      } else {
        reject(new Error('Command failed (' + code + '): ' + args.join(' ')));
      }
    });
  });
}

async function buildFeatureSchematics(
  libraries: Library[],
  npmCli: string
): Promise<void> {
  const features = libraries.filter((lib) => lib.scripts['build:schematics']);
  for (let offset = 0; offset < features.length; offset += 3) {
    const results = await Promise.allSettled(
      features
        .slice(offset, offset + 3)
        .map((lib) => run([npmCli, 'run', 'build:schematics'], lib.directory))
    );
    const failures = results.filter((result) => result.status === 'rejected');
    if (failures.length) {
      throw new AggregateError(
        failures.map((failure) => failure.reason),
        'Feature schematic compilation failed'
      );
    }
  }
}

async function main(): Promise<void> {
  const npmCli = process.env.npm_execpath;
  if (!npmCli) {
    throw new Error('Run this script through npm run build:libs.');
  }
  await run([tsNodeCli, 'scripts/i18n/validate-translations-json-files.ts']);
  await run([
    nxCli,
    'run-many',
    '--target=build',
    '--projects=core,storefrontlib',
    '--configuration=production',
    '--parallel=2',
    '--output-style=static',
  ]);
  await run([npmCli, 'run', 'build:schematics']);
  const libraries = getLibraries();
  await buildFeatureSchematics(libraries, npmCli);
  // A single task graph restores/builds shared outputs once. Independent Nx
  // processes can otherwise overwrite Cart declarations while consumers compile.
  await run([
    nxCli,
    'run-many',
    '--target=build',
    '--projects=' +
      libraries
        .map((lib) => lib.name)
        .sort()
        .join(','),
    '--configuration=production',
    '--parallel=3',
    '--output-style=static',
  ]);
  await run(
    [npmCli, 'run', 'generate:translations:ts-2-json'],
    join(workspaceRoot, 'core-libs/assets')
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
