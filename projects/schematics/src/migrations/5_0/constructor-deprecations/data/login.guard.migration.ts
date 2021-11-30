import {
  AUTH_CONFIG_SERVICE,
  AUTH_REDIRECT_SERVICE,
  AUTH_SERVICE,
  CMS_PAGE_GUARD,
  LOGIN_GUARD,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const LOGIN_GUARD_CONSTRUCTOR_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/cms-components/user/login-route/login.guard.ts
  class: LOGIN_GUARD,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: AUTH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: AUTH_REDIRECT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: AUTH_CONFIG_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CMS_PAGE_GUARD,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  removeParams: [
    {
      className: AUTH_REDIRECT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
