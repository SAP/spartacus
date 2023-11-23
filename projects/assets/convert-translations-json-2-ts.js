/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * This script will convert translation files, which are written in JSON, into TypeScript files.
 * To execute this script: node projects/assets/convert-translations-json-2-ts.js
 * Please review the options before running this script
 */
'use strict';
/* eslint-env es6 */
const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const vm = require('vm');

// options
const TS_FOLDER = ''; // create TS files to given location e.g. 'projects/assets/ts'
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
function startConvertToTS() {
  recreateFolder(TS_FOLDER);
  // path to check: look for translation files in below pathes
  const checkPathes = ['feature-libs', 'integration-libs', 'projects'];
  const projectPath = process.cwd();
  for (const pathSegment of checkPathes) {
    const checkPath = `${projectPath}/${pathSegment}`;
    if (fs.existsSync(checkPath)) {
      if (pathSegment === 'projects') {
        convertJsonToTs(checkPath, 'src/translations');
      } else {
        convertJsonToTs(checkPath, 'assets/translations');
      }
    } else {
      console.error(`Folder does not exist: ${checkPath}`);
    }
  }
  console.log('Conversion done!');
}
/**
 * Convert JSON files within a directory to TS files
 * @param string directoryPath: root directory of project
 * @param string targetPath: location of target file e.g. "src/translations"
 */
function convertJsonToTs(directoryPath, targetPath) {
  try {
    const files = fs.readdirSync(directoryPath);

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        if (isTranslationFolder(targetPath, filePath)) {
          const subFiles = fs.readdirSync(filePath);
          let errorExisted = false;

          subFiles.forEach((subFile) => {
            if (subFile === 'index.ts') {
              const indexFilePath = path.join(filePath, subFile);
              const translationInfos = extractTranslationInfo(indexFilePath);

              translationInfos.forEach((translationInfo) => {
                const fullJsonFileName = path.join(
                  filePath,
                  translationInfo.importedFileName
                );

                if (fs.existsSync(fullJsonFileName)) {
                  const jsonData = JSON.parse(
                    fs.readFileSync(fullJsonFileName, 'utf8')
                  );
                  const tsConstDeclaration = convertJSONtoTSConst(
                    jsonData,
                    translationInfo.importedObjectName
                  );

                  createTSFile(
                    filePath,
                    translationInfo.importedObjectName,
                    tsConstDeclaration
                  );

                  if (DELETE_JSON_FILES) {
                    deleteFile(fullJsonFileName);
                  }
                } else {
                  errorExisted = true;
                  console.error('File does not exist:', fullJsonFileName);
                }
              });

              if (!errorExisted) {
                updateImportStatement(indexFilePath, translationInfos);
              }
            }
          });
        } else {
          convertJsonToTs(filePath, targetPath);
        }
      }
    });
  } catch (err) {
    console.error('Error:', err);
  }
}

/**
 * Converts a JavaScript object into a string representation with customizable formatting.
 * @param {any} obj - The input object to stringify.
 * @param {string} [indent=''] - The optional indentation for formatting (default: '').
 * @returns {string} - The string representation of the input object.
 */
function stringify(obj, indent = '') {
  if (typeof obj === 'string') {
    if (obj.includes('\n')) {
      return '`' + obj.replace(/`/g, '\\`') + '`'; // Use template string for values with newline
    }
    if (obj.includes("'")) {
      return `"${obj.replace(/"/g, '\\"')}"`; // Use double quotes if value contains single quotes
    }
    return `'${obj}'`; // Use single quotes for other string values
  } else if (typeof obj !== 'object' || obj === null) {
    return JSON.stringify(obj);
  } else if (Array.isArray(obj)) {
    const items = obj
      .map((item) => stringify(item, indent + '  '))
      .join(`,\n${indent}  `);
    return `[\n${indent}  ${items}\n${indent}]`;
  } else {
    const items = Object.keys(obj)
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

function convertJSONtoTSConst(jsonObject, constName) {
  const tsObject = stringify(jsonObject);
  const tsConstDeclaration = `export const ${constName} = ${tsObject};`;
  return tsConstDeclaration;
}

function createTSFile(filePath, objectName, content) {
  if (!filePath.endsWith('/')) {
    filePath += '/';
  }
  const tsFile = objectName + '.ts';
  // write to Spartcus folder
  if (CREATE_TS_FILES) {
    if (!filePath.endsWith('/')) {
      filePath += '/';
    }
    fs.writeFileSync(filePath + tsFile, content + '\n');
  }
  // write to TS_FOLDER folder
  if (TS_FOLDER) {
    fs.writeFileSync(TS_FOLDER + '/' + tsFile, content + '\n');
  }
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
      const fileName = getImportedFileName(node);
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
 * @param node: abstract syntax tree
 * @returns
 */
function getImportedFileName(node) {
  let result = '';
  const matches = node.getText().match(/from ['"](.*)['"]/);
  if (matches && matches[1]) {
    result = matches[1].replace(/\.\//, '');
  }
  return result;
}
/**
 * update import statement in index file.  remove JSON import statements and replace with TS
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
        'import ' + translationInfo.importedObjectName + ' from ';
      const replacementLine =
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
  if (TS_FOLDER) {
    if (fs.existsSync(folderPath)) {
      fs.rmSync(folderPath, { recursive: true, force: true });
    }
    fs.mkdirSync(folderPath, { recursive: true });
  }
}
