/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Extractor,
  ExtractorConfig,
  ExtractorResult,
} from '@microsoft/api-extractor';
import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import { escapePackageName } from './common';

const spartacusHomeDir = process.argv[2];
const distFolderPath = spartacusHomeDir + '/dist';

console.log(`Extract public API for libs in ${spartacusHomeDir}/dist.`);

//prepare dirs
if (!fs.existsSync(`${spartacusHomeDir}/etc`)) {
  fs.mkdirSync(`${spartacusHomeDir}/etc`);
}
if (!fs.existsSync(`${spartacusHomeDir}/temp`)) {
  fs.mkdirSync(`${spartacusHomeDir}/temp`);
}

const files = glob.sync(`${spartacusHomeDir}/dist/**/public_api.d.ts`);
console.log(`Found ${files.length} entry points to process.`);
files.forEach((file: any, index: any) => {
  console.log(
    `Processing(${index + 1}/${files.length}): ${path.dirname(file)}`
  );
  runExtractor(path.dirname(file));
});

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
