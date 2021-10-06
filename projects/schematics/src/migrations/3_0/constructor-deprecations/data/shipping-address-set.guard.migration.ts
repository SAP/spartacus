import {
  ANGULAR_ROUTER,
  CHECKOUT_CONFIG_SERVICE,
  CHECKOUT_DETAILS_SERVICE,
  CHECKOUT_STEP_SERVICE,
  ROUTER,
  ROUTING_CONFIG_SERVICE,
  SHIPPING_ADDRESS_SET_GUARD,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const SHIPPING_ADDRESS_SET_GUARD_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/cms-components/checkout/guards/shipping-address-set.guard.ts
  class: SHIPPING_ADDRESS_SET_GUARD,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: CHECKOUT_DETAILS_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: CHECKOUT_CONFIG_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: ROUTING_CONFIG_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ROUTER,
      importPath: ANGULAR_ROUTER,
    },
  ],
  removeParams: [
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
