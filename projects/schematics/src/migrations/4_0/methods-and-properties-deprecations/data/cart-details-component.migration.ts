/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CART_DETAILS_COMPONENT,
  ORDER_PROMOTIONS$,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_STOREFRONTLIB } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const CART_DETAILS_COMPONENT_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: CART_DETAILS_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: ORDER_PROMOTIONS$,
    comment: `// ${TODO_SPARTACUS} Property '${CART_DETAILS_COMPONENT}.${ORDER_PROMOTIONS$}' was removed. The component may get promotions directly from the cart.`,
  },
];
