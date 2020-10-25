import {
  ACTIVE_CART_SERVICE,
  CART_SERVICE,
  CART_TOTALS_COMPONENT,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CART_TOTALS_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms-components/cart/cart-totals/cart-totals.component.ts
  class: CART_TOTALS_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  removeParams: [
    {
      className: CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: ACTIVE_CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
