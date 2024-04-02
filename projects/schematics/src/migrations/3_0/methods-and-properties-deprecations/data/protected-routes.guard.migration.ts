/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  PROTECTED_ROUTES_GUARD,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const PROTECTED_ROUTES_GUARD_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: PROTECTED_ROUTES_GUARD,
    importPath: SPARTACUS_CORE,
    deprecatedNode: `canActivate`,
    comment: `// ${TODO_SPARTACUS} The return type of the method 'canActivate' changed from 'Observable<boolean>' to 'Observable<boolean | UrlTree>'`,
  },
];
