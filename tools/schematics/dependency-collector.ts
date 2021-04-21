import { execSync } from 'child_process';
import fs from 'fs';

interface Dependency {
  [packageName: string]: string;
}
const fileName = 'projects/schematics/src/dependencies.json';
const packageJsonDirectories: string[] = [
  'feature-libs',
  'integration-libs',
  'projects',
  'core-libs',
  // our root package.json
  'package.json',
];

function cleanup(): void {
  if (fs.existsSync(fileName)) {
    fs.unlinkSync(fileName);
  }
}

function readJson(path: string): any {
  return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

function collect(directories: string[]): { [packageName: string]: Dependency } {
  let collected: {
    [packageName: string]: Dependency;
  } = {};

  for (const dir of directories) {
    if (fs.statSync(dir).isFile()) {
      const packageJson = readJson(dir);
      collected = {
        ...collected,
        [packageJson.name]: packageJson.dependencies ?? {},
      };
      continue;
    }

    const libs = fs.readdirSync(dir);
    for (const lib of libs) {
      if (!fs.existsSync(`${dir}/${lib}/package.json`)) {
        continue;
      }

      const packageJson = readJson(`${dir}/${lib}/package.json`);
      collected = {
        ...collected,
        [packageJson.name]: packageJson.peerDependencies ?? {},
      };
    }
  }

  return collected;
}

function run(): void {
  cleanup();
  const collected = collect(packageJsonDirectories);

  fs.writeFileSync(fileName, JSON.stringify(collected, undefined, 2));
  execSync(
    `node_modules/prettier/bin-prettier.js --config ./.prettierrc projects/schematics/src/dependencies.json --write`
  );
}

run();
