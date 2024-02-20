/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  AbstractOrderType,
  ActiveCartFacade,
  Cart,
  MultiCartFacade,
  OrderEntry,
} from '@spartacus/cart/base/root';
import { UserIdService } from '@spartacus/core';
import { Quote, QuoteFacade } from '@spartacus/quote/root';
import { Observable, ReplaySubject, combineLatest, of, zip } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

export interface QuoteItemsData {
  entries: OrderEntry[] | undefined;
  readOnly: boolean;
  abstractOrderType: AbstractOrderType;
  abstractOrderId?: string;
}

type EditState = {
  readOnly: boolean;
};

type QuoteOrCartWithEditState =
  | Observable<[Quote, EditState, AbstractOrderType]>
  | Observable<[Cart, EditState, AbstractOrderType]>;

@Injectable({
  providedIn: 'root',
})
export class QuoteItemsComponentService {
  protected quoteFacade = inject(QuoteFacade);
  protected userIdService = inject(UserIdService);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected multiCartFacade = inject(MultiCartFacade);
  protected _quoteEntriesExpanded$ = new ReplaySubject<boolean>(1);

  constructor() {
    this._quoteEntriesExpanded$.next(true);
  }
  /**
   * Signals that the quote entry section is expanded.
   *
   * @param expanded Quote entry section expanded?
   */
  setQuoteEntriesExpanded(expanded: boolean): void {
    this._quoteEntriesExpanded$.next(expanded);
  }
  /**
   * Emits expanded state of the quote entries section.
   *
   * @returns Observable of boolean values telling if the quote entry section is expanded
   */
  getQuoteEntriesExpanded(): Observable<boolean> {
    return this._quoteEntriesExpanded$;
  }

  /**
   * Retrieves observable of current quote entries (which can be read from a quote,
   * a saved cart or an active cart, depending on the quote state and its edit status).
   *
   * @returns Observable of quote items data. The return structure also contains information
   * about the type of the hosting document (quote, saved cart or active cart) and its edit status.
   */
  retrieveQuoteEntries(): Observable<QuoteItemsData> {
    return this.userIdService.takeUserId().pipe(
      switchMap((userId) =>
        combineLatest([this.quoteFacade.getQuoteDetails(), of(userId)])
      ),
      tap(([quote, userId]) => {
        this.loadQuoteCartIfNeeded(quote, userId);
      }),
      switchMap(([quote, _userId]) => {
        if (!quote.cartId) {
          return this.prepareQuote(quote);
        } else {
          const quoteCartId: string = quote.cartId;
          if (!quote.isEditable) {
            return this.prepareSavedCart(quoteCartId);
          } else {
            return this.prepareActiveCart();
          }
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
  }

  protected prepareActiveCart(): QuoteOrCartWithEditState {
    return combineLatest([
      this.activeCartFacade.isStable().pipe(
        filter((stable) => stable),
        switchMap(() => this.activeCartFacade.getActive())
      ),
      of({ readOnly: false }),
      of(AbstractOrderType.CART),
    ]);
  }

  protected prepareSavedCart(quoteCartId: string): QuoteOrCartWithEditState {
    return combineLatest([
      this.multiCartFacade.isStable(quoteCartId).pipe(
        filter((stable) => stable),
        switchMap(() => this.multiCartFacade.getCart(quoteCartId))
      ),
      of({ readOnly: true }),
      of(AbstractOrderType.SAVED_CART),
    ]);
  }

  protected prepareQuote(quote: Quote): QuoteOrCartWithEditState {
    return zip(of(quote), of({ readOnly: true }), of(AbstractOrderType.QUOTE));
  }

  protected loadQuoteCartIfNeeded(quote: Quote, userId: string) {
    if (quote.cartId && !quote.isEditable) {
      this.multiCartFacade.loadCart({
        userId,
        cartId: quote.cartId,
        extraData: { active: false },
      });
    }
  }
}
