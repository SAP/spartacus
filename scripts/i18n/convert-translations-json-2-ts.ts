/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * This script will convert translation files, which are written in JSON, into TypeScript files.
 * To execute this script:
 *  ts-node scripts/i18n/convert-translations-json-2-ts.ts
 * Please review the options before running this script
 * enable consoles for logging in logError & logMessage:  disabled for sonar issues
 */

import * as fs from 'fs-extra';
import * as ts from 'typescript';

// options
const TS_FOLDER = ''; // create TS files to given location e.g. 'scripts/i18n/ts'
const CREATE_TS_FILES = true; // Generate TS files within the respective Spartacus translation directories
const UPDATE_IMPORT_FILES = true; // update the import statements in the index.ts files
const DELETE_JSON_FILES = true; // Remove the JSON translation files once they have been converted to TS.

startConvertToTS();
/**
 * Initiates the conversion of translation files to TS.
 * Recreates the TS folder, if necessary, based on the specified TS_FOLDER.
 * Checks for translation files in 'feature-libs', 'integration-libs', and 'projects' paths.
 * Converts JSON files to TypeScript.
 * Deletes the JSON files
 */
function startConvertToTS(): void {
  recreateFolder(TS_FOLDER);
  const checkPathes: string[] = [
    'feature-libs',
    'integration-libs',
    'projects',
  ];
  const projectPath: string = process.cwd();
  for (const pathSegment of checkPathes) {
    const checkPath: string = `${projectPath}/${pathSegment}`;
    if (fs.existsSync(checkPath)) {
      if (pathSegment === 'projects') {
        convertJsonToTs(checkPath, 'src/translations');
      } else {
        convertJsonToTs(checkPath, 'assets/translations');
      }
    } else {
      logError(`Folder does not exist: ${checkPath}`);
    }
  }
  logMessage('Conversion done!');
}
/**
 * Convert JSON files within a directory to TS files
 * @param {string} directoryPath: root directory of project
 * @param {string} targetPath: location of target file e.g. "src/translations"
 */
function convertJsonToTs(directoryPath: string, targetPath: string): void {
  try {
    const files: string[] = fs.readdirSync(directoryPath);

    files.forEach((file) => {
      const filePath: string = directoryPath + '/' + file;
      const stats: fs.Stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        handleDirectory(filePath, targetPath);
      }
    });
  } catch (err) {
    logError('Error:', err);
  }
}

function handleDirectory(directoryPath: string, targetPath: string): void {
  if (isTranslationFolder(targetPath, directoryPath)) {
    handleTranslationFolder(directoryPath);
  } else {
    convertJsonToTs(directoryPath, targetPath);
  }
}

function handleTranslationFolder(folderPath: string): void {
  const subFiles: string[] = fs.readdirSync(folderPath);

  subFiles.forEach((subFile) => {
    if (subFile === 'index.ts') {
      const indexFilePath: string = folderPath + '/' + subFile;
      handleIndexFile(indexFilePath, folderPath);
    }
  });
}

function handleIndexFile(filePath: string, folderPath: string): void {
  const translationInfos = extractTranslationInfo(filePath);

  let errorExisted = false;

  translationInfos.forEach((translationInfo) => {
    const fullJsonFileName: string =
      folderPath + '/' + translationInfo.importedFileName;

    if (fs.existsSync(fullJsonFileName)) {
      handleExistingJsonFile(fullJsonFileName, translationInfo, folderPath);
    } else {
      errorExisted = true;
      logError('File does not exist:', fullJsonFileName);
    }
  });

  if (!errorExisted) {
    updateImportStatement(filePath, translationInfos);
  }
}

function handleExistingJsonFile(
  fullJsonFileName: string,
  translationInfo: { importedFileName: string; importedObjectName: string },
  folderPath: string
): void {
  const jsonData: any = JSON.parse(fs.readFileSync(fullJsonFileName, 'utf8'));
  const tsConstDeclaration: string = convertJSONtoTSConst(
    jsonData,
    translationInfo.importedObjectName
  );

  createTSFile(
    folderPath,
    translationInfo.importedObjectName,
    tsConstDeclaration
  );

  if (DELETE_JSON_FILES) {
    deleteFile(fullJsonFileName);
  }
}

/**
 * Converts a JavaScript object into a string representation with customizable formatting.
 * @param {any} obj - The input object to stringify.
 * @param {string} [indent=''] - The optional indentation for formatting (default: '').
 * @returns {string} - The string representation of the input object.
 */
function stringify(obj: any, indent: string = ''): string {
  if (typeof obj === 'string') {
    if (obj.includes('\n')) {
      return '`' + obj.replace(/`/g, '\\`') + '`';
    }
    if (obj.includes("'")) {
      return `"${obj.replace(/"/g, '\\"')}"`;
    }
    return `'${obj}'`;
  } else if (typeof obj !== 'object' || obj === null) {
    return JSON.stringify(obj);
  } else if (Array.isArray(obj)) {
    const items: string = obj
      .map((item) => stringify(item, indent + '  '))
      .join(`,\n${indent}  `);
    return `[\n${indent}  ${items}\n${indent}]`;
  } else {
    const items: string = Object.keys(obj)
      .map(
        (key) =>
          `${indent}  ${key.replace(/'/g, '')}: ${stringify(
            obj[key],
            indent + '  '
          )}`
      )
      .join(',\n');
    return `{\n${items}\n${indent}}`;
  }
}

