/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Product, I18nModule } from '@spartacus/core';
import { ProductListItemContext, StarRatingModule } from '@spartacus/storefront';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'cx-product-multi-dimensional-list-item-details',
    templateUrl: './product-multi-dimensional-list-item-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        StarRatingModule,
        I18nModule,
        AsyncPipe,
    ],
})
export class ProductMultiDimensionalListItemDetailsComponent {
  productListItemContext?: ProductListItemContext = inject(
    ProductListItemContext
  );
  readonly product$: Observable<Product> =
    this.productListItemContext?.product$ ?? EMPTY;

  getProductPrice(product: Product): string {
    const defaultValue = '0';
    if (!product.multidimensional) {
      return product.price?.formattedValue ?? defaultValue;
    }
    const priceRange = product.priceRange;

    const maxPrice = priceRange?.maxPrice?.formattedValue;
    const minPrice = priceRange?.minPrice?.formattedValue;

    return maxPrice && minPrice ? `${minPrice} - ${maxPrice}` : '';
  }
}
