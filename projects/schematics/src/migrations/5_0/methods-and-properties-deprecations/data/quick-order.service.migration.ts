/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  QUICK_ORDER_SERVICE,
  REMOVE_ENTRY,
  SEARCH,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_CART_QUICK_ORDER_CORE } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const QUICK_ORDER_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: QUICK_ORDER_SERVICE,
    importPath: SPARTACUS_CART_QUICK_ORDER_CORE,
    deprecatedNode: SEARCH,
    comment: `// ${TODO_SPARTACUS} Method '${QUICK_ORDER_SERVICE}.${SEARCH}' was removed. Use 'searchProducts' instead.`,
  },
  {
    class: QUICK_ORDER_SERVICE,
    importPath: SPARTACUS_CART_QUICK_ORDER_CORE,
    deprecatedNode: REMOVE_ENTRY,
    comment: `// ${TODO_SPARTACUS} Method '${QUICK_ORDER_SERVICE}.${REMOVE_ENTRY}' was removed. Use 'softDeleteEntry' instead.`,
  },
];
