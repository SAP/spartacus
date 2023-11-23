/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * This script will convert translation files, which are written in TypeScript, into JSON files.
 * to execute this script: node projects/assets/convert-translations-ts-2-json.js
 * Please review the options before running this script
 */
'use strict';
/* eslint-env es6 */
const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const vm = require('vm');
// Options
const JSON_FOLDER = ''; // Generate JSON files to given location e.g. projects/assets/json
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
function startConvertToJson() {
  recreateFolder(JSON_FOLDER);
  // path to check: look for translation files in below pathes
  const checkPathes = ['feature-libs', 'integration-libs', 'projects'];

  // Iterate through each checkPath
  const projectPath = process.cwd();
  for (const pathSegment of checkPathes) {
    const checkPath = `${projectPath}/${pathSegment}`;
    if (fs.existsSync(checkPath)) {
      if (pathSegment === 'projects') {
        convertTsToJson(checkPath, 'src/translations');
      } else {
        convertTsToJson(checkPath, 'assets/translations');
      }
    } else {
      console.error(`Folder does not exist: ${checkPath}`);
    }
  }
  console.log('Conversion done!');
}
/**
 * Convert TypeScript files within a directory to JSON files
 * @param string directoryPath: root directory of project
 * @param string targetPath: location of target file e.g. "src/translations"
 */
function convertTsToJson(directoryPath, targetPath) {
  try {
    const files = fs.readdirSync(directoryPath);

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        if (isTranslationFolder(targetPath, filePath)) {
          const subFiles = fs.readdirSync(filePath);

          subFiles.forEach((subFile) => {
            if (subFile === 'index.ts') {
              const indexFilePath = path.join(filePath, subFile);
              const translationInfos = extractTranslationInfo(indexFilePath);
              let errorExisted = false;

              translationInfos.forEach((translationInfo) => {
                const importedFilePath = path.join(
                  filePath,
                  translationInfo.importedFileName
                );

                if (fs.existsSync(importedFilePath)) {
                  const variablesObject = loadObjectsFromFile(importedFilePath);
                  const selectedObject = variablesObject.find(
                    (obj) => obj.name === translationInfo.importedObjectName
                  );

                  const jsonStr = JSON.stringify(selectedObject.value, null, 2);
                  createJsonFile(filePath, selectedObject.name, jsonStr);
                } else {
                  errorExisted = true;
                  console.error('File does not exist:', importedFilePath);
                }
              });

              if (!errorExisted) {
                updateImportStatement(indexFilePath, translationInfos);
              }
            }
          });
        } else {
          convertTsToJson(filePath, targetPath);
        }
      }
    });
  } catch (err) {
    console.error('Error:', err);
  }
}

function createJsonFile(filePath, objectName, content) {
  const jsonFile = objectName + '.json';
  // write to project folder
  if (CREATE_JSON_FILES) {
    if (!filePath.endsWith('/')) {
      filePath += '/';
    }
    fs.writeFileSync(filePath + jsonFile, content + '\n');
  }
  // write to JSON_FOLDER folder
  if (JSON_FOLDER) {
    fs.writeFileSync(JSON_FOLDER + '/' + jsonFile, content + '\n');
  }
}

/**
 * Reads and processes TypeScript files. It handles imports, tracks variable dependencies,
 * and transpiles TypeScript to JavaScript.
 * returns an array of objects containing variable names and their values.
 */
