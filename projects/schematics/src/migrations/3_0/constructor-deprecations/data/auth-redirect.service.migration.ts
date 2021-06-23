import {
  ANGULAR_ROUTER,
  AUTH_REDIRECT_SERVICE,
  AUTH_REDIRECT_STORAGE_SERVICE,
  ROUTER,
  ROUTING_SERVICE,
  SPARTACUS_CORE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const AUTH_REDIRECT_SERVICE_CONSTRUCTOR_MIGRATION: ConstructorDeprecation =
  {
    // projects/core/src/auth/guards/auth-redirect.service.ts
    class: AUTH_REDIRECT_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedParams: [
      {
        className: ROUTING_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: ROUTER,
        importPath: ANGULAR_ROUTER,
      },
    ],
    addParams: [
      {
        className: AUTH_REDIRECT_STORAGE_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  };
