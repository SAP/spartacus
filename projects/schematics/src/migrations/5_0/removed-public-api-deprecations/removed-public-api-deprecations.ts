import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { removedPublicApiDeprecation } from '../../mechanism/removed-public-api-deprecations/removed-public-api-deprecation';
import { REMOVED_PUBLIC_API_DATA } from './cart-lib-checkout.migration';

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return removedPublicApiDeprecation(tree, context, [
      ...REMOVED_PUBLIC_API_DATA,
    ]);
  };
}
