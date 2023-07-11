/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { Quote, QuoteActionType, QuoteFacade } from '@spartacus/quote/root';
import { TranslationService } from '@spartacus/core';
import { Card } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-quote-details-overview',
  templateUrl: './quote-details-overview.component.html',
})
export class QuoteDetailsOverviewComponent {
  quoteDetails$: Observable<Quote> = this.quoteFacade.getQuoteDetails();

  constructor(
    protected quoteFacade: QuoteFacade,
    protected translationService: TranslationService
  ) {}

  //TODO: consider to create similar generic function for all cx-card usages
  getCardContent(value: string | null, titleKey: string): Observable<Card> {
    return this.translationService.translate(titleKey).pipe(
      map((title) => ({
        title,
        text: [value ?? '-'],
      }))
    );
  }
  /**
   * Returns total price as formatted string
   * @param quote Quote
   * @returns Total price formatted format, null if that is not available
   */
  getTotalPrice(quote: Quote): string | null {
    return quote.totalPrice.formattedValue ?? null;
  }

  /**
   * Returns total price description
   * @param quote Quote
   * @returns 'Total' price if quote is in final state, 'Estimated total' otherwise
   */
  getTotalPriceDescription(quote: Quote): string {
    const readyToSubmit = quote.allowedActions.find(
      (action) => action.type === QuoteActionType.CHECKOUT
    );
    return readyToSubmit
      ? 'quote.details.total'
      : 'quote.details.estimatedTotal';
  }
}
