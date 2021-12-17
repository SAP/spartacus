import {
  ACTIVE_CART_SERVICE,
  ANGULAR_ROUTER,
  AUTH_REDIRECT_SERVICE,
  AUTH_SERVICE,
  CHECKOUT_AUTH_GUARD,
  CHECKOUT_CONFIG_SERVICE,
  GLOBAL_MESSAGE_SERVICE,
  ROUTER,
  ROUTING_SERVICE,
  SEMANTIC_PATH_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  USER_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CHECKOUT_AUTH_GUARD_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/cms-components/checkout/guards/checkout-auth.guard.ts
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
      importPath: SPARTACUS_STOREFRONTLIB,
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
  ],
  addParams: [
    {
      className: SEMANTIC_PATH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ROUTER,
      importPath: ANGULAR_ROUTER,
    },
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
