/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * This script will convert translation files, which are written in TypeScript, into JSON files.
 * to execute this script: ts-node scripts/i18n/convert-translations-ts-2-json.ts
 * Please review the options before running this script
 * enable consoles for logging in logError & logMessage:  disabled for sonar issues
 */
import * as fs from 'fs-extra';
import * as ts from 'typescript';
import * as vm from 'vm';

// Options
const JSON_FOLDER = ''; // Generate JSON files to given location e.g. scripts/i18n/json
const CREATE_JSON_FILES = true; // Generate JSON files within the respective Spartacus translation directories
const UPDATE_IMPORT_FILES = true; // update the import statements in the index.ts files
const DELETE_TS_FILES = true; // Remove the TypeScript translation files once they have been converted to JSON.

startConvertToJson();
/**
 * Initiates the conversion of translation files to JSON format.
 * Recreates the JSON folder, if necessary, based on the specified JSON_FOLDER.
 * Checks for translation files in 'feature-libs', 'integration-libs', and 'projects' paths.
 * Converts TypeScript files to JSON.
 * Deletes the TypeScript files
 */
function startConvertToJson(): void {
  recreateFolder(JSON_FOLDER);
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
        convertTsToJson(checkPath, 'src/translations');
      } else {
        convertTsToJson(checkPath, 'assets/translations');
      }
    } else {
      logError(`Folder does not exist: ${checkPath}`);
    }
  }
  logMessage('Conversion done!');
}
/**
 * Convert TypeScript files within a directory to JSON files
 * @param {string} directoryPath: root directory of project
 * @param {string} targetPath: location of target file e.g. "src/translations"
 */
function convertTsToJson(directoryPath: string, targetPath: string): void {
  try {
    const files: string[] = fs.readdirSync(directoryPath);

    files.forEach((file) => {
      const filePath: string = directoryPath + '/' + file;
      const stats: fs.Stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        handleDirectory(filePath, targetPath);
      }
    });
  } catch (err: any) {
    logError('Error:', err);
  }
}

