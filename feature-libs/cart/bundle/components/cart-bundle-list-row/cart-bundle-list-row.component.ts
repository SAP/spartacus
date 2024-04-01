/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import {
  CartItemComponent,
  CartItemContextSource,
} from '@spartacus/cart/base/components';
import {
  ActiveCartFacade,
  CartItemContext,
  EntryGroup,
} from '@spartacus/cart/base/root';
import { RoutingService } from '@spartacus/core';

@Component({
  selector: '[cx-cart-bundle-list-row], cx-cart-bundle-list-row',
  templateUrl: './cart-bundle-list-row.component.html',
  providers: [
    CartItemContextSource,
    { provide: CartItemContext, useExisting: CartItemContextSource },
  ],
})
export class CartBundleListRowComponent extends CartItemComponent {
  @Input() bundle: EntryGroup;

  constructor(
    protected cartItemContextSource: CartItemContextSource,
    protected activeCartService: ActiveCartFacade,
    protected routingService: RoutingService
  ) {
    super(cartItemContextSource, routingService);
  }

  editBundle() {
    this.routingService.go('cart', {
      queryParams: { edit: this.bundle.entryGroupNumber },
    });
  }

  removeBundle() {
    this.activeCartService.removeEntryGroup(this.bundle.entryGroupNumber);
  }
}
