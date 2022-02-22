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
