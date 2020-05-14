import { chain, Rule, Tree } from '@angular-devkit/schematics';
import { insertPropertyInStorefrontModuleCallExpression } from '../shared/utils/module-file-utils';

function provideTestRouting(): Rule {
  return (tree: Tree) => {
    const insertion = `,
      routing: {
        routes: {
          product: {
            paths: ['product/:productCode/:name', 'product/:productCode'],
          },
        },
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
    return chain([provideTestRouting()]);
  };
}
