import { Tree } from '@angular-devkit/schematics';

import { SPARTACUS_CORE, UTF_8 } from '@spartacus/schematics';

export function getSpartacusVersion(tree: Tree): string {
  const buffer = tree.read('package.json');
  let spartacusVersion = '';
  if (buffer) {
    const packageJson = JSON.parse(buffer.toString(UTF_8));
    spartacusVersion = packageJson.dependencies[SPARTACUS_CORE];
  }
  return spartacusVersion;
}
