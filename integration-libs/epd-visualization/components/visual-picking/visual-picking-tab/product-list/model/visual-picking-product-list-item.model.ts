/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '@spartacus/core';

/**
 * A model object representing a product item in the visual picking product list.
 *
 * @deprecated since v221121.5.0 - The epd-visualization integration library will be removed in the future.
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
