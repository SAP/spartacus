/**
 * This script is responsible for processing SCSS files and updating their `@import` statements
 * based on predefined mappings and rules. It supports both forward and reverse transformations
 * of import paths.
 *
 * Key Features:
 * - **Forward Transformation**: Updates SCSS `@import` statements to use the correct paths
 *   based on the `pathsMapping` and `appendSpartacusPath` arrays.
 * - **Reverse Transformation**: Reverts the updated SCSS `@import` statements back to their
 *   original paths using the `pathsMapping` array.
 * - **Recursive Directory Processing**: Processes all SCSS files in a given directory and its
 *   subdirectories.
 *
 * Functions:
 * - `replaceContent`: Performs forward transformation of SCSS `@import` statements.
 *   - Replaces paths based on `pathsMapping`.
 *   - Adds the `@spartacus` prefix for paths listed in `appendSpartacusPath`.
 * - `reverseReplaceContent`: Performs reverse transformation of SCSS `@import` statements.
 *   - Reverts paths based on `pathsMapping`.
 * - `processScssFiles`: Recursively processes SCSS files in a directory.
 *   - Applies either `replaceContent` or `reverseReplaceContent` based on the `isReverse` flag.
 * - `isValidBoolean`: Utility function to validate and convert a string to a boolean value.
 *
 * Usage:
 * - Run the script with the following arguments:
 *   1. `directoryArg`: The directory containing SCSS files to process (default: `./dist`).
 *   2. `isReverse`: A boolean flag (`true` or `false`) indicating whether to perform reverse transformation.
 *
 * Example:
 * - Forward Transformation:
 *   Input: `@import 'feature-libs/asm/styles';`
 *   Output: `@import '@spartacus/asm/styles';`
 *
 * - Reverse Transformation:
 *   Input: `@import '@spartacus/asm/styles';`
 *   Output: `@import 'feature-libs/asm/styles';`
 *
 * Error Handling:
 * - Logs an error if the specified directory does not exist.
 * - Skips non-SCSS files and directories during processing.
 */

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
    const regex = new RegExp(`@(import|use) ['"]([^'"]*${key}[^'"]*)['"]`, 'ig');
    return content.replace(regex, (_match, directive, group) => {
      return `@${directive} '${group.replace(key, value)}'`;
    });
  }, updatedContent);

  // Add @spartacus prefix for paths in appendSpartacusPath
  updatedContent = updatedContent.replace(
    new RegExp(
      `@(import|use) ['"](${appendSpartacusPath.join('|')})(/[^'"]*)?['"]`,
      'ig'
    ),
    (_match, directive, group1, group2) => {
      if (group2) {
        return `@${directive} '@spartacus/${group1}${group2}'`;
      } else {
        return `@${directive} '@spartacus/${group1}'`;
      }
    }
  );

  return updatedContent;
};
/**
 * Reverse method for storefrontstyles project
 *
 * @param content
 * @param pathsMapping
 */
export const reverseReplaceContent = (
  content: string,
  pathsMapping: { key: string; value: string }[],
) => {
  let updatedContent = content;

  // Reverse paths based on pathsMapping
  updatedContent = pathsMapping.reduce((content, { key, value }) => {
    const regex = new RegExp(`@(import|use) ['"]([^'"]*${value}[^'"]*)['"]`, 'ig');
    return content.replace(regex, (_match, directive, group) => {
      return `@${directive} '${group.replace(value, key)}'`;
    });
  }, updatedContent);

  return updatedContent;
};

const processScssFiles = async (directory: string, isReverse: boolean|undefined = false) => {
  const files = await fs.readdir(directory, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(directory, file.name);
    if (file.isDirectory()) {
      // Recursively process subdirectories
      await processScssFiles(filePath, isReverse);
    } else if (file.isFile() && path.extname(file.name) === '.scss') {
      // Process SCSS file
      const content = await fs.readFile(filePath, 'utf8');
      const updatedContent = !isReverse ? replaceContent(
        content,
        pathsMapping,
        appendSpartacusPath
      ) : reverseReplaceContent(content, pathsMapping);

      if (updatedContent !== content) {
        await fs.writeFile(filePath, updatedContent, 'utf8');
        console.log(`Processed: ${filePath}`);
      }
    }
  }
};

const directoryArg = process.argv[2] || './dist';
const isReverseArg = process.argv[3];
const booleanValue = isReverseArg !== undefined && isReverseArg.toLowerCase() === "true";
if(!fileSystem.existsSync(directoryArg)) {
  console.error('[ERROR] Directory does not exist: ', directoryArg);
} else {
  console.log("Work directory: " + path.resolve(workspaceRoot, directoryArg));
  const scssDirectory = path.resolve(workspaceRoot, directoryArg);
  processScssFiles(scssDirectory, booleanValue).catch(console.error);
}
