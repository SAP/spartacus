/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject } from '@angular/core';
import {
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
  abstractOrderType: AbstractOrderType;
  abstractOrderId?: string;
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
})
export class QuoteItemsComponent {
  protected quoteFacade = inject(QuoteFacade);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected multiCartFacade = inject(MultiCartFacade);
  protected quoteItemsComponentService = inject(QuoteItemsComponentService);
  protected userIdService = inject(UserIdService);

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
          return zip(
            of(quote),
            of({ readOnly: true }),
            of(AbstractOrderType.QUOTE)
          );
        } else if (!quote.isEditable) {
          return combineLatest([
            this.multiCartFacade.getCart(quote.cartId),
            of({ readOnly: true }),
            of(AbstractOrderType.SAVED_CART),
          ]);
        } else {
          return combineLatest([
            this.activeCartFacade.getActive(),
            of({ readOnly: false }),
            of(AbstractOrderType.CART),
          ]);
        }
      }),
      filter(([abstractOrder, _editState]) => abstractOrder !== undefined),
      map(([abstractOrder, editState, abstractOrderType]) => {
        return {
          entries: abstractOrder.entries,
          readOnly: editState.readOnly,
          abstractOrderId: abstractOrder.code,
          abstractOrderType: abstractOrderType,
        };
      })
    );

  showCart$ = this.quoteItemsComponentService.getQuoteEntriesExpanded();
  iconTypes = ICON_TYPE;
  readonly cartOutlets = CartOutlets;
  readonly abstractOrderType = AbstractOrderType;
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
