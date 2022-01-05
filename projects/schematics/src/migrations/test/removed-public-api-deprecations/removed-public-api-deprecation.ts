import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  CART_EFFECTS,
  CONFIGURATOR_EVENT_LISTENER,
  SPARTACUS_CORE,
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
  WISHLIST_EFFECTS,
} from '../../../shared/constants';
import { DeprecatedNode } from '../../../shared/utils/file-utils';
import { removedPublicApiDeprecation } from '../../mechanism/removed-public-api-deprecations/removed-public-api-deprecation';

export const REMOVED_PUBLIC_API_DATA: DeprecatedNode[] = [
  // projects/core/src/cart/store/effects/cart.effect.ts
  {
    node: CART_EFFECTS,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/effects/wishlist.effect.ts
  {
    node: WISHLIST_EFFECTS,
    importPath: SPARTACUS_CORE,
  },
  // feature-libs/product-configurator/rulebased/core/event/rulebased-configurator-event.listener.ts
  {
    node: CONFIGURATOR_EVENT_LISTENER,
    importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    comment: `'${CONFIGURATOR_EVENT_LISTENER} has been removed and is no longer part of the public API. Please use 'ConfiguratorRouterListener' instead`,
  },
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return removedPublicApiDeprecation(tree, context, REMOVED_PUBLIC_API_DATA);
  };
}
