/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { QuoteFacade } from '@spartacus/quote/root';

@Component({
  selector: 'cx-quote-header-price',
  templateUrl: 'quote-header-price.component.html',
})
export class QuoteHeaderPriceComponent {
  protected quoteFacade = inject(QuoteFacade);

  readonly cartOutlets = CartOutlets;
  quoteDetails$ = this.quoteFacade.getQuoteDetails();
}
