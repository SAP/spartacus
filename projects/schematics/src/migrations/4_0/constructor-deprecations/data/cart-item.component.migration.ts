import {
  CART_ITEM_COMPONENT,
  CART_ITEM_CONTEXT_SOURCE,
  PROMOTION_SERVICE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CART_ITEM_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms-components/cart/cart-shared/cart-item/cart-item.component.ts
  class: CART_ITEM_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: PROMOTION_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  addParams: [
    {
      className: CART_ITEM_CONTEXT_SOURCE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
};
