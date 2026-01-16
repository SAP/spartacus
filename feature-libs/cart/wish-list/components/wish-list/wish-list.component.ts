/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Cart, OrderEntry } from '@spartacus/cart/base/root';
import { WishListFacade } from '@spartacus/cart/wish-list/root';
import { TranslatePipe } from '@spartacus/core';
import { Observable } from 'rxjs';
import { WishListItemComponent } from '../wish-list-item/wish-list-item.component';

@Component({
  selector: 'cx-wish-list',
  templateUrl: './wish-list.component.html',
  imports: [NgIf, NgFor, WishListItemComponent, AsyncPipe, TranslatePipe],
})
export class WishListComponent {
  wishList$: Observable<Cart> = this.wishListFacade.getWishList();
  loading$: Observable<boolean> = this.wishListFacade.getWishListLoading();

  constructor(protected wishListFacade: WishListFacade) {}

  removeEntry(item: OrderEntry) {
    this.wishListFacade.removeEntry(item);
  }
}
