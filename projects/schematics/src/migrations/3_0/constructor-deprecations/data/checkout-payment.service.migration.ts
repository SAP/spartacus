import {
  AUTH_SERVICE,
  SPARTACUS_CORE,
  CHECKOUT_PAYMENT_SERVICE,
  USER_ID_SERVICE,
  STORE,
  NGRX_STORE,
  ACTIVE_CART_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CHECKOUT_PAYMENT_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects/core/src/checkout/facade/checkout-payment.service.ts
  class: CHECKOUT_PAYMENT_SERVICE,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    {
      className: STORE,
      importPath: NGRX_STORE,
    },
    {
      className: AUTH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ACTIVE_CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  removeParams: [
    {
      className: AUTH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: USER_ID_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
