import { SchematicsException, Tree } from '@angular-devkit/schematics';
import {
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { version } from '../../../package.json';
import { ANGULAR_SCHEMATICS, SPARTACUS_SCOPE, UTF_8 } from '../constants';
import { getServerTsPath } from './file-utils';
import { getDefaultProjectNameFromWorkspace } from './workspace-utils';

const FEATURES_LIBS_SKIP_SCOPES = [SPARTACUS_SCOPE, ANGULAR_SCHEMATICS];
export function createDependencies(
  dependencyObject: any,
  skipScopes: string[] = FEATURES_LIBS_SKIP_SCOPES
): NodeDependency[] {
  const dependencies: NodeDependency[] = [];
  for (const dependencyName in dependencyObject) {
    if (!dependencyObject.hasOwnProperty(dependencyName)) {
      continue;
    }

    if (skipScopes.some((scope) => dependencyName.startsWith(scope))) {
      continue;
    }

    const type = dependencyName.includes('schematics')
      ? NodeDependencyType.Dev
      : NodeDependencyType.Default;
    dependencies.push({
      type,
      name: dependencyName,
      version: dependencyObject[dependencyName],
    });
  }

  return dependencies;
}

export function readPackageJson(tree: Tree): any {
  const pkgPath = '/package.json';
  const buffer = tree.read(pkgPath);
  if (!buffer) {
    throw new SchematicsException('Could not find package.json');
  }

  return JSON.parse(buffer.toString(UTF_8));
}

export function getMajorVersionNumber(versionString: string): number {
  if (!versionString) {
    throw new Error('versionString is undefined.');
  }

  let majorVersion = versionString.charAt(0);
  if (isNaN(Number(majorVersion))) {
    majorVersion = versionString.charAt(1);
  }

  return Number(majorVersion);
}

export function getSpartacusSchematicsVersion(): string {
  return version;
}

export function getSpartacusCurrentFeatureLevel(): string {
  return version.split('.').slice(0, 2).join('.');
}

export function checkIfSSRIsUsed(tree: Tree): boolean {
  const projectName = getDefaultProjectNameFromWorkspace(tree);
  const buffer = tree.read('angular.json');
  if (!buffer) {
    throw new SchematicsException('Could not find angular.json');
  }
  const angularFileBuffer = buffer.toString(UTF_8);
  const angularJson = JSON.parse(angularFileBuffer);
  const isServerConfiguration = !!angularJson.projects[projectName].architect[
    'server'
  ];

  const serverFileLocation = getServerTsPath(tree);
  if (!serverFileLocation) {
    return false;
  }

  const serverBuffer = tree.read(serverFileLocation);
  const serverFileBuffer = serverBuffer?.toString(UTF_8);
  const isServerSideAvailable = serverFileBuffer && !!serverFileBuffer.length;

  return !!(isServerConfiguration && isServerSideAvailable);
}
