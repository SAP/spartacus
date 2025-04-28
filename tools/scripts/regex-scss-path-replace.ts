import * as fs from 'fs/promises';
import * as fileSystem from 'fs';
import * as path from 'path';
import { appendSpartacusPath, pathsMapping } from './paths';
import { workspaceRoot } from 'nx/src/utils/workspace-root';

export const replaceContent = (
  content: string,
  pathsMapping: { key: string; value: string }[],
  appendSpartacusPath: string[]
) => {
  let updatedContent = content;

  // Replace paths based on pathsMapping
  updatedContent = pathsMapping.reduce((content, { key, value }) => {
    const regex = new RegExp(`@import ['"]([^'"]*${key}[^'"]*)['"]`, 'ig');
    return content.replace(regex, (_match, group) => {
      return `@import '${group.replace(key, value)}'`;
    });
  }, updatedContent);

  // Add @spartacus prefix for paths in appendSpartacusPath
  const spartacusRegex = new RegExp(
    `@import ['"](${appendSpartacusPath.join('|')})/([^'"]*)['"]`,
    'ig'
  );
  updatedContent = updatedContent.replace(
    spartacusRegex,
    (_match, group1, group2) => {
      return `@import '@spartacus/${group1}/${group2}'`;
    }
  );

  return updatedContent;
};

const processScssFiles = async (directory: string) => {
  const files = await fs.readdir(directory, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(directory, file.name);
    if (file.isDirectory()) {
      // Recursively process subdirectories
      await processScssFiles(filePath);
    } else if (file.isFile() && path.extname(file.name) === '.scss') {
      // Process SCSS file
      const content = await fs.readFile(filePath, 'utf8');
      const updatedContent = replaceContent(
        content,
        pathsMapping,
        appendSpartacusPath
      );

      if (updatedContent !== content) {
        await fs.writeFile(filePath, updatedContent, 'utf8');
        console.log(`Processed: ${filePath}`);
      }
    }
  }
};

console.log(process.argv[0], process.argv[1]);
const directoryArg = process.argv[2] || './dist';
if(!fileSystem.existsSync(directoryArg)) {
  console.error('[ERROR] Directory does not exist: ', directoryArg);
} else {
  console.log("Work directory: " + path.resolve(workspaceRoot, directoryArg));
  const scssDirectory = path.resolve(workspaceRoot, directoryArg);
  processScssFiles(scssDirectory).catch(console.error);
}
