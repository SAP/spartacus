/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject } from '@angular/core';
import {
  ActiveCartFacade,
  Cart,
  CartOutlets,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import { UserIdService } from '@spartacus/core';
import { Quote, QuoteFacade } from '@spartacus/quote/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { NEVER, Observable, Subscription, of, zip } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { QuoteItemsComponentService } from './quote-items.component.service';

/**
 * Renders quote items. These items are either taken from the actual quote,
 * or from the attached quote cart.
 * Specifically if the quote is editable, changes to the entries will be
 * done by changing the attached quote cart's entries.
 *
 * Note that the component makes use of outlet CART_ITEM_LIST in order to
 * render the quote entries. The default implementation of this outlet is
 * in feature lib 'cartBase'. This lib is always loaded, because
 * quoteFacade.getQuoteDetails() always triggers activeCartFacade for checking
 * on the quote/cart link.
 */

@Component({
  selector: 'cx-quote-items',
  templateUrl: './quote-items.component.html',
})
export class QuoteItemsComponent {
  protected quoteFacade = inject(QuoteFacade);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected multiCartFacade = inject(MultiCartFacade);
  protected quoteItemsComponentService = inject(QuoteItemsComponentService);
  protected userIdService = inject(UserIdService);

  quoteDetails$: Observable<Quote> = this.quoteFacade.getQuoteDetails();
  quoteCartReadOnly$: Observable<Cart> = this.userIdService.takeUserId().pipe(
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

  activeCart$: Observable<Cart> = this.activeCartFacade.getActive();
  showCart$ = this.quoteItemsComponentService.getQuoteEntriesExpanded();
  iconTypes = ICON_TYPE;
  readonly cartOutlets = CartOutlets;
  protected subscription: Subscription;

  /**
   * Handler to toggle expanded state of quote entries section.
   *
   * @param showCart - current expanded state, will be inverted
   */
  onToggleShowOrHideCart(showCart: boolean) {
    this.quoteItemsComponentService.setQuoteEntriesExpanded(!showCart);
  }
}
