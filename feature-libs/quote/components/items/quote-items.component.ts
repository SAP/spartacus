/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject } from '@angular/core';
import { AbstractOrderContextSource } from '@spartacus/cart/base/components';
import {
  AbstractOrderContext,
  AbstractOrderType,
  ActiveCartFacade,
  CartOutlets,
  MultiCartFacade,
  OrderEntry,
} from '@spartacus/cart/base/root';
import { UserIdService } from '@spartacus/core';
import { QuoteFacade } from '@spartacus/quote/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable, Subscription, combineLatest, of, zip } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { QuoteItemsComponentService } from './quote-items.component.service';

interface QuoteItemsData {
  entries: OrderEntry[] | undefined;
  readOnly: boolean;
}
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
  providers: [
    AbstractOrderContextSource,
    { provide: AbstractOrderContext, useExisting: AbstractOrderContextSource },
  ],
})
export class QuoteItemsComponent {
  protected quoteFacade = inject(QuoteFacade);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected multiCartFacade = inject(MultiCartFacade);
  protected quoteItemsComponentService = inject(QuoteItemsComponentService);
  protected userIdService = inject(UserIdService);
  protected abstractOrderContextSource = inject(AbstractOrderContextSource);

  quoteItemsData$: Observable<QuoteItemsData> = this.userIdService
    .takeUserId()
    .pipe(
      switchMap((userId) =>
        combineLatest([this.quoteFacade.getQuoteDetails(), of(userId)])
      ),
      tap(([quote, userId]) => {
        if (quote.cartId && !quote.isEditable) {
          this.multiCartFacade.loadCart({
            userId,
            cartId: quote.cartId,
            extraData: { active: false },
          });
        }
      }),
      switchMap(([quote, _userId]) => {
        if (!quote.cartId) {
          this.abstractOrderContextSource.id$.next(quote.code);
          this.abstractOrderContextSource.type$.next(AbstractOrderType.QUOTE);
          return zip(of(quote), of(true));
        } else if (!quote.isEditable) {
          this.abstractOrderContextSource.id$.next(quote.cartId);
          this.abstractOrderContextSource.type$.next(
            AbstractOrderType.SAVED_CART
          );
          return combineLatest([
            this.multiCartFacade.getCart(quote.cartId),
            of(true),
          ]);
        } else {
          this.abstractOrderContextSource.id$.next(quote.cartId);
          this.abstractOrderContextSource.type$.next(AbstractOrderType.CART);
          return combineLatest([this.activeCartFacade.getActive(), of(false)]);
        }
      }),
      filter(([abstractOrder, _readOnly]) => abstractOrder !== undefined),
      map(([abstractOrder, readOnly]) => {
        return { entries: abstractOrder.entries, readOnly: readOnly };
      })
    );

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
