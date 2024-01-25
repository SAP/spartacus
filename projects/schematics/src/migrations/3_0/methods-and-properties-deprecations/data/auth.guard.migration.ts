/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AUTH_GUARD,
  CAN_ACTIVATE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const AUTH_GUARD_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: AUTH_GUARD,
    importPath: SPARTACUS_CORE,
    deprecatedNode: CAN_ACTIVATE,
    comment: `// ${TODO_SPARTACUS} canActivate method now returns Observable that can emit boolean or UrlTree.`,
  },
];
