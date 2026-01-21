/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Extractor,
  ExtractorConfig,
  ExtractorResult,
} from '@microsoft/api-extractor';
import * as fs from 'fs';
import { globSync } from 'glob';
import * as path from 'path';
import { escapePackageName } from './common';

const spartacusHomeDir = process.argv[2];
const distFolderPath = spartacusHomeDir + '/dist';

// Modules to exclude due to external global types issues (e.g., ApplePayJS)
// These are mainly aggregator modules - their sub-modules are still processed
const EXCLUDED_MODULES = [
  '/opf/quick-buy/components',
  '/opf/quick-buy/public_api.d.ts'
];

console.log(`Extract public API for libs in ${spartacusHomeDir}/dist.`);

//prepare dirs
if (!fs.existsSync(`${spartacusHomeDir}/etc`)) {
  fs.mkdirSync(`${spartacusHomeDir}/etc`);
}
if (!fs.existsSync(`${spartacusHomeDir}/temp`)) {
  fs.mkdirSync(`${spartacusHomeDir}/temp`);
}

// Try to find entry points in old format (public_api.d.ts)
let files = globSync(`${spartacusHomeDir}/dist/**/public_api.d.ts`);

// If no files found, try new format (bundled types in types/ folder)
if (files.length === 0) {
  console.log('No public_api.d.ts files found. Trying bundled types format...');
  files = globSync(`${spartacusHomeDir}/dist/*/types/*.d.ts`);

  if (files.length > 0) {
    console.log(`Found ${files.length} bundled type files.`);
    console.log('\n⚠️  WARNING: Bundled types format detected.');
    console.log('The new version uses bundled types which may not be fully compatible with API Extractor.');
    console.log('Consider rebuilding with augmented-types builder for accurate comparison.\n');
    console.log('To rebuild with old format:');
    console.log(`  1. cd ${spartacusHomeDir}`);
    console.log('  2. Modify project.json files to use "augmented-types" instead of "declaration-merging"');
    console.log('  3. Run: npm run build:libs\n');
  }
}

const filteredFiles = files.filter((file: string) => {
  return !EXCLUDED_MODULES.some(excluded => file.includes(excluded));
});

console.log(`Found ${files.length} entry points total.`);
console.log(`Processing ${filteredFiles.length} entry points (${files.length - filteredFiles.length} excluded).`);

const failedModules: string[] = [];
filteredFiles.forEach((file: any, index: any) => {
  const libPath = path.dirname(file);
  // Only log every 10th file to reduce noise
  if (index % 10 === 0 || index === filteredFiles.length - 1) {
    console.log(`Processing (${index + 1}/${filteredFiles.length}): ${libPath}`);
  }
  try {
    runExtractor(libPath);
  } catch (error) {
    console.error(
      `Failed to process ${libPath}:`,
      error instanceof Error ? error.message : error
    );
    failedModules.push(libPath);
  }
});

console.log(`\n✓ Successfully processed ${filteredFiles.length - failedModules.length}/${filteredFiles.length} modules`);

if (failedModules.length > 0) {
  console.log(`\n⚠️  Failed to process ${failedModules.length} module(s):`);
  failedModules.forEach((module) => console.log(`  - ${module}`));
  console.log(`\nContinuing with successfully processed modules...`);
}

