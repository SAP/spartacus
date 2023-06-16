/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { QuoteFacade } from '@spartacus/commerce-quotes/root';
import { TranslationService } from '@spartacus/core';
import { Card } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-commerce-quotes-details-overview',
  templateUrl: './commerce-quotes-details-overview.component.html',
})
export class CommerceQuotesDetailsOverviewComponent {
  quoteDetails$ = this.commerceQuotesService.getQuoteDetails();

  constructor(
    protected commerceQuotesService: QuoteFacade,
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
}
