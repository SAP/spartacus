import {
  ACTIVATED_ROUTE,
  ACTIVE_CART_SERVICE,
  ANGULAR_ROUTER,
  CHECKOUT_CONFIG_SERVICE,
  CHECKOUT_DELIVERY_SERVICE,
  CHECKOUT_STEP_SERVICE,
  ROUTING_SERVICE,
  SHIPPING_ADDRESS_COMPONENT,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  TRANSLATION_SERVICE,
  USER_ADDRESS_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const SHIPPING_ADDRESS_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/cms-components/checkout/components/shipping-address/shipping-address.component.ts
  class: SHIPPING_ADDRESS_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: USER_ADDRESS_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CHECKOUT_DELIVERY_SERVICE,
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
