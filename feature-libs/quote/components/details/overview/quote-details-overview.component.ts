/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { Quote, QuoteActionType, QuoteFacade } from '@spartacus/quote/root';
import { TranslationService } from '@spartacus/core';
import { Card } from '@spartacus/storefront';
import { combineLatest, Observable } from 'rxjs';
import { ICON_TYPE } from '@spartacus/storefront';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-quote-details-overview',
  templateUrl: './quote-details-overview.component.html',
})
export class QuoteDetailsOverviewComponent {
  quoteDetails$ = this.quoteFacade.getQuoteDetailsQueryState();
  iconTypes = ICON_TYPE;
  //TODO switch to Quote instead of QueryState<Quote>
  //quoteDetails$: Observable<Quote> = this.quoteFacade.getQuoteDetails();

  constructor(
    protected quoteFacade: QuoteFacade,
    protected translationService: TranslationService
  ) {}

  getQuoteInformation(name?: string, description?: string): Observable<Card> {
    return combineLatest([
      this.translationService.translate('quote.details.information'),
      this.translationService.translate('quote.details.name'),
      this.translationService.translate('quote.details.description'),
    ]).pipe(
      map(([infoTitle, nameTitle, descriptionTitle]) => {
        return {
          title: infoTitle,
          paragraphs: [
            {
              title: nameTitle,
              text: [{ title: name ?? '-', img: this.iconTypes.PENCIL }],
            },
            {
              title: descriptionTitle,
              text: [{ title: description ?? '-', img: this.iconTypes.PENCIL }],
            },
          ],
        };
      })
    );
  }

  getEstimatedAndDate(
    estimatedTotal?: string,
    createdDate?: string
  ): Observable<Card> {
    return combineLatest([
      this.translationService.translate('quote.details.estimateAndDate'),
      this.translationService.translate('quote.details.estimatedTotal'),
      this.translationService.translate('quote.details.created'),
    ]).pipe(
      map(([firstTitle, secondTitle, thirdTitle]) => {
        return {
          title: firstTitle,
          paragraphs: [
            { title: secondTitle, text: [{ title: estimatedTotal ?? '-' }] },
            { title: thirdTitle, text: [{ title: createdDate ?? '-' }] },
          ],
        };
      })
    );
  }

  getUpdate(lastUpdated?: any, expiryDate?: any): Observable<Card> {
    return combineLatest([
      this.translationService.translate('quote.details.update'),
      this.translationService.translate('quote.details.lastUpdated'),
      this.translationService.translate('quote.details.expiryDate'),
    ]).pipe(
      map(([firstTitle, secondTitle, thirdTitle]) => {
        return {
          title: firstTitle,
          paragraphs: [
            { title: secondTitle, text: [{ title: lastUpdated ?? '-' }] },
            { title: thirdTitle, text: [{ title: expiryDate ?? '-' }] },
          ],
        };
      })
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
