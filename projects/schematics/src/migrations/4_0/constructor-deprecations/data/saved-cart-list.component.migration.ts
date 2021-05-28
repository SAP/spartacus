import {
  CLEAR_CHECKOUT_SERVICE,
  ROUTING_SERVICE,
  SAVED_CART_FACADE,
  SAVED_CART_LIST_COMPONENT,
  SPARTACUS_CART,
  SPARTACUS_CORE,
  TRANSLATION_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const SAVED_CART_LIST_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // feature-libs/cart/saved-cart/components/list/saved-cart-list.component.ts
  class: SAVED_CART_LIST_COMPONENT,
  importPath: SPARTACUS_CART,
  deprecatedParams: [
    { className: ROUTING_SERVICE, importPath: SPARTACUS_CORE },
    { className: TRANSLATION_SERVICE, importPath: SPARTACUS_CORE },
    { className: SAVED_CART_FACADE, importPath: SPARTACUS_CART },
    { className: CLEAR_CHECKOUT_SERVICE, importPath: SPARTACUS_CORE },
  ],
  removeParams: [
    { className: CLEAR_CHECKOUT_SERVICE, importPath: SPARTACUS_CORE },
  ],
};
