/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import {
  Quote,
  QuoteAction,
  QuoteActionType,
  QuoteDetailsReloadQueryEvent,
  QuoteMetadata,
  QuoteFacade,
} from '@spartacus/quote/root';
import { EventService, TranslationService } from '@spartacus/core';
import { Card, FocusConfig, ICON_TYPE } from '@spartacus/storefront';
import { combineLatest, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { EditCard, EditEvent } from '../edit';

@Component({
  selector: 'cx-quote-details-overview',
  templateUrl: './quote-details-overview.component.html',
})
export class QuoteDetailsOverviewComponent {
  quoteDetails$: Observable<Quote> = this.quoteFacade.getQuoteDetails();
  iconTypes = ICON_TYPE;
  editMode = false;
  private static NO_DATA = '-';
  private static CHARACTERS_LIMIT = 255;

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

  protected defineQuoteMetaData(event: EditEvent): QuoteMetadata {
    const name = event.name;
    const description = event.description;
    const expirationTime = event.expirationTime;

    let metaData: QuoteMetadata = {};
    metaData = {
      ...metaData,
      ...(event.name && { name }),
      ...(event.description && { description }),
      ...(event.expirationTime && { expirationTime }),
    };

    return metaData;
  }

  editQuote(quote: Quote, event: EditEvent) {
    this.editMode = false;
    const metaData: QuoteMetadata = this.defineQuoteMetaData(event);

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
              text: [name ?? QuoteDetailsOverviewComponent.NO_DATA],
            },
            {
              title: descriptionTitle,
              text: [description ?? QuoteDetailsOverviewComponent.NO_DATA],
            },
          ],
        };
      })
    );
  }

  getEditQuoteInformation(
    name: string,
    description: string
  ): Observable<EditCard> {
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
              text: name,
            },
            {
              title: descriptionTitle,
              text: description,
              isTextArea: true,
              charactersLimit: QuoteDetailsOverviewComponent.CHARACTERS_LIMIT,
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
              text: [totalPrice ?? QuoteDetailsOverviewComponent.NO_DATA],
            },
            {
              title: thirdTitle,
              text: [createdDate ?? QuoteDetailsOverviewComponent.NO_DATA],
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
              text: [lastUpdated ?? QuoteDetailsOverviewComponent.NO_DATA],
            },
            {
              title: thirdTitle,
              text: [expiryDate ?? QuoteDetailsOverviewComponent.NO_DATA],
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
        text: [value ?? QuoteDetailsOverviewComponent.NO_DATA],
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