function handleDirectory(directoryPath: string, targetPath: string): void {
  if (isTranslationFolder(targetPath, directoryPath)) {
    handleTranslationFolder(directoryPath);
  } else {
    convertTsToJson(directoryPath, targetPath);
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
  const translationInfos: TranslationInfo[] = extractTranslationInfo(filePath);
  let errorExisted: boolean = false;

  translationInfos.forEach((translationInfo) => {
    const importedFilePath: string =
      folderPath + '/' + translationInfo.importedFileName;

    if (fs.existsSync(importedFilePath)) {
      handleExistingFile(importedFilePath, translationInfo, folderPath);
    } else {
      errorExisted = true;
      logError('File does not exist:', importedFilePath);
    }
  });

  if (!errorExisted) {
    updateImportStatement(filePath, translationInfos);
  }
}

function handleExistingFile(
  importedFilePath: string,
  translationInfo: TranslationInfo,
  folderPath: string
): void {
  const variablesObject: VariableObject[] =
    loadObjectsFromFile(importedFilePath);
  const selectedObject: VariableObject | undefined = variablesObject.find(
    (obj) => obj.name === translationInfo.importedObjectName
  );

  if (selectedObject) {
    const spacing = 2;
    const jsonStr: string = JSON.stringify(selectedObject.value, null, spacing);
    createJsonFile(folderPath, selectedObject.name, jsonStr);
  }
}

interface VariableObject {
  name: string;
  value: any;
}

interface TranslationInfo {
  importedFileName: string;
  importedObjectName: string;
}

function createJsonFile(
  filePath: string,
  objectName: string,
  content: string
): void {
  const jsonFile: string = objectName + '.json';
  if (CREATE_JSON_FILES) {
    if (!filePath.endsWith('/')) {
      filePath += '/';
    }
    fs.writeFileSync(filePath + jsonFile, content + '\n');
  }
  if (JSON_FOLDER) {
    fs.writeFileSync(JSON_FOLDER + '/' + jsonFile, content + '\n');
  }
}
/**
 * Reads and processes TypeScript files. It handles imports, tracks variable dependencies,
 * and transpiles TypeScript to JavaScript.
 * returns an array of objects containing variable names and their values.
 */
function loadObjectsFromFile(filePath: string): VariableObject[] {
  const tsFilesFullPath: string[] = [];
  tsFilesFullPath.push(filePath);
  const fileContents: string = fs.readFileSync(filePath, 'utf-8');
  let sourceFile: ts.SourceFile = ts.createSourceFile(
    filePath,
    fileContents,
    ts.ScriptTarget.ESNext,
    true
  );

  const importStatements: ts.ImportDeclaration[] = [];
  const orgVariableDeclarations: string[] = [];

  function visitNode(node: ts.Node): void {
    if (ts.isImportDeclaration(node)) {
      importStatements.push(node);
    } else if (ts.isVariableDeclaration(node)) {
      const variableName: string = node.name.getText();
      orgVariableDeclarations.push(variableName);
    }
    ts.forEachChild(node, visitNode);
  }

  visitNode(sourceFile);

  if (importStatements.length > 0) {
    const importedFileContents: string[] = [];
    const lastSlashIndex: number = filePath.lastIndexOf('/');
    const rootPath: string = filePath.substring(0, lastSlashIndex) + '/';

    importStatements.forEach((importStatement) => {
      const importFile: string = getImportedFileName(importStatement);
      const importedFileContent: string = fs.readFileSync(
        rootPath + importFile,
        'utf-8'
      );
      tsFilesFullPath.push(rootPath + importFile);
      importedFileContents.push(importedFileContent);
    });

    const mergedSourceFile: ts.SourceFile = ts.createSourceFile(
      filePath,
      importedFileContents.join('\n') + '\n' + fileContents,
      ts.ScriptTarget.ESNext,
      true
    );
    sourceFile = mergedSourceFile;
  }

  const objectNodes: ts.VariableDeclaration[] = [];

  function visit(node: ts.Node): void {
    if (ts.isVariableDeclaration(node)) {
      objectNodes.push(node);
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  const printer: ts.Printer = ts.createPrinter();
  const jsCode: string = objectNodes
    .map((node) => {
      return printer.printNode(ts.EmitHint.Unspecified, node, sourceFile);
    })
    .join('\n');

  const sandbox: { [key: string]: any } = {};
  vm.runInNewContext(jsCode, sandbox, { filename: filePath });

  if (DELETE_TS_FILES) {
    tsFilesFullPath.forEach((file) => {
      deleteFile(file);
    });
  }

  return orgVariableDeclarations.map((variable) => {
    const value: any = sandbox[variable];
    return {
      name: variable,
      value: value,
    };
  });
}
/**
 * extracts translation information from index.ts file.
 * @param {string} tsFilePath
 * @returns
 */
function extractTranslationInfo(tsFilePath: string): TranslationInfo[] {
  const tsFileContent: string = fs.readFileSync(tsFilePath, 'utf-8');
  const sourceFile: ts.SourceFile = ts.createSourceFile(
    tsFilePath,
    tsFileContent,
    ts.ScriptTarget.Latest,
    true
  );

  const importObjects: TranslationInfo[] = [];
  ts.forEachChild(sourceFile, (node) => {
    if (ts.isImportDeclaration(node)) {
      importObjects.push({
        importedFileName: getImportedFileName(node),
        importedObjectName: getImportedObjectName(node),
      });
    }
  });

  return importObjects;
}
/**
 * Function to extract imported file names from a text node
 * @param node: abstract syntax tree
 * @returns
 */
function getImportedFileName(node: ts.ImportDeclaration): string {
  let result: string = '';
  const matches: RegExpMatchArray | null = node
    .getText()
    .match(/from ['"](.*)['"]/);
  if (matches && matches[1]) {
    result = matches[1].replace(/\.\//, '') + '.ts';
  }
  return result;
}
/**
 * Function to extract the imported object name from a text node
 * @param node: abstract syntax tree
 * @returns
 */
function getImportedObjectName(node: ts.ImportDeclaration): string {
  const inputString = node.getText();
  const startIdx = inputString.indexOf('{'); // Find the index of the opening curly brace
  const endIdx = inputString.indexOf('}'); // Find the index of the closing curly brace

  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    return inputString.substring(startIdx + 1, endIdx).trim(); // Return the extracted substring directly
  } else {
    return '';
  }
}
/**
 * update import statement in index file.  remove TS import statements and replace with JSON
 * @param {string} filePath
 * @param {string} ImportedObjectName translationInfo.importedObjectName
 */
function updateImportStatement(
  filePath: string,
  translationInfos: TranslationInfo[]
): void {
  if (!UPDATE_IMPORT_FILES) {
    return;
  }

  try {
    const data: string = fs.readFileSync(filePath, 'utf8');
    const lines: string[] = data.split('\n');
    translationInfos.forEach((translationInfo) => {
      const searchString: string =
        'import { ' + translationInfo.importedObjectName + ' } from ';
      const replacementLine: string =
        'import ' +
        translationInfo.importedObjectName +
        " from './" +
        translationInfo.importedObjectName +
        ".json';";
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(searchString)) {
          lines[i] = replacementLine;
          break;
        }
      }
    });
    const updatedContent: string = lines.join('\n');
    fs.writeFileSync(filePath, updatedContent, 'utf8');
  } catch (err: any) {
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
  if (JSON_FOLDER) {
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
