import {
  ANGULAR_HTTP,
  AUTH_CONFIG,
  HTTP_CLIENT,
  OCC_ENDPOINTS_SERVICE,
  SPARTACUS_CORE,
  USER_AUTHENTICATION_TOKEN_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const USER_AUTHENTICATION_TOKEN_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects/core/src/auth/services/user-authentication/user-authentication-token.service.ts
  class: USER_AUTHENTICATION_TOKEN_SERVICE,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    {
      className: AUTH_CONFIG,
      importPath: SPARTACUS_CORE,
    },
    {
      className: HTTP_CLIENT,
      importPath: ANGULAR_HTTP,
    },
  ],
  addParams: [
    {
      className: OCC_ENDPOINTS_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
