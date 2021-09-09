import {
  ANGULAR_ROUTER,
  AUTH_SERVICE,
  CMS_SERVICE,
  LOGOUT_GUARD,
  PROTECTED_ROUTES_SERVICE,
  ROUTER,
  ROUTING_SERVICE,
  SEMANTIC_PATH_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const LOGOUT_GUARD_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/cms-components/user/logout-guard.ts
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
      className: ROUTING_SERVICE,
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
  ],
  removeParams: [
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: ROUTER,
      importPath: ANGULAR_ROUTER,
    },
  ],
};
