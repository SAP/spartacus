import {
  ACTIVE_CART_SERVICE,
  CHECKOUT_FACADE,
  COMMON_CONFIGURATOR_UTILS_SERVICE,
  CONFIGURATOR_CART_SERVICE,
  CONFIGURATOR_UTILS_SERVICE,
  NGRX_STORE,
  SPARTACUS_CHECKOUT_ROOT,
  SPARTACUS_CORE,
  SPARTACUS_PRODUCT_CONFIGURATOR_COMMON,
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
  STORE,
  USER_ID_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURATOR_CART_SERVICE_MIGRATION: ConstructorDeprecation = {
  // feature-libs/product-configurator/rulebased/core/facade/configurator-cart.service.ts
  class: CONFIGURATOR_CART_SERVICE,
  importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
  deprecatedParams: [
    { className: STORE, importPath: NGRX_STORE },
    { className: STORE, importPath: NGRX_STORE },
    { className: ACTIVE_CART_SERVICE, importPath: SPARTACUS_CORE },
    {
      className: COMMON_CONFIGURATOR_UTILS_SERVICE,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_COMMON,
    },
    { className: CHECKOUT_FACADE, importPath: SPARTACUS_CHECKOUT_ROOT },
    { className: USER_ID_SERVICE, importPath: SPARTACUS_CORE },
  ],
  // we omit the path for the following class because we don't want to have the respective
  // import deleted. Another constructor parameter is pointing to it
  removeParams: [
    {
      className: STORE,
    },
  ],
  addParams: [
    {
      className: CONFIGURATOR_UTILS_SERVICE,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    },
  ],
};
