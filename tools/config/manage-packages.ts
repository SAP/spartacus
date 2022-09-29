import { execSync } from 'child_process';
import {
  PACKAGE_JSON,
} from './const';
import {
  logUpdatedFile,
  reportProgress,
  Repository,
  saveJsonFile
} from './index';

/**
 * Update publishing version of libraries to specific version
 * 
 * @param libraries libraries to update
 * @param version version to updatae libraries to
 */
export function updatePackageJsonFiles(
    libraries: Repository,
    version: string
  ) {
    reportProgress('Updating publishing versions of package.json files');
    Object.values(libraries).forEach((lib) => {
      const pathToPackageJson = `${lib.directory}/${PACKAGE_JSON}`;
      const packageJson = lib.packageJsonContent;
      packageJson.version = version;
      saveJsonFile(pathToPackageJson, packageJson);
      execSync(`cd ${lib.directory} && npx sort-package-json`, {
        stdio: 'ignore',
      });
      logUpdatedFile(pathToPackageJson);
    });
}