import {
  AUTH_SERVICE,
  BASE_SITE_SERVICE,
  CART_CONFIG_SERVICE,
  MULTI_CART_SERVICE,
  NGRX_STORE,
  SELECTIVE_CART_SERVICE,
  SPARTACUS_CORE,
  STORE,
  USER_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const SELECTIVE_CART_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects\core\src\cart\facade\selective-cart.service.ts
  class: SELECTIVE_CART_SERVICE,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    {
      className: STORE,
      importPath: NGRX_STORE,
    },
    {
      className: USER_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: AUTH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: MULTI_CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: BASE_SITE_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: CART_CONFIG_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
