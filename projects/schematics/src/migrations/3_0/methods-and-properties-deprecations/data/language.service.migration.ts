/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  LANGUAGE_SERVICE,
  SET_ACTIVE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/core/src/site-context/facade/language.service.ts
export const LANGUAGE_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: LANGUAGE_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: SET_ACTIVE,
    newNode: SET_ACTIVE,
    comment: `// ${TODO_SPARTACUS} Method '${SET_ACTIVE}' changed the return type from 'Subscription' to 'void'`,
  },
];
