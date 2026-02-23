/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, inject, Input, Optional } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import { TranslatePipe, UrlPipe } from '@spartacus/core';
import {
  AtMessageDirective,
  ItemCounterComponent,
  MediaComponent,
  OutletDirective,
  PromotionsComponent,
} from '@spartacus/storefront';
import { CartItemValidationWarningComponent } from '../../validation/cart-item-warning/cart-item-validation-warning.component';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartItemContextSource } from '../cart-item/model/cart-item-context-source.model';
import { CartItemListComponentService } from './cart-item-list-row.component.service';

@Component({
  selector: '[cx-cart-item-list-row], cx-cart-item-list-row',
  templateUrl: './cart-item-list-row.component.html',
  providers: [
    CartItemContextSource,
    { provide: CartItemContext, useExisting: CartItemContextSource },
  ],
  imports: [
    OutletDirective,
    CartItemValidationWarningComponent,
    NgIf,
    RouterLink,
    MediaComponent,
    PromotionsComponent,
    NgFor,
    ItemCounterComponent,
    NgTemplateOutlet,
    AtMessageDirective,
    TranslatePipe,
    UrlPipe,
  ],
})
export class CartItemListRowComponent extends CartItemComponent {
  @Optional() @Input() items: OrderEntry[];
  protected componentService = inject(CartItemListComponentService);
  isFlagQuote = this.componentService.showBasePriceWithDiscount();
  constructor(cartItemContextSource: CartItemContextSource) {
    super(cartItemContextSource);
  }
}
