import {
  chain,
  Rule,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import {
  B2C_STOREFRONT_MODULE,
  getProjectTargets,
} from '@spartacus/schematics';
import { Schema as SpartacusDevSchematicsOptions } from '../ng-add/schema';
import { insertPropertyInStorefrontModuleCallExpression } from '../shared/utils/module-file-utils';

function provideTestRouting(options: SpartacusDevSchematicsOptions): Rule {
  return (tree: Tree) => {
    const projectTargets = getProjectTargets(tree, options.project);

    if (!projectTargets.build) {
      throw new SchematicsException(`Project target "build" not found.`);
    }

    const mainPath = projectTargets.build.options.main;
    const appModulePath = getAppModulePath(tree, mainPath);

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
      B2C_STOREFRONT_MODULE,
      appModulePath,
      insertion
    );
  };
}

export default function (options: SpartacusDevSchematicsOptions): Rule {
  return (_tree: Tree) => {
    return chain([provideTestRouting(options)]);
  };
}
