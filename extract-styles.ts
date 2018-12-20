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
    path.join('projects', 'storefrontapp', 'src', 'assets', 'css')
  );
  for (const file of files) {
    const filePath = getStylePath(file);
    const destDir = createRecursiveDirectory(path.join(dirPath));
    const buffer = fs.readFileSync(filePath.path, { encoding: 'utf-8' });

    fs.writeFile(
      buildDestinationPath(destDir, filePath.fileName.replace('%', '')),
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
    data: buffer,
    includePaths: ['./node_modules/@spartacus/styles/scss'],
    importer: function(url, prev, _done) {
      if (url[0] === '~') {
        const baseUrl = prev.split('@spartacus')[0];
        return { file: baseUrl.concat('', url.substr(1)) };
      } else {
        return null;
      }
    }
  });

  return css.css;
}

// const transform = (read: Stream, _write: fs.WriteStream) => {
//   // write = fs.createWriteStream(write.path.toString().replace('scss', 'css'));
//   read.pipe(compile);
// };

// const compile = through2((data, _encoding, callBack) => {
//   callBack(null, new Buffer(transpileSass(data.toString())));
// });

// function test() {
//   ncp.ncp.limit = 16;

//   ncp.ncp(
//     path.join('projects', 'storefrontapp', 'src', 'scss'),
//     path.join('projects', 'storefrontapp', 'src', 'styles'),
//     { transform },
//     err => {
//       if (err) {
//         console.log(err);
//         return console.error(err);
//       }
//       console.log('done');
//     }
//   );
// }

// This should be customizable to change the path for node_modules
moveStylesToShellApp('./dist/storefrontlib/styles');
moveStylesToShellApp('./projects/storefrontapp/src/scss');
