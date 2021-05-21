import {
  ACTIVE_CART_SERVICE,
  CHECKOUT_FACADE,
  CHECKOUT_SERVICE,
  CONFIGURATOR_CART_SERVICE,
  NGRX_STORE,
  SPARTACUS_CORE,
  SPARTACUS_PRODUCT_CONFIGURATOR,
  STORE,
  USER_ID_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURATOR_CART_SERVICE_MIGRATION: ConstructorDeprecation = {
  // feature-libs/product-configurator/rulebased/core/facade/configurator-cart.service.ts
  class: CONFIGURATOR_CART_SERVICE,
  importPath: SPARTACUS_PRODUCT_CONFIGURATOR,
  deprecatedParams: [
    { className: STORE, importPath: NGRX_STORE },
    { className: STORE, importPath: NGRX_STORE },
    { className: ACTIVE_CART_SERVICE, importPath: SPARTACUS_CORE },
    { className: CHECKOUT_SERVICE, importPath: SPARTACUS_CORE },
    { className: USER_ID_SERVICE, importPath: SPARTACUS_CORE },
  ],
  removeParams: [{ className: CHECKOUT_SERVICE, importPath: SPARTACUS_CORE }],
  addParams: [{ className: CHECKOUT_FACADE, importPath: SPARTACUS_CORE }],
};
