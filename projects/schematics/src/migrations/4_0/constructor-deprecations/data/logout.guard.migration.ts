import {
  ANGULAR_ROUTER,
  AUTH_REDIRECT_SERVICE,
  AUTH_SERVICE,
  CMS_SERVICE,
  LOGOUT_GUARD,
  PROTECTED_ROUTES_SERVICE,
  ROUTER,
  SEMANTIC_PATH_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const LOGOUT_GUARD_CONSTRUCTOR_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms-components/user/logout/logout.guard.ts
  class: LOGOUT_GUARD,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: AUTH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CMS_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: SEMANTIC_PATH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: PROTECTED_ROUTES_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ROUTER,
      importPath: ANGULAR_ROUTER,
    },
  ],
  addParams: [{ className: AUTH_REDIRECT_SERVICE, importPath: SPARTACUS_CORE }],
};
