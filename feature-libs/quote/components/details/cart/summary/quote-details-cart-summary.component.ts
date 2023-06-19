/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { QuoteFacade } from 'feature-libs/quote/root/public_api';

@Component({
  selector: 'cx-quote-details-cart-summary',
  templateUrl: 'quote-details-cart-summary.component.html',
})
export class QuoteDetailsCartSummaryComponent {
  quoteDetails$ = this.quoteFacade.getQuoteDetails();

  readonly cartOutlets = CartOutlets;

  constructor(protected quoteFacade: QuoteFacade) {}
}
