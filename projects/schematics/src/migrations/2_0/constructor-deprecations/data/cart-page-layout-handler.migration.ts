import {
  ACTIVE_CART_SERVICE,
  CART_PAGE_LAYOUT_HANDLER,
  CART_SERVICE,
  SELECTIVE_CART_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CART_PAGE_LAYOUT_HANDLER_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/cms-components/cart/cart-page-layout-handler.ts
  class: CART_PAGE_LAYOUT_HANDLER,
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
    {
      className: SELECTIVE_CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
