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

export function getSpartacusSchematicsVersion(): string {
  return version;
}

export function getSpartacusCurrentFeatureLevel(): string {
  return version
    .split('.')
    .slice(0, 2)
    .join('.');
}
