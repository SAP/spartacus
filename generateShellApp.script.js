/**
 * This script is used to generate the storefrontapp artifacts.
 * Essentially, it copies the storefrontapp folder from ./projects/storefrontapp
 * into ./dist/storefrontshellapp.
 *
 * Other Individual files are also copied over.
 *
 * This script also modifies the copied angular.json and removes the irrelevant projects
 * This script also modifies the copied tsconfig.json and removes the compilerOptions.path
 */

let filesystem = require('fs');
let path = require('path');
let ncp = require('ncp').ncp;

const PROJECT_PATH = '.';
const DIST_PATH = `${PROJECT_PATH}/dist`;
const DIST_PROJECT_PATH = `${DIST_PATH}/storefrontshellapp`;
const STOREFRONTAPP_PATH = `${PROJECT_PATH}/projects/storefrontapp`;

//Inidividual files to be copied over
const ADDITIONAL_FILES_PATHS = [
  `${PROJECT_PATH}/.gitignore`,
  `${PROJECT_PATH}/angular.json`,
  `${PROJECT_PATH}/package.json`,
  `${PROJECT_PATH}/prettier-config.prettierrc`,
  `${PROJECT_PATH}/tsconfig.json`,
  `${PROJECT_PATH}/tslint.json`,
  `${PROJECT_PATH}/yarn.lock`
];

main();

/****************
 *   Functions  *
 ****************/
function main() {
  let promises = [];
  createDistFolder();
  promises.push(copyInto(STOREFRONTAPP_PATH, DIST_PROJECT_PATH));
  promises.push(copyAdditionalFilesIntoDist(ADDITIONAL_FILES_PATHS));
  Promise.all(promises).then(() => {
    console.log('All done');
    cleanUpDistAngularJsonFile();
    cleanUpDistTsConfigJsonFile();
  });
}

function createDistFolder() {
  if (!filesystem.existsSync(DIST_PATH)) {
    filesystem.mkdirSync(DIST_PATH);
  }
  if (!filesystem.existsSync(DIST_PROJECT_PATH)) {
    filesystem.mkdirSync(DIST_PROJECT_PATH);
  }
}

function copyAdditionalFilesIntoDist(filePathsArray) {
  let promises = [];
  let promise = new Promise((resolve, reject) => {
    filePathsArray.forEach(filePath => {
      promises.push(copyInto(filePath, DIST_PROJECT_PATH));
    });

    Promise.all(promises).then(() => {
      resolve();
    });
  });
  return promise;
}
function cleanUpDistAngularJsonFile() {
  let ANGULAR_JSON_DIST_PATH = `${DIST_PROJECT_PATH}/angular.json`;
  let file = filesystem.readFileSync(ANGULAR_JSON_DIST_PATH);
  let AngularJsonData = JSON.parse(file);

  delete AngularJsonData.projects['storefrontlib'];
  delete AngularJsonData.projects['storefrontapp-e2e'];

  filesystem.writeFileSync(
    ANGULAR_JSON_DIST_PATH,
    JSON.stringify(AngularJsonData, null, 2),
    err => {
      console.log(err);
      if (err) {
        return console.error(err);
      }
      console.log(
        `Finished cleaning up Angular.Json in ${ANGULAR_JSON_DIST_PATH} `
      );
    }
  );
}
function cleanUpDistTsConfigJsonFile() {
  let TS_CONFIG_DIST_PATH = `${DIST_PROJECT_PATH}/tsconfig.json`;
  let file = filesystem.readFileSync(TS_CONFIG_DIST_PATH);
  let tsConfigData = JSON.parse(file);

  delete tsConfigData.compilerOptions['paths'];

  filesystem.writeFileSync(
    TS_CONFIG_DIST_PATH,
    JSON.stringify(tsConfigData, null, 2),
    err => {
      if (err) {
        return console.error(err);
      }
      console.log(
        `Finished cleaning up tsconfig.Json in ${TS_CONFIG_DIST_PATH} `
      );
    }
  );
}

function copyInto(filePath, fileDest) {
  let isDirectory = filesystem.lstatSync(filePath).isDirectory();
  let fileName = path.basename(filePath);

  let promise = new Promise((resolve, reject) => {
    ncp(filePath, `${fileDest}/${fileName}`, err => {
      if (err) {
        reject(err);
        return console.error(err);
      }
      resolve();
      console.log(`Copied ${filePath} folder into ${fileDest}/${fileName}`);
    });
  });

  return promise;
}
