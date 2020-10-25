import {
  ACTIVE_CART_SERVICE,
  AUTH_SERVICE,
  CART_VOUCHER_SERVICE,
  NGRX_STORE,
  SPARTACUS_CORE,
  STORE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

// projects/core/src/cart/facade/cart-voucher.service.ts
export const CART_VOUCHER_SERVICE_MIGRATION: ConstructorDeprecation = {
  class: CART_VOUCHER_SERVICE,
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
  ],
  addParams: [
    {
      className: ACTIVE_CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
