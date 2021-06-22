import { execSync } from 'child_process';
import { Command } from 'commander';
import fs from 'fs';

/**
 * Options you can pass to the script
 */
export type ProgramOptions = {
  /**
   * Compare with the old file
   */
  compare?: boolean;
};

const fileName = 'projects/schematics/src/dependencies.json';
const tempFileName = `${fileName.substring(0, fileName.length - 5)}-temp.json`;

const packageJsonDirectories: string[] = [
  'projects',
  'core-libs',
  'feature-libs',
  'integration-libs',
  // our root package.json
  'package.json',
];

function cleanup(): void {
  if (fs.existsSync(fileName)) {
    fs.unlinkSync(fileName);
  }
  if (fs.existsSync(tempFileName)) {
    fs.unlinkSync(tempFileName);
  }
}

function readJson(path: string): any {
  return JSON.parse(read(path));
}

function collect(
  directories: string[]
): Record<string, Record<string, string>> {
  let collected: Record<string, Record<string, string>> = {};

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

function compareFiles(options: {
  name: string;
  oldContent: string;
  newContent: string;
}): void {
  save(options.name, options.newContent);
  format(options.name);

  const formattedNewContent = read(options.name);
  if (options.oldContent !== formattedNewContent) {
    if (fs.existsSync(options.name)) {
      fs.unlinkSync(options.name);
    }
    console.error(
      `The ${fileName} file is not up to date. Please re-generate it by running: yarn generate:deps`
    );
    process.exit(1);
  }
}

function save(path: string, content: string): void {
  fs.writeFileSync(path, content, { encoding: 'utf-8' });
}

function read(path: string): string {
  return fs.readFileSync(path, 'utf-8');
}

function format(path: string): void {
  execSync(
    `node ./node_modules/prettier/bin-prettier.js --config ./.prettierrc ${path} --write`
  );
}

function run(options: ProgramOptions): void {
  const newContent = JSON.stringify(
    collect(packageJsonDirectories),
    undefined,
    2
  );

  if (options.compare) {
    let oldContent: string | undefined;
    if (fs.existsSync(fileName)) {
      oldContent = read(fileName);
    }
    if (oldContent) {
      compareFiles({ name: tempFileName, oldContent, newContent });
      cleanup();
    }
  }

  save(fileName, newContent);
  format(fileName);
}

const program = new Command();
program
  .description('Collect dependencies from all libraries')
  .option(
    '--compare',
    'Compare with the old file, and fail the process if there are differences.'
  );

program.parse(process.argv);

run(program.opts() as ProgramOptions);
