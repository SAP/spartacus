import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { DeprecatedNode } from '../../../shared/utils/file-utils';
import {
  CART_ITEM_COMPONENT,
  ITEM,
  ORDER_ENTRY,
  SPARTACUS_STOREFRONTLIB,
} from '../../../shared/constants';
import { removedPublicApiDeprecation } from '../../mechanism/removed-public-api-deprecations/removed-public-api-deprecation';

export const REMOVED_PUBLIC_API_DATA: DeprecatedNode[] = [
  // projects/storefrontlib/src/cms-components/cart/cart-shared/cart-item/cart-item.component.ts
  {
    node: CART_ITEM_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${ITEM}' interface was removed from ${CART_ITEM_COMPONENT}. User ${ORDER_ENTRY} instad.`,
  },
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return removedPublicApiDeprecation(tree, context, REMOVED_PUBLIC_API_DATA);
  };
}
