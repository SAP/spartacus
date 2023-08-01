/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import {
  Quote,
  QuoteState,
  QuoteAction,
  QuoteActionType,
  QuoteDetailsReloadQueryEvent,
  QuoteMetadata,
  QuoteFacade,
} from '@spartacus/quote/root';
import { EventService, TranslationService } from '@spartacus/core';
import {
  Card,
  FocusConfig,
  ICON_TYPE,
  SaveCardEvent,
} from '@spartacus/storefront';
import { combineLatest, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'cx-quote-details-overview',
  templateUrl: './quote-details-overview.component.html',
})
export class QuoteDetailsOverviewComponent {
  quoteDetails$: Observable<Quote> = this.quoteFacade.getQuoteDetails();
  iconTypes = ICON_TYPE;
  saveMode = false;

  constructor(
    protected quoteFacade: QuoteFacade,
    protected eventService: EventService,
    protected translationService: TranslationService
  ) {}

  focusConfig: FocusConfig = {
    trap: false,
    block: true,
    autofocus: 'input',
    focusOnEscape: false,
  };

  protected defineEmptyQuoteMetaData(): QuoteMetadata {
    return {
      description: undefined,
      expirationTime: undefined,
      name: undefined,
    };
  }

  protected defineQuoteMetaData(saveCardEvent: SaveCardEvent): QuoteMetadata {
    const metaData: QuoteMetadata = this.defineEmptyQuoteMetaData();
    console.log(saveCardEvent);

    const metaDataPropertyNames = Object.getOwnPropertyNames(metaData);
    const saveCardEventPropertyNames =
      Object.getOwnPropertyNames(saveCardEvent);

    metaDataPropertyNames?.forEach((name) => {
      const index = saveCardEventPropertyNames.findIndex((element) =>
        element.includes(name + '_')
      );
      if (index >= 0) {
        const propertyName = saveCardEventPropertyNames[index];
        metaData[name] = saveCardEvent[propertyName];
      }
    });
    return metaData;
  }

  editQuote(quote: Quote, saveCardEvent: SaveCardEvent) {
    this.saveMode = false;
    const metaData = this.defineQuoteMetaData(saveCardEvent);

    this.quoteFacade
      .editQuote(quote.code, metaData)
      .pipe(take(1))
      .subscribe(
        // success
        () => {
          this.eventService.dispatch({}, QuoteDetailsReloadQueryEvent);
        }
      );
  }

  isSaveMode(): boolean {
    return this.saveMode;
  }

  isEditable(quote: Quote): boolean {
    return (
      (quote.state &&
        (quote.state === QuoteState.BUYER_DRAFT ||
          quote.state === QuoteState.SELLER_DRAFT)) ||
      quote.isEditable
    );
  }

  setSaveMode() {
    this.saveMode = !this.saveMode;
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
              isTextArea: true,
              charactersLimit: 550,
            },
          ],
        };
      })
    );
  }

  getEstimatedAndDate(quote: Quote, createdDate?: any): Observable<Card> {
    const totalPrice =
      this.getTotalPrice(quote) ?? this.getTotalPriceDescription(quote);
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
              text: [totalPrice ?? '-'],
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

  /**
   * Returns total price as formatted string
   * @param quote Quote
   * @returns Total price formatted format, null if that is not available
   */
  protected getTotalPrice(quote: Quote): string | null {
    return quote.totalPrice.formattedValue ?? null;
  }

  /**
   * Returns total price description
   * @param quote Quote
   * @returns 'Total' price if quote is in final state, 'Estimated total' otherwise
   */
  protected getTotalPriceDescription(quote: Quote): string {
    const readyToSubmit = quote.allowedActions?.find(
      (action: QuoteAction) => action.type === QuoteActionType.CHECKOUT
    );
    return readyToSubmit
      ? 'quote.details.total'
      : 'quote.details.estimatedTotal';
  }
}
