/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import chalk from 'chalk';
import { ChildProcess, exec, execSync } from 'child_process';
import { prompt } from 'enquirer';
import fs from 'fs';
import glob from 'glob';
import path from 'path';
import semver from 'semver';

const featureLibsFolders: string[] = [
  'asm',
  'cart',
  'order',
  'checkout',
  'organization',
  'product',
  'product-configurator',
  'qualtrics',
  'smartedit',
  'storefinder',
  'tracking',
  'user',
];

const integrationLibsFolders: string[] = [
  'cdc',
  'cds',
  'digital-payments',
  'epd-visualization',
];

const commands = [
  'publish',
  'publish (reload version)',
  'build projects/schematics',
  'build asm/schematics',
  'build cart/schematics',
  'build order/schematics',
  'build checkout/schematics',
  'build cdc/schematics',
  'build cds/schematics',
  'build digital-payments/schematics',
  'build epd-visualization/schematics',
  'build organization/schematics',
  'build product/schematics',
  'build product-configurator/schematics',
  'build qualtrics/schematics',
  'build smartedit/schematics',
  'build storefinder/schematics',
  'build tracking/schematics',
  'build user/schematics',
  'build all libs',
  'test all schematics',
  'exit',
] as const;
type Command = typeof commands[number];

const buildLibRegEx = new RegExp('build (.*?)/schematics');
const verdaccioUrl = 'http://localhost:4873/';
const npmUrl = 'https://registry.npmjs.org/';

function startVerdaccio(): ChildProcess {
  execSync('rm -rf ./scripts/install/storage');

  console.log('Waiting for verdaccio to boot...');
  const res = exec('verdaccio --config ./scripts/install/config.yaml');
  try {
    execSync(`npx wait-on ${verdaccioUrl} --timeout 10000`);
  } catch (_e) {
    console.log(
      chalk.red(
        `\n❌ Couldn't boot verdaccio. Make sure to install it globally: \n> npm i -g verdaccio@4`
      )
    );
    process.exit(1);
  }
  console.log('Pointing npm to verdaccio');
  execSync(`npm config set @spartacus:registry ${verdaccioUrl}`);
  return res;
}

function beforeExit(): void {
  console.log('Setting npm back to npmjs.org');
  execSync(`npm config set @spartacus:registry ${npmUrl}`);
  if (verdaccioProcess) {
    try {
      console.log('Killing verdaccio');
      verdaccioProcess.kill();
    } catch {}
  }
}

function getCurrentVersion(): string {
  const result = semver.parse(
    JSON.parse(fs.readFileSync('projects/core/package.json', 'utf-8')).version
  )?.version;
  if (!result) {
    throw new Error(
      `File 'projects/core/package.json' doesn't contain a valid field "version"`
    );
  }
  return result;
}
let newVersion = getCurrentVersion();

function publishLibs(reload = false): void {
  if (reload) {
    newVersion = getCurrentVersion();
  }
  // Bump version to publish
  newVersion = semver.inc(newVersion, 'patch') ?? '';

  // Packages released from it's source directory
  const files = [
    'projects/storefrontstyles/package.json',
    'projects/schematics/package.json',
  ];
  const distFiles = glob.sync(`dist/!(node_modules)/package.json`);

  [...files, ...distFiles].forEach((packagePath) => {
    // Update version in package
    const content = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
    content.version = newVersion;
    fs.writeFileSync(packagePath, JSON.stringify(content, undefined, 2));

    // Publish package
    const dir = path.dirname(packagePath);
    console.log(`\nPublishing ${content.name}`);
    execSync(
      `yarn publish --cwd ${dir} --new-version ${newVersion} --registry=${verdaccioUrl} --no-git-tag-version`,
      { stdio: 'inherit' }
    );
  });
}

function buildLibs(): void {
  execSync('yarn build:libs', { stdio: 'inherit' });
}

function buildSchematics(
  options: { publish: boolean } = { publish: false }
): void {
  execSync('yarn build:schematics', { stdio: 'inherit' });
  if (options.publish) {
    publishLibs();
  }
}

function buildSchematicsAndPublish(buildCmd: string): void {
  buildSchematics();
  execSync(buildCmd, {
    stdio: 'inherit',
  });
  publishLibs();
}

function testAllSchematics(): void {
  try {
    execSync('yarn --cwd projects/schematics run test --coverage', {
      stdio: 'inherit',
    });

    featureLibsFolders.forEach((lib) =>
      execSync(
        `yarn --cwd feature-libs/${lib} run test:schematics --coverage`,
        {
          stdio: 'inherit',
        }
      )
    );
    integrationLibsFolders.forEach((lib) =>
      execSync(
        `yarn --cwd integration-libs/${lib} run test:schematics --coverage`,
        {
          stdio: 'inherit',
        }
      )
    );
  } catch (e) {
    console.error(e);
    beforeExit();
    process.exit();
  }
}

async function executeCommand(command: Command): Promise<void> {
  switch (command) {
    case 'publish':
      publishLibs();
      break;
    case 'publish (reload version)':
      publishLibs(true);
      break;
    case 'build projects/schematics':
      buildSchematics({ publish: true });
      break;
    case 'build asm/schematics':
    case 'build cart/schematics':
    case 'build order/schematics':
    case 'build checkout/schematics':
    case 'build cdc/schematics':
    case 'build cds/schematics':
    case 'build digital-payments/schematics':
    case 'build epd-visualization/schematics':
    case 'build organization/schematics':
    case 'build product/schematics':
    case 'build product-configurator/schematics':
    case 'build qualtrics/schematics':
    case 'build smartedit/schematics':
    case 'build storefinder/schematics':
    case 'build tracking/schematics':
    case 'build user/schematics':
      const lib =
        buildLibRegEx.exec(command)?.pop() ?? 'LIB-REGEX-DOES-NOT-MATCH';
      buildSchematicsAndPublish(`yarn build:${lib}`);
      break;
    case 'build all libs':
      buildLibs();
      break;
    case 'test all schematics':
      testAllSchematics();
      break;
    case 'exit':
      beforeExit();
      process.exit();
  }
}

let verdaccioProcess: ChildProcess | undefined;

async function program(): Promise<void> {
  verdaccioProcess = startVerdaccio();
  try {
    while (true) {
      const response: { command: Command } = await prompt({
        name: 'command',
        type: 'select',
        message: 'What do you want to do next?',
        choices: [...commands],
      });

      executeCommand(response.command);
    }
  } catch (e) {
    console.error(e);
    beforeExit();
    process.exit();
  }
}

// Handle killing the script
process.once('SIGINT', function () {
  beforeExit();
  process.exit();
});

process.on('SIGHUP', function () {
  beforeExit();
  process.exit();
});

process.once('SIGTERM', function () {
  beforeExit();
  process.exit();
});

program();
