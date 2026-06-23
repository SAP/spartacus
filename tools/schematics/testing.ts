/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChildProcess, exec, execSync } from 'child_process';
import { prompt } from 'enquirer';
import fs from 'fs';
import { globSync } from 'glob';
import path from 'path';
import { chalk } from '../chalk';

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
  'product-multi-dimensional',
  'qualtrics',
  'requested-delivery-date',
  'estimated-delivery-date',
  'smartedit',
  'storefinder',
  'tracking',
  'user',
  'quote',
  'customer-ticketing',
  'subscription-billing',
];

const integrationLibsFolders: string[] = [
  'cdc',
  'cds',
  'digital-payments',
  'epd-visualization',
  's4om',
  'opf',
  'segment-refs',
  'opps',
  's4-service',
  'cpq-quote',
  'punchout',
];

const commands = [
  'publish',
  'build core-libs/schematics',
  'build asm/schematics',
  'build cart/schematics',
  'build order/schematics',
  'build checkout/schematics',
  'build quote/schematics',
  'build cdc/schematics',
  'build s4-service/schematics',
  'build cds/schematics',
  'build digital-payments/schematics',
  'build epd-visualization/schematics',
  'build opf/schematics',
  'build organization/schematics',
  'build pdf-invoices/schematics',
  'build pickup-in-store/schematics',
  'build product/schematics',
  'build product-configurator/schematics',
  'build product-multi-dimensional/schematics',
  'build s4om/schematics',
  'build segment-refs/schematics',
  'build opps/schematics',
  'build qualtrics/schematics',
  'build requested-delivery-date/schematics',
  'build estimated-delivery-date/schematics',
  'build smartedit/schematics',
  'build storefinder/schematics',
  'build subscription-billing/schematics',
  'build tracking/schematics',
  'build user/schematics',
  'build customer-ticketing/schematics',
  'build cpq-quote/schematics',
  'build punchout/schematics',
  'build all libs',
  'test all schematics',
  'exit',
] as const;
type Command = (typeof commands)[number];

const buildLibRegEx = new RegExp('build (.*?)/schematics');
const verdaccioRegistryUrl = 'http://localhost:4873/';
const originalRegistryUrl = execSync('npm config get @spartacus:registry')
  .toString()
  .trim();

function startVerdaccio(): ChildProcess {
  execSync('rm -rf ./scripts/install/storage');

  console.log('Waiting for verdaccio to boot...');
  const res = exec('verdaccio --config ./scripts/install/config.yaml');
  try {
    execSync(`npx wait-on ${verdaccioRegistryUrl} --timeout 10000`);
  } catch (error) {
    console.log(chalk.red(`\n❌ Couldn't boot verdaccio:\n${error}`));
    process.exit(1);
  }
  console.log('Pointing npm to verdaccio');
  execSync(`npm config set @spartacus:registry ${verdaccioRegistryUrl}`);
  return res;
}

function beforeExit(): void {
  console.log('Setting npm back to npmjs.org');
  execSync(`npm config set @spartacus:registry ${originalRegistryUrl}`);
  if (verdaccioProcess) {
    try {
      console.log('Killing verdaccio');
      verdaccioProcess.kill();
    } catch {}
  }
}

/**
 * Object describing the result of publishing a package
 */
type PackagePublishingResult = {
  packageName: string;
  stdout: string;
  stderr: string;
  error?: any;
};

/**
 * Get list of package.json files to publish
 */
function getPackageJsonFiles(): string[] {
  const sourceFiles = [
    'core-libs/styles/package.json',
    'core-libs/schematics/package.json',
  ];
  const distFiles = globSync(`dist/!(node_modules)/package.json`);
  return [...sourceFiles, ...distFiles];
}

/**
 * Publish a single package to Verdaccio
 */
function publishPackage(packagePath: string): Promise<PackagePublishingResult> {
  return new Promise((resolve, reject) => {
    const packageJsonContent = JSON.parse(
      fs.readFileSync(packagePath, 'utf-8')
    );
    const directory = path.dirname(packagePath);
    const command = `cd ${directory} && npm publish --registry=${verdaccioRegistryUrl} --tag=latest --color always`;
    exec(command, {}, (error, stdout, stderr) => {
      if (error) {
        reject({
          packageName: packageJsonContent.name,
          stdout,
          stderr,
          error: `Command failed: ${error.cmd}`,
        });
      } else {
        resolve({
          packageName: packageJsonContent.name,
          stdout,
          stderr,
        });
      }
    });
  });
}

/**
 * Display final results of publishing packages
 */
