import { SchematicsException, Tree } from '@angular-devkit/schematics';
import {
  ANGULAR_CORE,
  ANGULAR_LOCALIZE,
  DEFAULT_ANGULAR_VERSION,
  UTF_8,
} from '../constants';

export function getAngularVersion(tree: Tree, useFallback = true): string {
  const packageJsonObject = readPackageJson(tree);
  let packageJsonVersion = '';
  if (packageJsonObject) {
    packageJsonVersion = packageJsonObject.dependencies[ANGULAR_CORE];
  }
  return packageJsonVersion || (useFallback ? DEFAULT_ANGULAR_VERSION : '');
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

export function getSpartacusSchematicsVersion(tree: Tree): string {
  const packageJson = readPackageJson(tree);
  return packageJson.version;
}

export function getSpartacusCurrentFeatureLevel(tree: Tree): string {
  const packageJson = readPackageJson(tree);
  return packageJson.version.split('.').slice(0, 2).join('.');
}

export function isAngularLocalizeInstalled(tree: Tree): boolean {
  const packageJsonObject = readPackageJson(tree);
  return packageJsonObject.dependencies.hasOwnProperty(ANGULAR_LOCALIZE);
}

export function readPackageJson(tree: Tree): any {
  const pkgPath = '/package.json';
  const buffer = tree.read(pkgPath);
  if (!buffer) {
    throw new SchematicsException('Could not find package.json');
  }

  return JSON.parse(buffer.toString(UTF_8));
}
