import {
  ROUTING_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  CHECKOUT_STEP_SERVICE,
  USER_PAYMENT_SERVICE,
  CHECKOUT_DELIVERY_SERVICE,
  CHECKOUT_CONFIG_SERVICE,
  ACTIVATED_ROUTE,
  ANGULAR_ROUTER,
  PAYMENT_METHOD_COMPONENT,
  CHECKOUT_SERVICE,
  CHECKOUT_PAYMENT_SERVICE,
  GLOBAL_MESSAGE_SERVICE,
  TRANSLATION_SERVICE,
  ACTIVE_CART_SERVICE,
} from '../../../../shared/constants_3.0';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const PAYMENT_METHOD_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms-components/checkout/components/payment-method/payment-method.component.ts
  class: PAYMENT_METHOD_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: USER_PAYMENT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
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
      className: GLOBAL_MESSAGE_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CHECKOUT_CONFIG_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
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
  ],
  removeParams: [
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CHECKOUT_CONFIG_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  addParams: [
    {
      className: CHECKOUT_STEP_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
};
