/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AUTH_HTTP_HEADER_SERVICE,
  HANDLE_EXPIRED_TOKEN,
  REFRESH_IN_PROGRESS,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../shared/libs-constants';
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
