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
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'cx-quote-details-cart',
  templateUrl: './quote-details-cart.component.html',
})
export class QuoteDetailsCartComponent {
  quoteDetails$: Observable<Quote> = this.quoteFacade.getQuoteDetails().pipe(
    filter((state) => !state.loading),
    filter((state) => state.data !== undefined),
    map((state) => state.data),
    map((quote) => quote as Quote)
  );
  iconTypes = ICON_TYPE;
  showCart: boolean = true;
  readonly cartOutlets = CartOutlets;

  constructor(protected quoteFacade: QuoteFacade) {}
}
