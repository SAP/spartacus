import {
  ACTIVE_CART_SERVICE,
  ANGULAR_FORMS,
  AUTH_REDIRECT_SERVICE,
  CART_SERVICE,
  CHECKOUT_LOGIN_COMPONENT,
  FORM_BUILDER,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CHECKOUT_LOGIN_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms-components/user/checkout-login/checkout-login.component.ts
  class: CHECKOUT_LOGIN_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: FORM_BUILDER,
      importPath: ANGULAR_FORMS,
    },
    {
      className: CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: AUTH_REDIRECT_SERVICE,
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
