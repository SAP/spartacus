/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { Quote, QuoteFacade } from '@spartacus/quote/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuoteDetailsCartComponentService } from './quote-details-cart.component.service';

@Component({
  selector: 'cx-quote-details-cart',
  templateUrl: './quote-details-cart.component.html',
})
export class QuoteDetailsCartComponent {
  quoteDetails$: Observable<Quote> = this.quoteFacade.getQuoteDetails();
  iconTypes = ICON_TYPE;
  readonly cartOutlets = CartOutlets;
  showCart$ = this.quoteDetailsCartService.getQuoteEntriesExpanded();

  // interface ItemListContext
  context$: Observable<any> = this.quoteDetails$.pipe(
    map((quote) => {
      return {
        items: quote.entries,
        readonly: !quote.isEditable,
      };
    })
  );

  constructor(
    protected quoteFacade: QuoteFacade,
    protected quoteDetailsCartService: QuoteDetailsCartComponentService
  ) {}

  onToggleShowOrHideCart(showCart: boolean) {
    this.quoteDetailsCartService.setQuoteEntriesExpanded(!showCart);
  }
}
