import {
  ANGULAR_FORMS,
  AUTH_CONFIG_SERVICE,
  FORGOT_PASSWORD_COMPONENT,
  FORM_BUILDER,
  ROUTING_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  USER_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const FORGOT_PASSWORD_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/cms-components/myaccount/forgot-password/forgot-password.component.ts
  class: FORGOT_PASSWORD_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: FORM_BUILDER,
      importPath: ANGULAR_FORMS,
    },
    {
      className: USER_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: AUTH_CONFIG_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
