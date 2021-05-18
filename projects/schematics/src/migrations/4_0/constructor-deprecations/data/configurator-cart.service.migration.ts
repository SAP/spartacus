import {
  ACTIVE_CART_SERVICE,
  CHECKOUT_FACADE,
  CHECKOUT_SERVICE,
  NGRX_STORE,
  PRODUCT_PAGE_EVENT_BUILDER,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  STORE,
  USER_ID_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURATOR_CART_SERVICE_MIGRATION: ConstructorDeprecation = {
  // feature-libs/product-configurator/rulebased/core/facade/configurator-cart.service.ts
  class: PRODUCT_PAGE_EVENT_BUILDER,
  importPath: SPARTACUS_STOREFRONTLIB,
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
