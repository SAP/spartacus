import {
  AUTH_REDIRECT_SERVICE,
  AUTH_SERVICE,
  AUTH_STORAGE_SERVICE,
  STORE,
  GLOBAL_MESSAGE_SERVICE,
  OAUTH_LIB_WRAPPER_SERVICE,
  ROUTING_SERVICE,
  NGRX_STORE,
  SPARTACUS_CORE,
  USER_ID_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const AUTH_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects/core/src/auth/user-auth/facade/auth.service.ts
  class: AUTH_SERVICE,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    {
      className: STORE,
      importPath: NGRX_STORE,
    },
    {
      className: USER_ID_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: OAUTH_LIB_WRAPPER_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: AUTH_STORAGE_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: AUTH_REDIRECT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: GLOBAL_MESSAGE_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
