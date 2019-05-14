import * as fs from 'fs';

import * as path from 'path';

async function extractCssVariables(directoryPath: string) {
  const files = readDirectory(directoryPath);
  for (const file of files) {
    let content = await parseFile(file);
    content = removeVariable(content) + '\n';
    await fs.writeFileSync(file, content);
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

async function parseFile(filePath: string): Promise<string> {
  let buffer = await fs.readFileSync(filePath, 'utf-8');
  // normalize line endings
  buffer = buffer.replace(/\r\n/, '\n');
  // remove trailing newline
  buffer = buffer.replace(/\n$/, '');
  return buffer;
}

function removeVariable(css: string): string {
  return css.replace(/var\([\s\S]*?\)\;/g, function(matched) {
    let result = matched;
    if (matched.indexOf(',') !== -1) {
      result = result.replace(/\s\s+/g, ' ');

      result = result.split(/,(.+)/)[1];

      result = trim(result) + ';';
    }
    return result;
  });
}

function trim(text: string): string {
  let result = text.trim();
  result = result.substring(0, result.length - 2);

  return result.charAt(result.length - 1) === ' '
    ? result.substring(0, result.length - 1)
    : result;
}

extractCssVariables(
  './projects/storefrontlib/src/lib/product/components/product-details'
);
