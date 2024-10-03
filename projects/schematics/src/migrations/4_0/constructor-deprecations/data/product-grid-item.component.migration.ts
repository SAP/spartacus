/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  PRODUCT_GRID_ITEM_COMPONENT,
  PRODUCT_LIST_ITEM_CONTEXT_SOURCE,
} from '../../../../shared/constants';
import { SPARTACUS_STOREFRONTLIB } from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const PRODUCT_GRID_ITEM_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/cms-components/product/product-list/product-grid-item/product-grid-item.component.ts
  class: PRODUCT_GRID_ITEM_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [],
  addParams: [
    {
      className: PRODUCT_LIST_ITEM_CONTEXT_SOURCE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
};
