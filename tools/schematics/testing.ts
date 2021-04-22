import { ChildProcess, exec, execSync } from 'child_process';
import { prompt } from 'enquirer';
import fs from 'fs';
import glob from 'glob';
import path from 'path';
import semver from 'semver';

const featureLibsFolders: string[] = [
  'asm',
  'cart',
  'organization',
  'product',
  'product-configurator',
  'qualtrics',
  'smartedit',
  'storefinder',
  'tracking',
  'user',
];

const integrationLibsFolders: string[] = ['cdc', 'cds'];

const commands = [
  'publish',
  'build projects/schematics',
  'build asm/schematics',
  'build cart/schematics',
  'build cdc/schematics',
  'build cds/schematics',
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

let currentVersion: semver.SemVer | null;

function startVerdaccio(): ChildProcess {
  console.log('Starting verdaccio');
  execSync('rm -rf ./scripts/install/storage');
  const res = exec('verdaccio --config ./scripts/install/config.yaml');
  console.log('Pointing npm to verdaccio');
  execSync(`npm config set @spartacus:registry http://localhost:4873/`);
  return res;
}

function beforeExit(): void {
  console.log('Setting npm back to npmjs.org');
  execSync(`npm config set @spartacus:registry https://registry.npmjs.org/`);
  if (verdaccioProcess) {
    try {
      console.log('Killing verdaccio');
      verdaccioProcess.kill();
    } catch {}
  }
}

function publishLibs(): void {
  if (!currentVersion) {
    currentVersion = semver.parse(
      JSON.parse(fs.readFileSync('projects/core/package.json', 'utf-8')).version
    );
  }

  // Bump version to publish
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  semver.inc(currentVersion!, 'patch');
  // Packages released from it's source directory
  const files = [
    'projects/storefrontstyles/package.json',
    'projects/schematics/package.json',
  ];
  const distFiles = glob.sync(`dist/!(node_modules)/package.json`);

  [...files, ...distFiles].forEach((packagePath) => {
    // Update version in package
    const content = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    content.version = currentVersion!.version;
    fs.writeFileSync(packagePath, JSON.stringify(content, undefined, 2));

    // Publish package
    const dir = path.dirname(packagePath);
    console.log(`\nPublishing ${content.name}`);
    execSync(
      `yarn publish --cwd ${dir} --new-version ${
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        currentVersion!.version
      } --registry=http://localhost:4873/ --no-git-tag-version`,
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
  execSync('yarn --cwd projects/schematics run test', {
    stdio: 'inherit',
  });

  featureLibsFolders.forEach((lib) =>
    execSync(`yarn --cwd feature-libs/${lib} run test:schematics`, {
      stdio: 'inherit',
    })
  );
  integrationLibsFolders.forEach((lib) =>
    execSync(`yarn --cwd integration-libs/${lib} run test:schematics`, {
      stdio: 'inherit',
    })
  );
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
    case 'build cdc/schematics':
    case 'build cds/schematics':
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
    // Give time for verdaccio to boot up
    console.log('Waiting for verdaccio to boot...');
    execSync(`sleep 15`);

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
    console.log(e);
    beforeExit();
    process.exit();
  }
}

program();

// Handle killing the script
process.once('SIGINT', function () {
  beforeExit();
  process.exit();
});

process.once('SIGTERM', function () {
  beforeExit();
  process.exit();
});
