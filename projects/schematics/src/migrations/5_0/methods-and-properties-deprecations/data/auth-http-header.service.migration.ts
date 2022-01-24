import {
  AUTH_HTTP_HEADER_SERVICE,
  HANDLE_EXPIRED_TOKEN,
  REFRESH_IN_PROGRESS,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/core/src/auth/user-auth/services/auth-http-header.service.ts
export const AUTH_HTTP_HEADER_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: AUTH_HTTP_HEADER_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: REFRESH_IN_PROGRESS,
    comment: `// ${TODO_SPARTACUS} Property '${AUTH_HTTP_HEADER_SERVICE}.${REFRESH_IN_PROGRESS}' was removed. Use 'refreshInProgress$' Observable instead.`,
  },
  {
    class: AUTH_HTTP_HEADER_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: HANDLE_EXPIRED_TOKEN,
    comment: `// ${TODO_SPARTACUS} Method '${AUTH_HTTP_HEADER_SERVICE}.${HANDLE_EXPIRED_TOKEN}' was removed. Use 'getValidToken' instead.`,
  },
];
