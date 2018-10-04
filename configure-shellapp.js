/**
 * This script is used by generate-shellapp.sh to
 * update the storefrontshellapp's configuration once all
 * files are copied to the dist folder.
 */
let filesystem = require('fs');

main();

/****************
 *   Functions  *
 ****************/
function main() {
  const shellappPath =
    process.argv.slice(2)[0] || './dist/storefrontshellapp/storefrontapp';

  const configurationJsonData = filesystem.readFileSync(
    `./configure-shellapp.json`
  );
  const configurationData = JSON.parse(configurationJsonData);

  updateAngularJsonFile(shellappPath);
  updateTsconfigJsonFile(shellappPath + '/tsconfig.json');
  updateTsconfigJsonFile(
    shellappPath + '/projects/storefrontapp/tsconfig.app.prod.json'
  );
  updatePackageJsonFile(shellappPath, configurationData);
}

function updateAngularJsonFile(shellappPath) {
  const angularJsonPath = `${shellappPath}/angular.json`;
  console.log(`Updating ${angularJsonPath}`);
  //Modify the copied angular.json file
  const angularJsonDistFile = filesystem.readFileSync(angularJsonPath);
  const AngularJsonDistData = JSON.parse(angularJsonDistFile);
  const storefrontAppConfig = {
    storefrontapp: AngularJsonDistData.projects.storefrontapp
  };
  console.log(`  Removing all projects except "storefrontapp".`);
  AngularJsonDistData['projects'] = {};
  AngularJsonDistData.projects = storefrontAppConfig;

  //Save changes to the copied Angular.json file
  filesystem.writeFileSync(
    angularJsonPath,
    JSON.stringify(AngularJsonDistData, null, 2),
    err => {
      if (err) {
        return console.error(err);
      }
      console.log(`Done.`);
    }
  );
}

function updateTsconfigJsonFile(tsConfigPath) {
  console.log(`Updating ${tsConfigPath}`);
  //Get the json from the tsconfig.file
  const file = filesystem.readFileSync(tsConfigPath);
  const tsConfigData = JSON.parse(file);

  console.log(`  Removing "paths".`);
  //apply modifications to the tsconfig.json
  delete tsConfigData.compilerOptions['paths'];

  //save modification
  filesystem.writeFileSync(
    tsConfigPath,
    JSON.stringify(tsConfigData, null, 2),
    err => {
      if (err) {
        return console.error(err);
      }
      console.log(`Done.`);
    }
  );
}

function updatePackageJsonFile(shellappPath, configurationData) {
  const packageJsonPath = `${shellappPath}/package.json`;
  console.log(`Updating ${packageJsonPath}`);
  //Get the package.json data
  const packageJsonFile = filesystem.readFileSync(packageJsonPath);
  const packageJsonData = JSON.parse(packageJsonFile);

  console.log(
    '  Adding dependencies: ',
    configurationData.package_json.dependencies
  );

  // SPA-1289
  // packageJsonData.dependencies = {
  //   ...configurationData.package_json.dependencies,
  //   ...packageJsonData.dependencies
  // };

  packageJsonData.scripts = {
    // setting default package.json scripts
    ng: 'ng',
    start: 'ng serve',
    build: 'ng build',
    test: 'ng test',
    lint: 'ng lint',
    e2e: 'ng e2e'
  };

  //save modification
  filesystem.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJsonData, null, 2),
    err => {
      if (err) {
        return console.error(err);
      }
      console.log(`Done.`);
    }
  );
}
