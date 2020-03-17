import {
  ACTIVE_CART_SERVICE,
  CART_SERVICE,
  CHECKOUT_DELIVERY_SERVICE,
  CHECKOUT_DETAILS_SERVICE,
  CHECKOUT_PAYMENT_SERVICE,
  CHECKOUT_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CHECKOUT_DETAILS_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms-components/checkout/services/checkout-details.service.ts
  class: CHECKOUT_DETAILS_SERVICE,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: CHECKOUT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CHECKOUT_DELIVERY_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CHECKOUT_PAYMENT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
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
