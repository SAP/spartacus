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

const files = globSync(`${spartacusHomeDir}/dist/**/public_api.d.ts`);
const filteredFiles = files.filter((file: string) => {
  return !EXCLUDED_MODULES.some((excluded) => file.includes(excluded));
});

console.log(`Found ${filteredFiles.length} entry points total.`);

const excludedCount = files.length - filteredFiles.length;
console.log(`Processing ${filteredFiles.length} entry points (${excludedCount} excluded).`);

let successCount = 0;
let failedCount = 0;
const failedEntries: string[] = [];

filteredFiles.forEach((file: string, index: number) => {
  if ((index + 1) % 10 === 0 || index === 0) {
    console.log(
      `Processing (${index + 1}/${filteredFiles.length}): ${path.dirname(file)}`
    );
  }

  try {
    runExtractor(path.dirname(file));
    successCount++;
  } catch (error: any) {
    console.error(`Failed to process ${path.dirname(file)}: ${error.message}`);
    failedEntries.push(path.dirname(file));
    failedCount++;
  }
});

console.log(`\n✓ Successfully processed ${successCount}/${filteredFiles.length} modules`);

if (failedCount > 0) {
  console.log(`\n⚠️  Failed to process ${failedCount} module(s):`);
  failedEntries.forEach(entry => console.log(`  - ${entry}`));
  console.log('\nContinuing with successfully processed modules...');
}

function runExtractor(libPath: string) {
  preparePackageJson(libPath);
  const extractorConfig: ExtractorConfig = getExtractorConfig(libPath);

  // Invoke API Extractor
  const extractorResult: ExtractorResult = Extractor.invoke(extractorConfig, {
    // Equivalent to the "--local" command-line parameter
    localBuild: true,

    // Equivalent to the "--verbose" command-line parameter
    showVerboseMessages: true,
  });

  if (extractorResult.succeeded) {
    console.log(`API Extractor completed successfully`);
    process.exitCode = 0;
  } else {
    console.error(
      `API Extractor completed with ${extractorResult.errorCount} errors` +
        ` and ${extractorResult.warningCount} warnings`
    );
    process.exitCode = 1;
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
    console.log(`Create missing package.json in ${libPath}`);
    createPackageJsonFile(libPath);
  }

  // Update the package.json file
  console.log(`update package name in file ${libPath}/package.json`);
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
  const indexFileContent = fs.readFileSync(`${libPath}/index.d.ts`, 'utf-8');
  const startPos =
    indexFileContent.indexOf('<amd-module name="') +
    '<amd-module name='.length +
    1;
  const endPos = indexFileContent.indexOf('"', startPos);
  return indexFileContent.substring(startPos, endPos);
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
