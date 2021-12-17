import {
  ANGULAR_ROUTER,
  AUTH_REDIRECT_SERVICE,
  AUTH_SERVICE,
  CDC_LOGOUT_GUARD,
  CMS_SERVICE,
  PROTECTED_ROUTES_SERVICE,
  ROUTER,
  SEMANTIC_PATH_SERVICE,
  SPARTACUS_CDC,
  SPARTACUS_CORE,
  WINDOW_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CDC_LOGOUT_GUARD_CONSTRUCTOR_MIGRATION: ConstructorDeprecation = {
  // integration-libs/cdc/root/guards/cdc-logout.guard.ts
  class: CDC_LOGOUT_GUARD,
  importPath: SPARTACUS_CDC,
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
    {
      className: WINDOW_REF,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [{ className: AUTH_REDIRECT_SERVICE, importPath: SPARTACUS_CORE }],
};
