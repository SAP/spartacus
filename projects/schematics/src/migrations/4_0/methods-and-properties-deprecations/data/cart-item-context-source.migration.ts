import {
  CART_ITEM_CONTEXT,
  LOCATION$,
  PROMOTION_LOCATION$,
  SPARTACUS_STOREFRONTLIB,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/storefrontlib/cms-components/cart/cart-shared/cart-item/model/cart-item-context-source.model.ts
export const CART_ITEM_CONTEXT_SOURCE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: CART_ITEM_CONTEXT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: PROMOTION_LOCATION$,
    comment: `// ${TODO_SPARTACUS} Property '${CART_ITEM_CONTEXT}.${PROMOTION_LOCATION$}' has been renamed to '${LOCATION$}'.`,
  },
];
