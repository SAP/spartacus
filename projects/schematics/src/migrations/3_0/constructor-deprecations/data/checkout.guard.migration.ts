import {
  ACTIVE_CART_SERVICE,
  ANGULAR_ROUTER,
  CHECKOUT_CONFIG_SERVICE,
  CHECKOUT_GUARD,
  CHECKOUT_STEP_SERVICE,
  EXPRESS_CHECKOUT_SERVICE,
  ROUTER,
  ROUTING_CONFIG_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CHECKOUT_GUARD_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/cms-components/checkout/guards/checkout.guard.ts
  class: CHECKOUT_GUARD,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: ROUTER,
      importPath: ANGULAR_ROUTER,
    },
    {
      className: ROUTING_CONFIG_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CHECKOUT_CONFIG_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: EXPRESS_CHECKOUT_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: ACTIVE_CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: CHECKOUT_STEP_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
};
