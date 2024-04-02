/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import {
  CartItemComponentOptions,
  CartItemContext,
  CartOutlets,
  OrderEntry,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { CartItemContextSource } from './model/cart-item-context-source.model';

@Component({
  selector: 'cx-cart-item',
  templateUrl: './cart-item.component.html',
  providers: [
    CartItemContextSource,
    { provide: CartItemContext, useExisting: CartItemContextSource },
  ],
})
export class CartItemComponent implements OnChanges {
  @Input() compact = false;
  @Input() item: OrderEntry;
  @Input() readonly = false;
  @Input() quantityControl: UntypedFormControl;

  @Input() promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;

  // TODO: evaluate whether this is generic enough
  @Input() options: CartItemComponentOptions = {
    isSaveForLater: false,
    optionalBtn: null,
    displayAddToCart: false,
  };

  iconTypes = ICON_TYPE;
  readonly CartOutlets = CartOutlets;

  constructor(protected cartItemContextSource: CartItemContextSource) {}

  ngOnChanges(changes?: SimpleChanges) {
    if (changes?.compact) {
      this.cartItemContextSource.compact$.next(this.compact);
    }
    if (changes?.readonly) {
      this.cartItemContextSource.readonly$.next(this.readonly);
    }
    if (changes?.item) {
      this.cartItemContextSource.item$.next(this.item);
    }
    if (changes?.quantityControl) {
      this.cartItemContextSource.quantityControl$.next(this.quantityControl);
    }
    if (changes?.promotionLocation) {
      this.cartItemContextSource.location$.next(this.promotionLocation);
    }
    if (changes?.options) {
      this.cartItemContextSource.options$.next(this.options);
    }
  }

  isProductOutOfStock(product: any): boolean {
    // TODO Move stocklevelstatuses across the app to an enum
    return (
      product &&
      product.stock &&
      product.stock.stockLevelStatus === 'outOfStock'
    );
  }

  removeItem() {
    this.quantityControl.setValue(0);
    this.quantityControl.markAsDirty();
  }
}
