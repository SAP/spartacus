/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import chalk from 'chalk';
import { ChildProcess, exec, execSync } from 'child_process';
import { prompt } from 'enquirer';
import fs from 'fs';
import glob from 'glob';
import path from 'path';

const featureLibsFolders: string[] = [
  'asm',
  'cart',
  'order',
  'checkout',
  'organization',
  'pdf-invoices',
  'pickup-in-store',
  'product',
  'product-configurator',
  'qualtrics',
  'requested-delivery-date',
  'smartedit',
  'storefinder',
  'tracking',
  'user',
  'customer-ticketing',
];

const integrationLibsFolders: string[] = [
  'cdc',
  'cds',
  'digital-payments',
  'epd-visualization',
  's4om',
  'segment-refs',
];

const commands = [
  'publish',
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
  'build pdf-invoices/schematics',
  'build pickup-in-store/schematics',
  'build product/schematics',
  'build product-configurator/schematics',
  'build s4om/schematics',
  'build segment-refs/schematics',
  'build qualtrics/schematics',
  'build requested-delivery-date/schematics',
  'build smartedit/schematics',
  'build storefinder/schematics',
  'build tracking/schematics',
  'build user/schematics',
  'build customer-ticketing/schematics',
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

function publishLibs(): void {
  //Since migration to NPM, packages will be published with version that has been set in package.json files
  //and before each subsequent release Verdaccio will be cleaned up so that there is no conflict due to the version of existing packages.
  //Because of the strategy used by NPM to resolve peer dependencies, any upgrade of a package's version would also require upgrading the version of that package in all places where it is used as a peer dependency.
  //This in turn would cause too much noise

  //clear Verdaccio storage
  execSync('rm -rf ./scripts/install/storage');

  // Packages released from it's source directory
  const files = [
    'projects/storefrontstyles/package.json',
    'projects/schematics/package.json',
  ];
  const distFiles = glob.sync(`dist/!(node_modules)/package.json`);

  [...files, ...distFiles].forEach((packagePath) => {
    const content = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));

    // Publish package
    const dir = path.dirname(packagePath);
    console.log(`\nPublishing ${content.name}`);
    execSync(
      `cd ${dir} && npm publish --registry=${verdaccioUrl} --no-git-tag-version`,
      { stdio: 'inherit' }
    );
  });
}

function buildLibs(): void {
  execSync('npm run build:libs', { stdio: 'inherit' });
}

function buildSchematics(
  options: { publish: boolean } = { publish: false }
): void {
  execSync('npm run build:schematics', { stdio: 'inherit' });
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
    execSync('npm --prefix projects/schematics run test --coverage', {
      stdio: 'inherit',
    });

    featureLibsFolders.forEach((lib) =>
      execSync(
        `npm --prefix feature-libs/${lib} run test:schematics --coverage`,
        {
          stdio: 'inherit',
        }
      )
    );
    integrationLibsFolders.forEach((lib) =>
      execSync(
        `npm --prefix integration-libs/${lib} run test:schematics --coverage`,
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
    case 'build pdf-invoices/schematics':
    case 'build pickup-in-store/schematics':
    case 'build product/schematics':
    case 'build product-configurator/schematics':
    case 'build qualtrics/schematics':
    case 'build requested-delivery-date/schematics':
    case 'build s4om/schematics':
    case 'build segment-refs/schematics':
    case 'build smartedit/schematics':
    case 'build storefinder/schematics':
    case 'build tracking/schematics':
    case 'build user/schematics':
    case 'build customer-ticketing/schematics':
      const lib =
        buildLibRegEx.exec(command)?.pop() ?? 'LIB-REGEX-DOES-NOT-MATCH';
      buildSchematicsAndPublish(`npm run build:${lib}`);
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
