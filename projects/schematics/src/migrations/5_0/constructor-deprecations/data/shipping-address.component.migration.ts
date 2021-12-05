import {
  ACTIVATED_ROUTE,
  ACTIVE_CART_SERVICE,
  ANGULAR_ROUTER,
  CHECKOUT_COST_CENTER_SERVICE,
  CHECKOUT_DELIVERY_SERVICE,
  CHECKOUT_STEP_SERVICE,
  GLOBAL_MESSAGE_SERVICE,
  PAYMENT_TYPE_SERVICE,
  SHIPPING_ADDRESS_COMPONENT,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  TRANSLATION_SERVICE,
  USER_ADDRESS_SERVICE,
  USER_COST_CENTER_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const SHIPPING_ADDRESS_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // feature-libs/checkout/components/components/shipping-address/shipping-address.component.ts
  class: SHIPPING_ADDRESS_COMPONENT,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    { className: USER_ADDRESS_SERVICE, importPath: SPARTACUS_CORE },
    {
      className: CHECKOUT_DELIVERY_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ACTIVATED_ROUTE,
      importPath: ANGULAR_ROUTER,
    },
    {
      className: TRANSLATION_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ACTIVE_CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CHECKOUT_STEP_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: PAYMENT_TYPE_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: USER_COST_CENTER_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CHECKOUT_COST_CENTER_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: GLOBAL_MESSAGE_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
