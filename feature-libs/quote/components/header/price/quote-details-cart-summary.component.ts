/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { QuoteFacade } from '@spartacus/quote/root';

@Component({
  selector: 'cx-quote-details-cart-summary',
  templateUrl: 'quote-details-cart-summary.component.html',
})
export class QuoteDetailsCartSummaryComponent {
  readonly cartOutlets = CartOutlets;
  quoteDetails$ = this.quoteFacade.getQuoteDetails();

  constructor(protected quoteFacade: QuoteFacade) {}
}
