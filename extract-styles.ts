import * as fs from 'fs';

import * as path from 'path';

import * as sass from 'node-sass';

interface StylePath {
  path: string;
  componentFolder: string;
  fileName: string;
}

async function moveStylesToShellApp(directoryPath: string) {
  const files = readDirectory(directoryPath);
  const dirPath = createRecursiveDirectory(
    path.join('projects', 'storefrontapp', 'src', 'styles')
  );
  for (const file of files) {
    const filePath = getStylePath(file);
    const destDir = createRecursiveDirectory(
      path.join(dirPath, filePath.componentFolder)
    );
    const buffer = fs.readFileSync(filePath.path, { encoding: 'utf-8' });

    fs.writeFile(
      buildDestinationPath(destDir, filePath.fileName),
      transpileSass(buffer),
      err => {
        if (err) {
          throw err;
        }
      }
    );
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
    } else if (isScssFile(name)) {
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

function isScssFile(filePath: string): boolean {
  const parts = filePath.split('.');
  return (
    fs.existsSync(filePath) &&
    fs.lstatSync(filePath).isFile() &&
    parts[parts.length - 1] === 'scss'
  );
}

function buildDestinationPath(destinationDir: string, name: string): string {
  return path.join(destinationDir, name);
}

function getStylePath(filePath: string): StylePath {
  const fileParts = filePath.split(path.sep);
  const customFilePath = filePath.replace(
    path.join('dist', 'storefrontlib', 'styles'),
    path.join('projects', 'storefrontapp', 'src', 'scss')
  );

  return {
    path: fs.existsSync(customFilePath) ? customFilePath : filePath,
    componentFolder: fileParts[fileParts.length - 2],
    fileName: fileParts[fileParts.length - 1].replace('scss', 'css')
  };
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

function transpileSass(buffer: string): any {
  const css = sass.renderSync({
    data: buffer
  });

  return css.css;
}

// This should be customizable to change the path for node_modules
moveStylesToShellApp('./dist/storefrontlib/styles');
