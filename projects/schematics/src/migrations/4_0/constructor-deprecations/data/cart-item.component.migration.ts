/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CART_ITEM_COMPONENT,
  CART_ITEM_CONTEXT_SOURCE,
  PROMOTION_SERVICE,
} from '../../../../shared/constants';
import { SPARTACUS_STOREFRONTLIB } from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CART_ITEM_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/cms-components/cart/cart-shared/cart-item/cart-item.component.ts
  class: CART_ITEM_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: PROMOTION_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  addParams: [
    {
      className: CART_ITEM_CONTEXT_SOURCE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  removeParams: [
    {
      className: PROMOTION_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
};
