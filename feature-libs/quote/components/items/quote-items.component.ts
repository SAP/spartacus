/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject } from '@angular/core';
import {
  CartOutlets,
  ActiveCartFacade,
  Cart,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import { Quote, QuoteFacade } from '@spartacus/quote/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { NEVER, Observable, Subscription, of, zip } from 'rxjs';
import { QuoteItemsComponentService } from './quote-items.component.service';
import { switchMap, tap } from 'rxjs/operators';
import { UserIdService } from '@spartacus/core';

@Component({
  selector: 'cx-quote-items',
  templateUrl: './quote-items.component.html',
})
export class QuoteItemsComponent {
  protected quoteFacade = inject(QuoteFacade);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected multiCartFacade = inject(MultiCartFacade);
  protected quoteItemsService = inject(QuoteItemsComponentService);
  protected userIdService = inject(UserIdService);

  quoteDetails$: Observable<Quote> = this.quoteFacade.getQuoteDetails();
  cartReadOnlyDetails$: Observable<Cart> = this.userIdService.takeUserId().pipe(
    switchMap((userId) => zip(this.quoteDetails$, of(userId))),
    tap(([quote, userId]) => {
      if (quote.cartId !== undefined) {
        this.multiCartFacade.loadCart({
          userId,
          cartId: quote.cartId,
          extraData: { active: false },
        });
      }
    }),
    switchMap(([quote, _userId]) => {
      return quote.cartId !== undefined
        ? this.multiCartFacade.getCart(quote.cartId)
        : NEVER;
    })
  );

  cartDetails$: Observable<Cart> = this.activeCartFacade.getActive();
  showCart$ = this.quoteItemsService.getQuoteEntriesExpanded();
  iconTypes = ICON_TYPE;
  readonly cartOutlets = CartOutlets;
  protected subscription: Subscription;

  onToggleShowOrHideCart(showCart: boolean) {
    this.quoteItemsService.setQuoteEntriesExpanded(!showCart);
  }
}

