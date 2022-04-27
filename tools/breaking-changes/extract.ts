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
console.log(`Extract public API for libs in ${spartacusHomeDir}/dist.`);

//prepare dirs
if (!fs.existsSync(`${spartacusHomeDir}/etc`)) {
  fs.mkdirSync(`${spartacusHomeDir}/etc`);
}
if (!fs.existsSync(`${spartacusHomeDir}/temp`)) {
  fs.mkdirSync(`${spartacusHomeDir}/temp`);
}

const files = glob.sync(`${spartacusHomeDir}/dist/**/package.json`);
console.log(`Found ${files.length} entry points to process.`);
files.forEach((file: any, index: any) => {
  console.log(
    `Processing(${index + 1}/${files.length}): ${path.dirname(file)}`
  );
  runExtractor(path.dirname(file));
});

function runExtractor(libPath: string) {
  // Update the package.json file
  console.log(`update package name in file ${libPath}/package.json`);
  updateNameInPackageJson(`${libPath}/package.json`);
  // Load and parse the api-extractor.json file
  const apiExtractorJsonPath: string = path.join(
    __dirname,
    `${libPath}/api-extractor.json`
  );
  fs.copyFileSync('api-extractor.json', apiExtractorJsonPath);

  const extractorConfig: ExtractorConfig =
    ExtractorConfig.loadFileAndPrepare(apiExtractorJsonPath);

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

export function updateNameInPackageJson(filePath: string): {
  name: string;
  newName: string;
} {
  const packageContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const name: string = packageContent.name;
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