function runExtractor(libPath: string) {
  preparePackageJson(libPath);

  // For bundled types format, create a temporary public_api.d.ts that re-exports the bundled file
  const publicApiPath = `${libPath}/public_api.d.ts`;
  let createdTempFile = false;
  if (!fs.existsSync(publicApiPath)) {
    // Find the bundled type file in this directory
    const bundledFiles = globSync(`${libPath}/*.d.ts`);
    if (bundledFiles.length > 0) {
      const bundledFile = path.basename(bundledFiles[0]);
      fs.writeFileSync(publicApiPath, `export * from './${bundledFile.replace('.d.ts', '')}';\n`);
      createdTempFile = true;
    }
  }

  const extractorConfig: ExtractorConfig = getExtractorConfig(libPath);

  // Invoke API Extractor
  const extractorResult: ExtractorResult = Extractor.invoke(extractorConfig, {
    // Equivalent to the "--local" command-line parameter
    localBuild: true,

    // Equivalent to the "--verbose" command-line parameter
    showVerboseMessages: false,
  });

  // Clean up temporary file
  if (createdTempFile && fs.existsSync(publicApiPath)) {
    fs.unlinkSync(publicApiPath);
  }

  if (extractorResult.succeeded) {
    // Only log if there are errors (warnings are suppressed)
    if (extractorResult.errorCount > 0) {
      console.log(`✓ Completed with ${extractorResult.errorCount} errors`);
    }
  } else {
    const errorMsg =
      `API Extractor completed with ${extractorResult.errorCount} errors` +
      ` and ${extractorResult.warningCount} warnings`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
}

export function updateNameInPackageJson(libPath: string): {
  name: string;
  newName: string;
} {
  const filePath = `${libPath}/package.json`;
  const packageContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const name: string = packageContent.name ?? getEntryPointName(libPath);
  const newName = escapePackageName(name);

  fs.writeFileSync(
    filePath,
    JSON.stringify({ ...packageContent, name: newName }, undefined, 2)
  );
  return {
    name,
    newName,
  };
}

function preparePackageJson(libPath: string): void {
  if (!fs.existsSync(`${libPath}/package.json`)) {
    createPackageJsonFile(libPath);
  }

  // Update the package.json file
  updateNameInPackageJson(libPath);
}


function createPackageJsonFile(libPath: string) {
  const beginIdx = libPath.indexOf(distFolderPath) + distFolderPath.length + 1;
  const entryPointNameFromPath = `@spartacus/${libPath.substring(beginIdx)}`;
  const entryPointNameGenerated = getEntryPointName(libPath);

  if (entryPointNameFromPath !== entryPointNameGenerated) {
    console.log(
      `INFO: Module name ${entryPointNameGenerated} differs from path name ${libPath}`
    );
  }
  if (!entryPointNameGenerated) {
    console.log(`Error: no module name found in ${libPath}`);
    process.exit(1);
  }
  const fileContent = `
{
  "name": "${entryPointNameGenerated}"
}
`;

  fs.writeFileSync(libPath + '/package.json', fileContent);
}

function getEntryPointName(libPath: string): string {
  // Try old format first (index.d.ts with amd-module)
  const indexPath = `${libPath}/index.d.ts`;
  if (fs.existsSync(indexPath)) {
    const indexFileContent = fs.readFileSync(indexPath, 'utf-8');
    const startPos =
      indexFileContent.indexOf('<amd-module name="') +
      '<amd-module name='.length +
      1;
    const endPos = indexFileContent.indexOf('"', startPos);
    const name = indexFileContent.substring(startPos, endPos);
    if (name) {
      return name;
    }
  }

  // For bundled types format, derive name from parent directory
  // e.g., /dist/core/types -> @spartacus/core
  const parentPath = path.dirname(libPath);
  const packageJsonPath = `${parentPath}/package.json`;
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    if (packageJson.name) {
      return packageJson.name;
    }
  }

  // Fallback: derive from directory structure
  const beginIdx = parentPath.indexOf(distFolderPath) + distFolderPath.length + 1;
  return `@spartacus/${parentPath.substring(beginIdx)}`;
}

function getExtractorConfig(libPath: string): ExtractorConfig {
  // Load and parse the api-extractor.json file
  const apiExtractorJsonPath: string = path.join(
    __dirname,
    `${libPath}/api-extractor.json`
  );
  fs.copyFileSync('api-extractor.json', apiExtractorJsonPath);

  return ExtractorConfig.loadFileAndPrepare(apiExtractorJsonPath);
}
