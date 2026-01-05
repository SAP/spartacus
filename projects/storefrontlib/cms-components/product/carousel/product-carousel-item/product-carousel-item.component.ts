/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Product } from '@spartacus/core';
import {
  ProductListItemContext,
  ProductListItemContextSource,
} from '../../product-list';

@Component({
  selector: 'cx-product-carousel-item',
  templateUrl: './product-carousel-item.component.html',
  providers: [
    ProductListItemContextSource,
    {
      provide: ProductListItemContext,
      useExisting: ProductListItemContextSource,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ProductCarouselItemComponent implements OnChanges {
  /**
   * The product item to be displayed in the carousel.
   */
  @Input() item: Product;

  /**
   * The index of the item in the carousel.
   */
  @Input() itemIndex: number;

  constructor(
    protected productListItemContextSource: ProductListItemContextSource
  ) {}

  ngOnChanges(changes?: SimpleChanges): void {
    if (changes?.item) {
      this.productListItemContextSource.product$.next(this.item);
    }
  }
}
