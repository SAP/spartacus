/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ON_RESTORE_COMPLETE,
  RESTORE_SAVED_CART,
  SAVED_CART_FORM_DIALOG_COMPONENT,
  SAVED_CART_LIST_COMPONENT,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_CART_SAVED_CART_COMPONENTS } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// feature-libs/cart/saved-cart/components/list/saved-cart-list.component.ts
export const SAVED_CART_LIST_COMPONENT_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: SAVED_CART_LIST_COMPONENT,
      importPath: SPARTACUS_CART_SAVED_CART_COMPONENTS,
      deprecatedNode: RESTORE_SAVED_CART,
      comment: `// ${TODO_SPARTACUS} Method '${SAVED_CART_LIST_COMPONENT}.${RESTORE_SAVED_CART}' was removed. ${SAVED_CART_FORM_DIALOG_COMPONENT} will handle the restore saved cart logic`,
    },
    {
      class: SAVED_CART_LIST_COMPONENT,
      importPath: SPARTACUS_CART_SAVED_CART_COMPONENTS,
      deprecatedNode: ON_RESTORE_COMPLETE,
      comment: `// ${TODO_SPARTACUS} Method '${SAVED_CART_LIST_COMPONENT}.${ON_RESTORE_COMPLETE}' was removed. ${SAVED_CART_FORM_DIALOG_COMPONENT} will handle the restore saved cart completion logic`,
    },
  ];
