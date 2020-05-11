import { Tree } from '@angular-devkit/schematics';
import { SPARTACUS_CORE } from '../constants';

export function getSpartacusVersion(tree: Tree): string {
  const buffer = tree.read('package.json');
  let spartacusVersion = '';
  if (buffer) {
    const packageJson = JSON.parse(buffer.toString('utf-8'));
    spartacusVersion = packageJson.dependencies[SPARTACUS_CORE];
  }
  return spartacusVersion;
}
