/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
import { Product, useFeatureStyles } from '@spartacus/core';
import {
  ProductListItemContext,
  ProductListItemContextSource,
} from '@spartacus/storefront';

@Component({
  selector: '[cx-wish-list-item], cx-wish-list-item',
  templateUrl: './wish-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ProductListItemContextSource,
    {
      provide: ProductListItemContext,
      useExisting: ProductListItemContextSource,
    },
  ],
})
export class WishListItemComponent implements OnChanges {
  @Input()
  isLoading = false;
  @Input() cartEntry: OrderEntry;

  @Output()
  remove = new EventEmitter<OrderEntry>();

  constructor(
    protected productListItemContextSource: ProductListItemContextSource
  ) {
    useFeatureStyles('a11yCartItemsLinksStyles');
  }

  ngOnChanges(changes?: SimpleChanges): void {
    if (changes?.cartEntry) {
      this.productListItemContextSource.product$.next(
        this.cartEntry.product as Product
      );
    }
  }

  removeEntry(item: OrderEntry) {
    this.remove.emit(item);
  }
}
