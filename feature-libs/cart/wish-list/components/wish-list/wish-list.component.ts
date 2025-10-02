/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { Cart, OrderEntry } from '@spartacus/cart/base/root';
import { WishListFacade } from '@spartacus/cart/wish-list/root';
import { Observable } from 'rxjs';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { WishListItemComponent } from '../wish-list-item/wish-list-item.component';
import { TranslatePipe } from '../../../../../projects/core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../../projects/core/src/i18n/testing/mock-translate.pipe';

@Component({
    selector: 'cx-wish-list',
    templateUrl: './wish-list.component.html',
    imports: [
        NgIf,
        NgFor,
        WishListItemComponent,
        AsyncPipe,
        TranslatePipe,
        MockTranslatePipe,
    ],
})
export class WishListComponent {
  wishList$: Observable<Cart> = this.wishListFacade.getWishList();
  loading$: Observable<boolean> = this.wishListFacade.getWishListLoading();

  constructor(protected wishListFacade: WishListFacade) {}

  removeEntry(item: OrderEntry) {
    this.wishListFacade.removeEntry(item);
  }
}
