/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '@spartacus/core';

/**
 * A model object representing a product item in the visual picking product list.
 */
export interface VisualPickingProductListItem {
  /**
   * The product data.
   */
  product: Product;
  /**
   * Whether the item is selected.
   */
  selected: boolean;
}
