import {
  AUTH_SERVICE,
  SPARTACUS_CORE,
  LOGIN_FORM_COMPONENT,
  SPARTACUS_STOREFRONTLIB,
  GLOBAL_MESSAGE_SERVICE,
  FORM_BUILDER,
  ANGULAR_FORMS,
  AUTH_REDIRECT_SERVICE,
  WINDOW_REF,
  ACTIVATED_ROUTE,
  ANGULAR_ROUTER,
  CHECKOUT_CONFIG_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const LOGIN_FORM_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms-components/user/login-form/login-form.component.ts
  class: LOGIN_FORM_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: AUTH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: GLOBAL_MESSAGE_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: FORM_BUILDER,
      importPath: ANGULAR_FORMS,
    },
    {
      className: AUTH_REDIRECT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: WINDOW_REF,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ACTIVATED_ROUTE,
      importPath: ANGULAR_ROUTER,
    },
    {
      className: CHECKOUT_CONFIG_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
};
