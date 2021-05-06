import {
  CHECKOUT_CONFIG_SERVICE,
  LOGIN_REGISTER_COMPONENT,
  SPARTACUS_CORE,
  SPARTACUS_USER,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const LOGIN_REGISTER_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // feature-libs/user/account/components/login-register/login-register.component.ts
  class: LOGIN_REGISTER_COMPONENT,
  importPath: SPARTACUS_USER,
  deprecatedParams: [],
  removeParams: [
    { className: CHECKOUT_CONFIG_SERVICE, importPath: SPARTACUS_CORE },
  ],
};
