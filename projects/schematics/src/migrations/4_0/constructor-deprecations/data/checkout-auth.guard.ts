import {
  ACTIVE_CART_SERVICE,
  ANGULAR_ROUTER,
  AUTH_REDIRECT_SERVICE,
  AUTH_SERVICE,
  CHECKOUT_AUTH_GUARD,
  CHECKOUT_CONFIG_SERVICE,
  GLOBAL_MESSAGE_SERVICE,
  ROUTER,
  SEMANTIC_PATH_SERVICE,
  SPARTACUS_CHECKOUT,
  SPARTACUS_CORE,
  SPARTACUS_USER_ACCOUNT,
  USER_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

// feature-libs/checkout/components/guards/checkout-auth.guard.ts
export const CHECKOUT_AUTH_GUARD_MIGRATION: ConstructorDeprecation = {
  class: CHECKOUT_AUTH_GUARD,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    { className: AUTH_SERVICE, importPath: SPARTACUS_CORE },
    { className: AUTH_REDIRECT_SERVICE, importPath: SPARTACUS_CORE },
    {
      className: CHECKOUT_CONFIG_SERVICE,
      importPath: `${SPARTACUS_CHECKOUT}/components`,
    },
    { className: ACTIVE_CART_SERVICE, importPath: SPARTACUS_CORE },
    { className: SEMANTIC_PATH_SERVICE, importPath: SPARTACUS_CORE },
    { className: ROUTER, importPath: ANGULAR_ROUTER },
    { className: USER_SERVICE, importPath: SPARTACUS_CORE },
    { className: GLOBAL_MESSAGE_SERVICE, importPath: SPARTACUS_CORE },
  ],
  removeParams: [
    { className: USER_SERVICE, importPath: SPARTACUS_CORE },
    { className: GLOBAL_MESSAGE_SERVICE, importPath: SPARTACUS_CORE },
  ],
  addParams: [
    {
      className: 'UserAccountFacade',
      importPath: `${SPARTACUS_USER_ACCOUNT}/root`,
    },
    { className: GLOBAL_MESSAGE_SERVICE, importPath: SPARTACUS_CORE },
  ],
};
