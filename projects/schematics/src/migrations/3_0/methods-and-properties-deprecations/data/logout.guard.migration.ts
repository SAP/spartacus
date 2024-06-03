/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CAN_ACTIVATE,
  LOGOUT,
  LOGOUT_GUARD,
  REDIRECT,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_STOREFRONTLIB } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/storefrontlib/cms-components/user/logout-guard.ts
export const LOGOUT_GUARD_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: LOGOUT_GUARD,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: CAN_ACTIVATE,
    newNode: CAN_ACTIVATE,
    comment: `// ${TODO_SPARTACUS} Method '${CAN_ACTIVATE}' return type has changed from 'Observable<boolean>' to 'Observable<boolean | UrlTree>'.`,
  },
  {
    class: LOGOUT_GUARD,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: LOGOUT,
    newNode: LOGOUT,
    comment: `// ${TODO_SPARTACUS} Method '${LOGOUT}' return type has changed from 'void' to 'Promise<any>'.`,
  },
  {
    class: LOGOUT_GUARD,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: REDIRECT,
    comment: `// ${TODO_SPARTACUS} Method '${REDIRECT}' has been removed from ${LOGOUT_GUARD}. Please use 'getRedirectUrl()' instead.`,
  },
];