function convertJSONtoTSConst(jsonObject: any, constName: string): string {
  const tsObject: string = stringify(jsonObject);
  const tsConstDeclaration: string = `export const ${constName} = ${tsObject};`;
  return tsConstDeclaration;
}

function createTSFile(
  filePath: string,
  objectName: string,
  content: string
): void {
  if (!filePath.endsWith('/')) {
    filePath += '/';
  }
  const tsFile: string = objectName + '.ts';
  if (CREATE_TS_FILES) {
    if (!filePath.endsWith('/')) {
      filePath += '/';
    }
    fs.writeFileSync(filePath + tsFile, content + '\n');
  }
  if (TS_FOLDER) {
    fs.writeFileSync(TS_FOLDER + '/' + tsFile, content + '\n');
  }
}
/**
 * extracts translation information from index.ts file.
 * @param {string} tsFilePath
 * @returns
 */
function extractTranslationInfo(
  tsFilePath: string
): { importedFileName: string; importedObjectName: string }[] {
  const tsFileContent: string = fs.readFileSync(tsFilePath, 'utf-8');
  const sourceFile: ts.SourceFile = ts.createSourceFile(
    tsFilePath,
    tsFileContent,
    ts.ScriptTarget.Latest,
    true
  );

  const importObjects: {
    importedFileName: string;
    importedObjectName: string;
  }[] = [];
  ts.forEachChild(sourceFile, (node) => {
    if (ts.isImportDeclaration(node)) {
      const fileName: string = getImportedFileName(node);
      importObjects.push({
        importedFileName: fileName,
        importedObjectName: fileName.replace(/\.json/i, ''),
      });
    }
  });

  return importObjects;
}
/**
 * Function to extract imported file names from a text node
 * @param {Node}: abstract syntax tree
 * @returns
 */
function getImportedFileName(node: ts.Node): string {
  let result: string = '';
  const matches: RegExpMatchArray | null = node
    .getText()
    .match(/from ['"](.*)['"]/);
  if (matches && matches[1]) {
    result = matches[1].replace(/\.\//, '');
  }
  return result;
}
/**
 * update import statement in index file.  remove JSON import statements and replace with TS
 * @param {string} filePath
 * @param {string} ImportedObjectName translationInfo.importedObjectName
 */
function updateImportStatement(
  filePath: string,
  translationInfos: { importedFileName: string; importedObjectName: string }[]
): void {
  if (!UPDATE_IMPORT_FILES) {
    return;
  }
  try {
    const data: string = fs.readFileSync(filePath, 'utf8');
    const lines: string[] = data.split('\n');
    translationInfos.forEach((translationInfo) => {
      const searchString: string =
        'import ' + translationInfo.importedObjectName + ' from ';
      const replacementLine: string =
        'import { ' +
        translationInfo.importedObjectName +
        " } from './" +
        translationInfo.importedObjectName +
        "';";
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(searchString)) {
          lines[i] = replacementLine;
          break;
        }
      }
    });
    const updatedContent: string = lines.join('\n');

    fs.writeFileSync(filePath, updatedContent, 'utf8');
  } catch (err) {
    logError(err);
  }
}
/**
 * Function to determine if a given path corresponds to a translation folder
 * @param {string} parentFolderName:  src/translations or assets/translations
 * @param {string} givenPath: current path
 * @returns
 */
function isTranslationFolder(
  parentFolderName: string,
  givenPath: string
): boolean {
  const parentFolderNames: string[] = parentFolderName
    .split('/')
    .filter((segment) => segment.trim() !== '');

  const pathSegments: string[] = givenPath
    .split('/')
    .filter((segment) => segment.trim() !== '');

  const limitTwo = 2;
  const limitThree = 3;
  return (
    pathSegments.length > limitTwo &&
    pathSegments[pathSegments.length - limitThree] === parentFolderNames[0] &&
    pathSegments[pathSegments.length - limitTwo] === parentFolderNames[1]
  );
}

function deleteFile(filePath: string): void {
  try {
    fs.unlinkSync(filePath);
  } catch (err) {
    logError('Error occurred:', err);
  }
}

function recreateFolder(folderPath: string): void {
  if (TS_FOLDER) {
    if (fs.existsSync(folderPath)) {
      fs.rmSync(folderPath, { recursive: true, force: true });
    }
    fs.mkdirSync(folderPath, { recursive: true });
  }
}

/**
 * enable below consoles for logging:  disabled for sonar issues
 * for LogError add console.error(...args);
 * for logMessage add console.log(...args);
 */
function logError(...args: Parameters<typeof console.log>): number {
  return args.length;
}
function logMessage(...args: Parameters<typeof console.error>): number {
  return args.length;
}
