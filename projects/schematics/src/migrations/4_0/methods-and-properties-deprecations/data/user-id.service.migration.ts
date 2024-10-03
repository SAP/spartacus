/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TODO_SPARTACUS, USER_ID_SERVICE } from '../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const USER_ID_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: USER_ID_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: `invokeWithUserId`,
    comment: `// ${TODO_SPARTACUS} Method '${USER_ID_SERVICE}.invokeWithUserId' was removed. Use 'takeUserId' method instead`,
  },
];
