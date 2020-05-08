import { chain, Tree } from '@angular-devkit/schematics';
import { insertPropertyInStorefrontModuleCallExpression } from '../shared/utils/module-file-utils';

function provideTestBaseSites() {
  return (tree: Tree) => {
    const insertion = `,
      baseSite: [
        'electronics-spa',
        'electronics',
        'apparel-de',
        'apparel-uk',
        'apparel-uk-spa',
      ]`;
    insertPropertyInStorefrontModuleCallExpression(
      tree,
      'src/app/app.module.ts',
      insertion
    );
  };
}

export default function () {
  return (_tree: Tree) => {
    return chain([provideTestBaseSites()]);
  };
}
