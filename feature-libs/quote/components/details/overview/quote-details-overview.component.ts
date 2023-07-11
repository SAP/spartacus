/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { QuoteFacade } from '@spartacus/quote/root';
import { TranslationService } from '@spartacus/core';
import { Card } from '@spartacus/storefront';
import { ICON_TYPE } from '@spartacus/storefront';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Quote, QuoteMetadata } from '../../../root/model';

@Component({
  selector: 'cx-quote-details-overview',
  templateUrl: './quote-details-overview.component.html',
})
export class QuoteDetailsOverviewComponent {
  quoteDetails$ = this.quoteFacade.getQuoteDetails();
  iconTypes = ICON_TYPE;
  editMode = false;

  constructor(
    protected quoteFacade: QuoteFacade,
    protected translationService: TranslationService
  ) {}

  editQuote(quote: Quote) {
    const metaData: QuoteMetadata = {
      description: 'Edit',
      name: 'Edit',
    };
    this.quoteFacade.editQuote(quote.code, metaData);
  }

  isEditMode(): boolean {
    return this.editMode;
  }

  setEditMode() {
    this.editMode = !this.editMode;
  }

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
              text: [name ?? '-'],
            },
            {
              title: descriptionTitle,
              text: [description ?? '-'],
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
            {
              title: secondTitle,
              text: [estimatedTotal ?? '-'],
            },
            {
              title: thirdTitle,
              text: [createdDate ?? '-'],
            },
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
            {
              title: secondTitle,
              text: [lastUpdated ?? '-'],
            },
            {
              title: thirdTitle,
              text: [expiryDate ?? '-'],
            },
          ],
        };
      })
    );
  }

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
