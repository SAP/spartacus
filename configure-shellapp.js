/**
 * This script is used in generate-shellapp.sh to
 * modify the Angular.json and tsconfig.json file.
 */
let filesystem = require('fs');

main();

/****************
 *   Functions  *
 ****************/
function main() {
  let DIST_SHELLAPP_PATH =
    process.argv.slice(2)[0] || './dist/storefrontshellapp';
  cleanUpDistAngularJsonFile(DIST_SHELLAPP_PATH);
  cleanUpDistTsConfigJsonFile(DIST_SHELLAPP_PATH);
}

function cleanUpDistAngularJsonFile(root) {
  console.log(`Updating angular.json in ${root}`);
  //Fetch the storefrontapp config from the original Angular.json
  let ANGULAR_JSON_PATH = './angular.json';
  let angularJsonFile = filesystem.readFileSync(ANGULAR_JSON_PATH);
  let angularJsonData = JSON.parse(angularJsonFile);
  let storefrontAppConfig = {
    storefrontapp: angularJsonData.projects.storefrontapp
  };

  //Modify the copied Angular.json file
  let ANGULAR_JSON_DIST_PATH = `${root}/angular.json`;
  let angularJsonDistFile = filesystem.readFileSync(ANGULAR_JSON_DIST_PATH);
  let AngularJsonDistData = JSON.parse(angularJsonDistFile);
  AngularJsonDistData['projects'] = {};
  AngularJsonDistData.projects = storefrontAppConfig;

  //Save changes to the copied Angular.json file
  filesystem.writeFileSync(
    ANGULAR_JSON_DIST_PATH,
    JSON.stringify(AngularJsonDistData, null, 2),
    err => {
      if (err) {
        return console.error(err);
      }
      console.log(
        `Finished cleaning up angular.json in ${ANGULAR_JSON_DIST_PATH} `
      );
    }
  );
}

function cleanUpDistTsConfigJsonFile(root) {
  console.log(`Updating tsconfig.json in ${root}`);
  //Get the json from the tsconfig.file
  let TS_CONFIG_DIST_PATH = `${root}/tsconfig.json`;
  let file = filesystem.readFileSync(TS_CONFIG_DIST_PATH);
  let tsConfigData = JSON.parse(file);

  //apply modifications to the tsconfig.json
  delete tsConfigData.compilerOptions['paths'];

  //save modification
  filesystem.writeFileSync(
    TS_CONFIG_DIST_PATH,
    JSON.stringify(tsConfigData, null, 2),
    err => {
      if (err) {
        return console.error(err);
      }
      console.log(
        `Finished cleaning up tsconfig.json in ${TS_CONFIG_DIST_PATH} `
      );
    }
  );
}
