/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AUTH_REDIRECT_SERVICE,
  REPORT_AUTH_GUARD,
  REPORT_NOT_AUTH_GUARD,
  SAVE_CURRENT_NAVIGATION_URL,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/core/src/auth/user-auth/services/auth-redirect.service.ts
export const AUTH_REDIRECT_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: AUTH_REDIRECT_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: REPORT_AUTH_GUARD,
    comment: `// ${TODO_SPARTACUS} Method '${AUTH_REDIRECT_SERVICE}.${REPORT_AUTH_GUARD}' was removed, use '${SAVE_CURRENT_NAVIGATION_URL}' method instead.`,
  },
  {
    class: AUTH_REDIRECT_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: REPORT_NOT_AUTH_GUARD,
    comment: `// ${TODO_SPARTACUS} Method '${AUTH_REDIRECT_SERVICE}.${REPORT_NOT_AUTH_GUARD}' was removed. No replacement needed. Every visited URL is now remembered automatically as redirect URL on 'NavigationEnd' event.`,
  },
];
