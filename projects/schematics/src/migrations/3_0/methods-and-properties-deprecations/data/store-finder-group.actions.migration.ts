/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  FIND_STORES_CLASS,
  SEARCH_CONFIG,
  STORE_FINDER_ACTIONS,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/core/src/store-finder/store/actions/index.ts
export const STORE_FINDER_ACTIONS_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: STORE_FINDER_ACTIONS,
    importPath: SPARTACUS_CORE,
    deprecatedNode: FIND_STORES_CLASS,
    comment: `// ${TODO_SPARTACUS} please change the property type of 'searchConfig' to '${SEARCH_CONFIG}' for '${FIND_STORES_CLASS}' action`,
  },
];
