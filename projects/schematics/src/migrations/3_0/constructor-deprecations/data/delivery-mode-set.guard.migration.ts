import {
  ANGULAR_ROUTER,
  CHECKOUT_CONFIG_SERVICE,
  CHECKOUT_DETAILS_SERVICE,
  CHECKOUT_STEP_SERVICE,
  DELIVERY_MODE_SET_GUARD,
  ROUTER,
  ROUTING_CONFIG_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const DELIVERY_MODE_SET_GUARD_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/cms-components/checkout/guards/delivery-mode-set.guard.ts
  class: DELIVERY_MODE_SET_GUARD,
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
