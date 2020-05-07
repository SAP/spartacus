import {
  AUTH_SERVICE,
  CMS_SERVICE,
  FEATURE_CONFIG_SERVICE,
  LOGOUT_GUARD,
  PROTECTED_ROUTES_SERVICE,
  ROUTING_SERVICE,
  SEMANTIC_PATH_SERVICE,
  SPARTACUS_CORE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const LOGOUT_GUARD_MIGRATION: ConstructorDeprecation[] = [
  {
    // projects/storefrontlib/src/cms-components/user/logout-guard.ts
    class: LOGOUT_GUARD,
    importPath: SPARTACUS_CORE,
    deprecatedParams: [
      { className: AUTH_SERVICE, importPath: SPARTACUS_CORE },
      { className: CMS_SERVICE, importPath: SPARTACUS_CORE },
      { className: ROUTING_SERVICE, importPath: SPARTACUS_CORE },
      { className: SEMANTIC_PATH_SERVICE, importPath: SPARTACUS_CORE },
      { className: PROTECTED_ROUTES_SERVICE, importPath: SPARTACUS_CORE },
      {
        className: FEATURE_CONFIG_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: FEATURE_CONFIG_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  {
    class: LOGOUT_GUARD,
    importPath: SPARTACUS_CORE,
    deprecatedParams: [
      { className: AUTH_SERVICE, importPath: SPARTACUS_CORE },
      { className: CMS_SERVICE, importPath: SPARTACUS_CORE },
      { className: ROUTING_SERVICE, importPath: SPARTACUS_CORE },
      { className: SEMANTIC_PATH_SERVICE, importPath: SPARTACUS_CORE },
    ],
    addParams: [
      { className: PROTECTED_ROUTES_SERVICE, importPath: SPARTACUS_CORE },
    ],
  },
];
