import { Tree } from '@angular-devkit/schematics';

export function getAngularVersion(tree: Tree): string {
  const buffer = tree.read('package.json');
  if (buffer) {
    const packageJson = JSON.parse(buffer.toString('utf-8'));
    return packageJson.dependencies['@angular/core'];
  }
  return '';
}
