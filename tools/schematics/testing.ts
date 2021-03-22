import { ChildProcess, exec, execSync } from 'child_process';
import { prompt } from 'enquirer';
import fs from 'fs';
import glob from 'glob';
import path from 'path';
import semver from 'semver';

let currentVersion: semver.SemVer | null;

function startVerdaccio(): ChildProcess {
  console.log('Starting verdaccio');
  execSync('rm -rf ./scripts/install/storage');
  const res = exec('verdaccio --config ./scripts/install/config.yaml');
  console.log('Pointing npm to verdaccio');
  execSync(`npm config set @spartacus:registry http://localhost:4873/`);
  return res;
}

function beforeExit() {
  console.log('Setting npm back to npmjs.org');
  execSync(`npm config set @spartacus:registry https://registry.npmjs.org/`);
  if (verdaccioProcess) {
    try {
      console.log('Killing verdaccio');
      verdaccioProcess.kill();
    } catch {}
  }
}

function publishLibs() {
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

function buildLibs() {
  execSync('yarn build:libs', { stdio: 'inherit' });
}

function buildSchematics(options: { publish: boolean } = { publish: false }) {
  execSync('yarn build:schematics', { stdio: 'inherit' });
  if (options.publish) {
    publishLibs();
  }
}

function buildSchematicsAndPublish(buildCmd: string) {
  buildSchematics();
  execSync(buildCmd, {
    stdio: 'inherit',
  });
  publishLibs();
}

async function executeCommand(
  command:
    | 'publish'
    | 'build projects/schematics'
    | 'build asm/schematics'
    | 'build organization/schematics'
    | 'build product/schematics'
    | 'build product-configurator/schematics'
    | 'build qualtrics/schematics'
    | 'build smartedit/schematics'
    | 'build tracking/schematics'
    | 'build all libs'
): Promise<void> {
  switch (command) {
    case 'publish':
      publishLibs();
      break;
    case 'build projects/schematics':
      buildSchematics({ publish: true });
      break;
    case 'build asm/schematics':
      buildSchematicsAndPublish('yarn build:asm');
      break;
    case 'build organization/schematics':
      buildSchematicsAndPublish('yarn build:organization');
      break;
    case 'build product/schematics':
      buildSchematicsAndPublish('yarn build:product');
      break;
    case 'build product-configurator/schematics':
      buildSchematicsAndPublish('yarn build:product-configurator');
      break;
    case 'build qualtrics/schematics':
      buildSchematicsAndPublish('yarn build:qualtrics');
      break;
    case 'build smartedit/schematics':
      buildSchematicsAndPublish('yarn build:smartedit');
      break;
    case 'build tracking/schematics':
      buildSchematicsAndPublish('yarn build:tracking');
      break;
    case 'build all libs':
      buildLibs();
      break;
    default:
      const cmd: never = command;
      throw new Error(`Command ${cmd} not covered!`);
  }
}

let verdaccioProcess: ChildProcess | undefined;

async function program() {
  verdaccioProcess = startVerdaccio();
  try {
    // Give time for verdaccio to boot up
    console.log('Waiting for verdaccio to boot...');
    execSync(`sleep 30`);

    while (true) {
      const choices = <const>[
        'publish',
        'build projects/schematics',
        'build asm/schematics',
        'build organization/schematics',
        'build product/schematics',
        'build product-configurator/schematics',
        'build qualtrics/schematics',
        'build smartedit/schematics',
        'build tracking/schematics',
        'build all libs',
        'exit',
      ];
      const response: { command: typeof choices[number] } = await prompt({
        name: 'command',
        type: 'select',
        message: 'What do you want to do next?',
        choices: [...choices],
      });

      if (response.command === 'exit') {
        beforeExit();
        process.exit();
      } else {
        executeCommand(response.command);
      }
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
