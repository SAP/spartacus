import {
  ACTIVE_CART_SERVICE,
  CART_SERVICE,
  MINI_CART_COMPONENT,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const MINI_CART_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms-components/cart/mini-cart/mini-cart.component.ts
  class: MINI_CART_COMPONENT,
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
