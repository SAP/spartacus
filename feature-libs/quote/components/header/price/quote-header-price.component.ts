/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject } from '@angular/core';
import { Price } from '@spartacus/core';
import { QuoteFacade } from '@spartacus/quote/root';

@Component({
  selector: 'cx-quote-header-price',
  templateUrl: 'quote-header-price.component.html',
})
export class QuoteHeaderPriceComponent {
  protected quoteFacade = inject(QuoteFacade);

  quoteDetails$ = this.quoteFacade.getQuoteDetails();

  public hasNonZeroPriceValue(price?: Price): boolean {
    return !!price && !!price.value && price.value > 0;
  }
}
