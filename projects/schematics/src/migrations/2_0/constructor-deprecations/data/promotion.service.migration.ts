import {
  ACTIVE_CART_SERVICE,
  CART_SERVICE,
  CHECKOUT_SERVICE,
  ORDER_DETAILS_SERVICE,
  PROMOTION_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const PROMOTION_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/shared/services/promotion/promotion.service.ts
  class: PROMOTION_SERVICE,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ORDER_DETAILS_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: CHECKOUT_SERVICE,
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
