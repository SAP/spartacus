/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderEntry } from '@spartacus/cart/base/root';
import { Product, TranslatePipe, UrlPipe } from '@spartacus/core';
import {
  AtMessageDirective,
  InnerComponentsHostDirective,
  MediaComponent,
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
  imports: [
    RouterLink,
    MediaComponent,
    NgIf,
    NgFor,
    InnerComponentsHostDirective,
    AtMessageDirective,
    TranslatePipe,
    UrlPipe,
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
  ) {}

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
