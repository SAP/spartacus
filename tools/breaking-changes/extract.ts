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
const EXCLUDED_MODULES = [
  '/opf/quick-buy/components',
  '/opf/quick-buy/public_api.d.ts'
];

console.log(`Extract public API for libs in ${spartacusHomeDir}/dist.`);

// Prepare directories
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
    console.log('Use "npm run extract-new-bundled" instead of "npm run extract-new" for better results.\n');
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

  // Copy the template config first
  fs.copyFileSync('api-extractor.json', apiExtractorJsonPath);

  // Now load it with API Extractor which handles JSONC format
  const config = ExtractorConfig.loadFileAndPrepare(apiExtractorJsonPath);

  // Override the output path for api.json to write to spartacusHomeDir/temp
  // We need to get the package name to construct the filename
  const packageJsonPath = `${libPath}/package.json`;
  if (fs.existsSync(packageJsonPath)) {
    const packageName = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')).name;
    const unscopedPackageName = escapePackageName(packageName);

    // Read the config file as text and add the apiJsonFilePath override
    let configText = fs.readFileSync(apiExtractorJsonPath, 'utf-8');

    // Find the docModel section and uncomment/add apiJsonFilePath
    const apiJsonPath = path.resolve(`${spartacusHomeDir}/temp/${unscopedPackageName}.api.json`);

    // Replace the commented line with an active one
    configText = configText.replace(
      /\/\/ "apiJsonFilePath":.*$/m,
      `"apiJsonFilePath": "${apiJsonPath.replace(/\\/g, '/')}"`
    );

    fs.writeFileSync(apiExtractorJsonPath, configText);

    // Reload the config with the changes
    return ExtractorConfig.loadFileAndPrepare(apiExtractorJsonPath);
  }

  return config;
}

