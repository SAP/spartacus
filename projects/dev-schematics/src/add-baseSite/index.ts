import { chain, Rule, Tree } from '@angular-devkit/schematics';
import { insertPropertyInStorefrontModuleCallExpression } from '../shared/utils/module-file-utils';

function provideTestBaseSites(): Rule {
  return (tree: Tree) => {
    const insertion = `,
      context: {
        urlParameters: ['baseSite', 'language', 'currency'],
        baseSite: [
          'electronics-spa',
          'electronics',
          'apparel-de',
          'apparel-uk',
          'apparel-uk-spa',
        ],
      }`;
    insertPropertyInStorefrontModuleCallExpression(
      tree,
      'src/app/app.module.ts',
      insertion
    );
  };
}

export default function (): Rule {
  return (_tree: Tree) => {
    return chain([provideTestBaseSites()]);
  };
}
