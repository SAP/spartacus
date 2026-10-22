/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  inject,
  Input,
  Optional,
  SimpleChanges,
} from '@angular/core';
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
    RouterLink,
    MediaComponent,
    PromotionsComponent,
    ItemCounterComponent,
    NgTemplateOutlet,
    AtMessageDirective,
    TranslatePipe,
    UrlPipe,
  ],
})
export class CartItemListRowComponent extends CartItemComponent {
  @Optional() @Input() items: OrderEntry[];

  /**
   * Disabled state of the quantity control, passed as an explicit boolean input
   * by the parent list. The quantity control is enabled/disabled imperatively
   * while the cart loads (on the same control instance, with no control event),
   * so this OnPush row cannot observe that via the control object. Receiving it
   * as a changing boolean input triggers `ngOnChanges`, letting the template
   * (e.g. the "Move to cart" optional button) reflect the current state.
   */
  @Input() quantityDisabled = false;

  protected componentService = inject(CartItemListComponentService);
  isFlagQuote = this.componentService.showBasePriceWithDiscount();
  constructor(cartItemContextSource: CartItemContextSource) {
    super(cartItemContextSource);
  }

  override ngOnChanges(changes?: SimpleChanges): void {
    super.ngOnChanges(changes);
    // When the quantity control's disabled state flips (cart loading), re-push
    // the control to the item context so outlet-rendered children (e.g. the
    // configurator "Edit configuration" link) re-read its `disabled` state.
    if (changes?.quantityDisabled && this.quantityControl) {
      this.cartItemContextSource.quantityControl$.next(this.quantityControl);
    }
  }
}
