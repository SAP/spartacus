import {
  ACTIVE_CART_SERVICE,
  AUTH_REDIRECT_SERVICE,
  AUTH_SERVICE,
  CART_SERVICE,
  CHECKOUT_AUTH_GUARD,
  CHECKOUT_CONFIG_SERVICE,
  ROUTING_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CHECKOUT_AUTH_GUARD_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms-components/checkout/guards/checkout-auth.guard.ts
  class: CHECKOUT_AUTH_GUARD,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: AUTH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: AUTH_REDIRECT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CHECKOUT_CONFIG_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  removeParams: [
    {
      className: CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: ACTIVE_CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
