import {
  CART_ITEM_COMPONENT,
  FEATURE_CONFIG_SERVICE,
  PROMOTION_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

// projects/storefrontlib/src/cms-components/cart/cart-shared/cart-item/cart-item.component.ts
export const CART_ITEM_COMPONENT_MIGRATIONS: ConstructorDeprecation[] = [
  {
    class: CART_ITEM_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: PROMOTION_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: FEATURE_CONFIG_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: FEATURE_CONFIG_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
];
