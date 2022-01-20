import {
  ACTIVE_CART_SERVICE,
  ANGULAR_ROUTER,
  CART_TOTALS_COMPONENT,
  ROUTER,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CART_TOTALS_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/cms-components/cart/cart-totals/cart-totals.component.ts
  class: CART_TOTALS_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: ACTIVE_CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  removeParams: [
    {
      className: ROUTER,
      importPath: ANGULAR_ROUTER,
    },
  ],
};