function loadObjectsFromFile(filePath) {
  const tsFilesFullPath = [];
  tsFilesFullPath.push(filePath);
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  let sourceFile = ts.createSourceFile(
    filePath,
    fileContents,
    ts.ScriptTarget.ESNext,
    true
  );

  const importStatements = [];
  const orgVariableDeclarations = [];
  // check if TS file contains imports and saving original variables
  function visitNode(node) {
    if (ts.isImportDeclaration(node)) {
      importStatements.push(node);
    } else if (ts.isVariableDeclaration(node)) {
      const variableName = node.name.getText();
      orgVariableDeclarations.push(variableName);
    }
    ts.forEachChild(node, visitNode);
  }

  visitNode(sourceFile);

  // if import statement exist then get content and merge into original code file
  if (importStatements.length > 0) {
    const importedFileContents = [];
    const lastSlashIndex = filePath.lastIndexOf('/');
    const rootPath = filePath.substring(0, lastSlashIndex) + '/';

    // read and save imported file contents
    importStatements.forEach((importStatement) => {
      // Extract the imported file path from the import statement
      const importFile = getImportedFileName(importStatement);
      const importedFileContent = fs.readFileSync(
        rootPath + importFile,
        'utf-8'
      );
      tsFilesFullPath.push(rootPath + importFile);
      importedFileContents.push(importedFileContent);
    });
    // merge imported file contents with original file content
    const mergedSourceFile = ts.createSourceFile(
      filePath,
      importedFileContents.join('\n') + '\n' + fileContents,
      ts.ScriptTarget.ESNext,
      true
    );
    sourceFile = mergedSourceFile;
  }

  const objectNodes = [];
  // find/save all variable declarations
  function visit(node) {
    if (ts.isVariableDeclaration(node)) {
      objectNodes.push(node);
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);

  // Transpile TypeScript to JavaScript code
  const printer = ts.createPrinter();
  const jsCode = objectNodes
    .map((node) => {
      return printer.printNode(ts.EmitHint.Unspecified, node, sourceFile);
    })
    .join('\n');

  const sandbox = {};
  vm.runInNewContext(jsCode, sandbox, { filename: filePath });

  // delete TS files
  if (DELETE_TS_FILES) {
    tsFilesFullPath.forEach((file) => {
      deleteFile(file);
    });
  }

  // Return an array of objects with variable names and their corresponding values
  return orgVariableDeclarations.map((variable) => {
    const value = sandbox[variable];
    return {
      name: variable,
      value: value,
    };
  });
}

/**
 * extracts translation information from index.ts file.
 * @param string tsFilePath
 * @returns
 */
function extractTranslationInfo(tsFilePath) {
  const tsFileContent = fs.readFileSync(tsFilePath, 'utf-8');
  const sourceFile = ts.createSourceFile(
    tsFilePath,
    tsFileContent,
    ts.ScriptTarget.Latest,
    true
  );

  let importObjects = [];
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
function getImportedFileName(node) {
  let result = '';
  const matches = node.getText().match(/from ['"](.*)['"]/);
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
function getImportedObjectName(node) {
  let result = '';
  const matches = node.getText().match(/{([^}]*)}/);
  if (matches && matches.length > 1) {
    result = matches[1].trim();
  }
  return result;
}
/**
 * update import statement in index file.  remove TS import statements and replace with JSON
 * @param string filePath
 * @param string ImportedObjectName translationInfo.importedObjectName
 */
function updateImportStatement(filePath, translationInfos) {
  if (!UPDATE_IMPORT_FILES) {
    return;
  }

  try {
    const data = fs.readFileSync(filePath, 'utf8');

    const lines = data.split('\n');
    translationInfos.forEach((translationInfo) => {
      const searchString =
        'import { ' + translationInfo.importedObjectName + ' } from ';
      const replacementLine =
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
    const updatedContent = lines.join('\n');

    fs.writeFileSync(filePath, updatedContent, 'utf8');
  } catch (err) {
    console.error(err);
  }
}

/**
 * Function to determine if a given path corresponds to a translation folder
 * @param string parentFolderName:  src/translations or assets/translations
 * @param string givenPath: current path
 * @returns
 */
function isTranslationFolder(parentFolderName, givenPath) {
  const parentFolderNames = parentFolderName
    .split('/')
    .filter((segment) => segment.trim() !== '');

  const pathSegments = givenPath
    .split('/')
    .filter((segment) => segment.trim() !== '');

  return (
    pathSegments.length > 2 &&
    pathSegments[pathSegments.length - 3] === parentFolderNames[0] &&
    pathSegments[pathSegments.length - 2] === parentFolderNames[1]
  );
}
function deleteFile(filePath) {
  fs.unlinkSync(filePath, (err) => {
    if (err) {
      console.error('Error occurred:', err);
      return;
    }
  });
}

function recreateFolder(folderPath) {
  if (JSON_FOLDER) {
    if (fs.existsSync(folderPath)) {
      fs.rmSync(folderPath, { recursive: true, force: true });
    }
    fs.mkdirSync(folderPath, { recursive: true });
  }
}