function printAllPackagesPublishingResults({
  successful,
  failed,
}: {
  successful: PackagePublishingResult[];
  failed: PackagePublishingResult[];
}): void {
  console.log('\n=== Publishing All Packages Results ===');

  if (successful.length > 0) {
    console.log(
      chalk.green(`\n✅ Successfully published ${successful.length} packages:`)
    );
    successful.forEach(printPackagePublishingResult);
  }

  if (failed.length > 0) {
    console.log(chalk.red(`\n❌ Failed to publish ${failed.length} packages:`));
    failed.forEach(printPackagePublishingResult);
    console.log(
      chalk.red(
        `\n🚨 ${failed.length} packages could not be published. Please check the errors and logs above.`
      )
    );
    throw new Error(); // reject the result promise
  } else {
    console.log(chalk.green('\n🎉 All packages published successfully!'));
  }
}

/**
 * Show a result of publishing a single package
 *
 * @example
 * ================================
 * ❌/✅ package name
 * ================================
 * stdout
 * stderr
 * (ERROR: error message)
 */
function printPackagePublishingResult(result: PackagePublishingResult): void {
  const separator = '='.repeat(50);
  const icon = result.error ? '❌' : '✅';
  const chalkColor = result.error ? chalk.red : chalk.green;
  console.log(
    chalkColor(
      chalk.bold(`\n${separator}\n${icon} ${result.packageName}\n${separator}`)
    )
  );

  if (result.stdout) {
    console.log(result.stdout);
  }
  if (result.stderr) {
    console.log(result.stderr);
  }
  if (result.error) {
    console.error(chalk.red(`ERROR:\n${result.error}`));
  }
}

/**
 * Show progress of publishing packages
 *
 * @example
 * [1/n] ❌/✅ package name 1
 * [2/n] ❌/✅ package name 2
 * ...
 */
function printPackagesPublishingProgress(
  result: PackagePublishingResult,
  current: number,
  total: number
): void {
  const icon = result.error ? '❌' : '✅';
  console.log(`\n[${current}/${total}] ${icon} ${result.packageName}`);
}

/**
 * Publish all packages to Verdaccio
 */
async function publishAllPackages(): Promise<void> {
  //Since migration to NPM, packages will be published with version that has been set in package.json files
  //and before each subsequent release Verdaccio will be cleaned up so that there is no conflict due to the version of existing packages.
  //Because of the strategy used by NPM to resolve peer dependencies, any upgrade of a package's version would also require upgrading the version of that package in all places where it is used as a peer dependency.
  //This in turn would cause too much noise

  //clear Verdaccio storage
  execSync('rm -rf ./scripts/install/storage', { stdio: 'ignore' });

  const allFiles = getPackageJsonFiles();
  console.log(
    chalk.green(
      `\n⏳ Publishing ${allFiles.length} packages in parallel (please wait)...\n`
    )
  );

  /** Number of packages published, successfully or not */
  let completedCount = 0;

  // Run all publish operations in parallel and display progress
  const results = await Promise.allSettled(
    allFiles.map((packagePath) =>
      publishPackage(packagePath).then((result) => {
        printPackagesPublishingProgress(
          result,
          ++completedCount,
          allFiles.length
        );
        return result;
      })
    )
  );

  const successful = results
    .filter((result) => result.status === 'fulfilled')
    .map((result) => result.value);
  const failed = results
    .filter((result) => result.status === 'rejected')
    .map((result) => result.reason);

  printAllPackagesPublishingResults({ successful, failed });
}

function buildLibs(): void {
  execSync('npm run build:libs', { stdio: 'inherit' });
}

async function buildSchematics(
  options: { publish: boolean } = { publish: false }
): Promise<void> {
  execSync('npm run build:schematics', { stdio: 'inherit' });
  if (options.publish) {
    await publishAllPackages();
  }
}

async function buildSchematicsAndPublish(buildCmd: string): Promise<void> {
  await buildSchematics();
  execSync(buildCmd, {
    stdio: 'inherit',
  });
  await publishAllPackages();
}

