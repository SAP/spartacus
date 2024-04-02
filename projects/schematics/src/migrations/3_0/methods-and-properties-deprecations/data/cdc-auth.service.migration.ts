/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CDC_AUTH_SERVICE, TODO_SPARTACUS } from '../../../../shared/constants';
import { SPARTACUS_CDC } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const CDC_AUTH_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: CDC_AUTH_SERVICE,
    importPath: SPARTACUS_CDC,
    deprecatedNode: `authorizeWithCustomCdcFlow`,
    comment: `// ${TODO_SPARTACUS} 'authorizeWithCustomCdcFlow' method was renamed to 'loginWithCustomCdcFlow'.`,
  },
  {
    class: CDC_AUTH_SERVICE,
    importPath: SPARTACUS_CDC,
    deprecatedNode: `logout`,
    comment: `// ${TODO_SPARTACUS} 'logout' method override was removed. Now CDC hooks into logout process, by providing 'CdcLogoutGuard' as 'LogoutGuard'.`,
  },
];
