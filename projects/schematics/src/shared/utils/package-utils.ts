import { SchematicsException, Tree } from '@angular-devkit/schematics';
import {
  ANGULAR_CORE,
  ANGULAR_LOCALIZE,
  DEFAULT_ANGULAR_VERSION,
  UTF_8,
} from '../constants';
import { version } from './../../../package.json';

export function getAngularVersion(tree: Tree, useFallback = true): string {
  const buffer = tree.read('package.json');
  let packageJsonVersion = '';
  if (buffer) {
    const packageJson = JSON.parse(buffer.toString(UTF_8));
    packageJsonVersion = packageJson.dependencies[ANGULAR_CORE];
  }
  return packageJsonVersion || (useFallback ? DEFAULT_ANGULAR_VERSION : '');
}

export function getMajorVersionNumber(versionString: string): number {
  if (!versionString) {
    throw new Error('versionString is undefined.');
  }

  versionString = stripLeadingNaN(versionString).charAt(0);
  return Number(versionString);
}

function stripLeadingNaN(versionString: string): string {
  const firstCharacter = versionString.charAt(0);
  if (isNaN(Number(firstCharacter))) {
    versionString = versionString.slice(1);
  }
  return versionString;
}

export function getSpartacusSchematicsVersion(): string {
  return version;
}

// TODO:#feature - rename to `getNewSpartacusVersion`
export function getSpartacusCurrentFeatureLevel(): string {
  const versionString = getSpartacusSchematicsVersion();
  return stripLeadingNaN(versionString).split('.').slice(0, 2).join('.');
}

export function isAngularLocalizeInstalled(tree: Tree): boolean {
  const pkgPath = '/package.json';
  const buffer = tree.read(pkgPath);
  if (!buffer) {
    throw new SchematicsException('Could not find package.json');
  }
  const packageJsonObject = JSON.parse(buffer.toString(UTF_8));
  return packageJsonObject.dependencies.hasOwnProperty(ANGULAR_LOCALIZE);
}
