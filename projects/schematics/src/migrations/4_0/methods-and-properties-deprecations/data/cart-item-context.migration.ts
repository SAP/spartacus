/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CART_ITEM_CONTEXT,
  LOCATION$,
  PROMOTION_LOCATION$,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_STOREFRONTLIB } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/storefrontlib/cms-components/cart/cart-shared/cart-item/model/cart-item-context.model.ts
export const CART_ITEM_CONTEXT_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: CART_ITEM_CONTEXT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: PROMOTION_LOCATION$,
    comment: `// ${TODO_SPARTACUS} Property '${CART_ITEM_CONTEXT}.${PROMOTION_LOCATION$}' has been renamed to '${LOCATION$}'.`,
  },
];
