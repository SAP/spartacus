import * as fs from 'fs';

import * as path from 'path';

async function extractPartials(directoryPath: string) {
  const files = readDirectory(directoryPath);
  const dirPath = createRecursiveDirectory(
    path.join('dist', 'storefrontlib', 'styles')
  );
  for (const file of files) {
    const componentFolder = file
      .split(`components${path.sep}`)[1]
      .split(path.sep)[0];
    const destDir = createRecursiveDirectory(
      path.join(dirPath, componentFolder)
    );

    fs.copyFile(file, buildDistPath(file, destDir), err => {
      if (err) {
        throw err;
      }
    });
  }
}

function readDirectory(directoryPath: string, filePaths?: string[]): string[] {
  filePaths = filePaths || [];
  const files = fs.readdirSync(directoryPath);
  for (const f of files) {
    const name = path.join(directoryPath, f);
    if (isDirectory(name)) {
      const subDirFiles = readDirectory(name);
      filePaths = [...filePaths, ...subDirFiles];
    } else if (isScssPartialFile(name)) {
      filePaths = [...filePaths, name];
    }
  }

  return filePaths;
}

function isDirectory(directoryPath: string): boolean {
  return (
    fs.existsSync(directoryPath) && fs.lstatSync(directoryPath).isDirectory()
  );
}

function isScssPartialFile(filePath: string): boolean {
  const parts = filePath.split('/');
  const fileNameParts = parts[parts.length - 1].split('.');
  return (
    fs.existsSync(filePath) &&
    fs.lstatSync(filePath).isFile() &&
    fileNameParts[0].charAt(0) === '_' &&
    fileNameParts[fileNameParts.length - 1] === 'scss'
  );
}

function buildDistPath(filePath: string, dirPath: string): string {
  const fileParts = filePath.split(path.sep);
  return path.join(dirPath, fileParts[fileParts.length - 1]);
}

function createRecursiveDirectory(filePath: string): string {
  const dirs: string[] = filePath.split(path.sep);
  let dirPath = '';

  for (const dir of dirs) {
    dirPath = path.join(dirPath, dir);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
  }
  return dirPath;
}

extractPartials('./projects/storefrontlib/src/lib');
