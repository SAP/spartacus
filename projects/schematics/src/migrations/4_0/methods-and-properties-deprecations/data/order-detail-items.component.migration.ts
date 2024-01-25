/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ORDER_DETAIL_ITEMS_COMPONENT,
  ORDER_PROMOTIONS$,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_STOREFRONTLIB } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const ORDER_DETAIL_ITEMS_COMPONENT_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: ORDER_DETAIL_ITEMS_COMPONENT,
      importPath: SPARTACUS_STOREFRONTLIB,
      deprecatedNode: ORDER_PROMOTIONS$,
      comment: `// ${TODO_SPARTACUS} Property '${ORDER_DETAIL_ITEMS_COMPONENT}.${ORDER_PROMOTIONS$}' was removed. The component may get promotions directly from the cart.`,
    },
  ];
