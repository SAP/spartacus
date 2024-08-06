/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Product } from '@spartacus/core';
import { ProductListItemContext } from '@spartacus/storefront';

@Component({
  selector: 'cx-product-multi-dimensional-price-range',
  templateUrl: './product-multi-dimensional-price-range.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductMultiDimensionalPriceRangeComponent {
  productListItemContext?: ProductListItemContext = inject(
    ProductListItemContext
  );
  readonly product$: Observable<Product> =
    this.productListItemContext?.product$ ?? EMPTY;

  getProductPrice(product: Product) {
    const priceRange = product.priceRange;
    const isMultiDimensionalAndHasPriceRange =
      product.multidimensional && Object.values(priceRange).length;

    if (isMultiDimensionalAndHasPriceRange) {
      const maxPrice = priceRange.maxPrice.formattedValue;
      const minPrice = priceRange.minPrice.formattedValue;
      return minPrice + ' - ' + maxPrice;
    }

    return product.price?.formattedValue ?? 0;
  }
}
