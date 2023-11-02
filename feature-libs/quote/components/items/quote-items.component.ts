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
  OrderEntry
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

  onToggleShowOrHideCart(showCart: boolean) {
    this.quoteItemsComponentService.setQuoteEntriesExpanded(!showCart);
  }
}
