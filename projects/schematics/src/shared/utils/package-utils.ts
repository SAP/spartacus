import { Tree } from '@angular-devkit/schematics';
import { version } from './../../../package.json';

export function getAngularVersion(tree: Tree): string {
  const buffer = tree.read('package.json');
  if (buffer) {
    const packageJson = JSON.parse(buffer.toString('utf-8'));
    return packageJson.dependencies['@angular/core'];
  }
  return '';
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
  return version
    .split('.')
    .slice(0, 2)
    .join('.');
}