function testAllSchematics(): void {
  try {
    execSync('npm --prefix core-libs/schematics run test --coverage', {
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

function parseCliCommand(): Command | undefined {
  const index = process.argv.indexOf('--command');
  if (index === -1) return undefined;

  const command = process.argv[index + 1] as Command;
  if (!commands.includes(command)) {
    console.error(
      chalk.red(
        `\n❌ Unknown command: "${command}"\nAvailable commands: ${commands.join(', ')}`
      )
    );
    process.exit(1);
  }
  return command;
}

const isVoiceNotifyEnabled = process.argv.includes('--voice-notify');
if (isVoiceNotifyEnabled) {
  console.log('Voice notifications enabled');
}

/**
 * Notify the user by voice message
 */
function notify(message: string): void {
  if (!isVoiceNotifyEnabled) return;
  try {
    execSync(`say "${message}"`);
  } catch (error) {
    console.warn('Voice notification failed:', error);
  }
}

/**
 * Run task and notify the user when it's completed
 */
async function notifyOnComplete<T>({
  taskName,
  task,
}: {
  taskName: string;
  task: (() => T) | (() => Promise<T>);
}): Promise<unknown> {
  try {
    const maybePromiseResult = task();
    const result = await (maybePromiseResult instanceof Promise
      ? maybePromiseResult
      : Promise.resolve(maybePromiseResult));
    notify(`${taskName} completed`);
    return result;
  } catch (error) {
    notify(`${taskName} failed`);
    return error;
  }
}

async function executeCommand(command: Command): Promise<void> {
  switch (command) {
    case 'publish':
      await notifyOnComplete({
        taskName: 'Publishing',
        task: () => publishAllPackages(),
      });
      break;
    case 'build core-libs/schematics':
      await notifyOnComplete({
        taskName: 'Schematics build',
        task: () => buildSchematics({ publish: true }),
      });
      break;
    case 'build asm/schematics':
    case 'build cart/schematics':
    case 'build order/schematics':
    case 'build checkout/schematics':
    case 'build quote/schematics':
    case 'build cpq-quote/schematics':
    case 'build cdc/schematics':
    case 'build s4-service/schematics':
    case 'build cds/schematics':
    case 'build digital-payments/schematics':
    case 'build epd-visualization/schematics':
    case 'build opf/schematics':
    case 'build punchout/schematics':
    case 'build organization/schematics':
    case 'build pdf-invoices/schematics':
    case 'build pickup-in-store/schematics':
    case 'build product/schematics':
    case 'build product-configurator/schematics':
    case 'build product-multi-dimensional/schematics':
    case 'build qualtrics/schematics':
    case 'build requested-delivery-date/schematics':
    case 'build estimated-delivery-date/schematics':
    case 'build s4om/schematics':
    case 'build segment-refs/schematics':
    case 'build opps/schematics':
    case 'build smartedit/schematics':
    case 'build storefinder/schematics':
    case 'build subscription-billing/schematics':
    case 'build tracking/schematics':
    case 'build user/schematics':
    case 'build customer-ticketing/schematics':
      const lib =
        buildLibRegEx.exec(command)?.pop() ?? 'LIB-REGEX-DOES-NOT-MATCH';
      await notifyOnComplete({
        taskName: `Schematics of ${lib} build`,
        task: () => buildSchematicsAndPublish(`npm run build:${lib}`),
      });
      break;
    case 'build all libs':
      await notifyOnComplete({
        taskName: 'All libraries build',
        task: () => buildLibs(),
      });
      break;
    case 'test all schematics':
      await notifyOnComplete({
        taskName: 'All schematics tests',
        task: () => testAllSchematics(),
      });
      break;
    case 'exit':
      beforeExit();
      process.exit();
  }
}

let verdaccioProcess: ChildProcess | undefined;

async function programNonInteractive(command: Command): Promise<void> {
  const info = `
   Verdaccio is still running at ${verdaccioRegistryUrl} — keep this process alive to install packages from it.
   To re-publish libs (e.g. after source code changes), you MUST:
   1. Kill this process (Ctrl+C / SIGTERM)
   2. Rebuild libs: npm run build:libs
   3. Restart this process
`;

  console.log(
    chalk.yellow(
      `\nℹ️  Running in non-interactive mode (because used --command "${command}")\n${info}`
    )
  );
  await executeCommand(command);
  console.log(
    chalk.yellow('\nℹ️  Command "' + command + '" completed.\n' + info)
  );
  // Keep the process alive until killed
  await new Promise(() => {});
}

async function programInteractive(): Promise<void> {
  while (true) {
    const response: { command: Command } = await prompt({
      name: 'command',
      type: 'select',
      message: 'What do you want to do next?',
      choices: [...commands],
    });

    await executeCommand(response.command);
  }
}

async function program(): Promise<void> {
  verdaccioProcess = startVerdaccio();
  const cliCommand = parseCliCommand();
  try {
    if (cliCommand) {
      await programNonInteractive(cliCommand);
    } else {
      await programInteractive();
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
