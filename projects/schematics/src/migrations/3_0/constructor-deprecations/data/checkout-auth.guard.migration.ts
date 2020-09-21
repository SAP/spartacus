import {
  ACTIVE_CART_SERVICE,
  AUTH_REDIRECT_SERVICE,
  AUTH_SERVICE,
  CHECKOUT_AUTH_GUARD,
  CHECKOUT_CONFIG_SERVICE,
  GLOBAL_MESSAGE_SERVICE,
  ROUTING_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  USER_SERVICE,
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
      className: CHECKOUT_CONFIG_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ACTIVE_CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: USER_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: GLOBAL_MESSAGE_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
