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
  QuoteFacade,
  QuoteMetadata,
  QuoteState,
} from '@spartacus/quote/root';
import { EventService, TranslationService } from '@spartacus/core';
import { Card, ICON_TYPE } from '@spartacus/storefront';
import { combineLatest, Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { EditCard, EditEvent } from '../edit/quote-details-edit.component';

@Component({
  selector: 'cx-quote-details-overview',
  templateUrl: './quote-details-overview.component.html',
})
export class QuoteDetailsOverviewComponent {
  private static NO_DATA = '-';
  private static CHARACTERS_LIMIT = 255;

  quoteDetails$: Observable<Quote> = this.quoteFacade.getQuoteDetails();
  iconTypes = ICON_TYPE;
  editMode = false;

  constructor(
    protected quoteFacade: QuoteFacade,
    protected eventService: EventService,
    protected translationService: TranslationService
  ) {}

  protected defineQuoteMetaData(event: EditEvent): QuoteMetadata {
    const [name, description] = [event.name, event.description];

    let metaData: QuoteMetadata = {};
    metaData = {
      ...metaData,
      ...(event.name && { name }),
      ...(event.description && { description }),
    };

    return metaData;
  }

  /**
   * Verifies whether the quote information card tile is editable.
   *
   * @param {Quote} quote - quote
   * @returns {boolean} - if the quote is editable and its state is 'QuoteState.BUYER_DRAFT' or 'QuoteState.BUYER_OFFER', otherwise returns 'false'.
   */
  isQuoteInformationEditable(quote: Quote): boolean {
    return (
      quote.isEditable &&
      (quote.state === QuoteState.BUYER_DRAFT ||
        quote.state === QuoteState.BUYER_OFFER)
    );
  }

  /**
   * Cancels the view of the edit card tile
   * by setting the edit mode to 'false'.
   */
  cancel() {
    this.editMode = false;
  }

  /**
   * Edits the card tile.
   *
   * @param {Quote} quote - Quote
   * @param {EditEvent} event - edit event
   */
  edit(quote: Quote, event: EditEvent) {
    this.editMode = event.editMode;
    const metaData: QuoteMetadata = this.defineQuoteMetaData(event);

    if (Object.keys(metaData).length !== 0) {
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
  }

  /**
   * Toggles the edit mode.
   */
  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  /**
   * Retrieves the card content that represents the quote information with its name and description.
   *
   * @param {string} name - Quote name
   * @param {string} description - Quote description
   * @returns {Observable<Card>} - Card content
   */
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

  /**
   * Retrieves the edit card content that represents the edit quote information with its name and description.
   *
   * @param {string} name - Quote name
   * @param {string} description - Quote description
   * @returns {Observable<EditCard>} - Edit card content
   */
  getEditQuoteInformation(
    name: string,
    description: string
  ): Observable<EditCard> {
    let editCard: EditCard = {
      name: name,
      description: description,
      charactersLimit: QuoteDetailsOverviewComponent.CHARACTERS_LIMIT,
    };
    return of(editCard);
  }

  /**
   * Retrieves the card content that represents the estimated and date information.
   *
   * @param {Quote} quote - Quote
   * @param {any} createdDate - Quote description
   * @returns {Observable<Card>} - Card content
   */
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

  /**
   * Retrieves the card content that represents the update information.
   *
   * @param {any} lastUpdated - Quote
   * @param {any} expiryDate - Quote description
   * @returns {Observable<Card>} - Card content
   */
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

  /**
   * Returns total price as formatted string
   * @param quote Quote
   * @returns Total price formatted format, null if that is not available
   * @protected
   */
  protected getTotalPrice(quote: Quote): string | null {
    return quote.totalPrice.formattedValue ?? null;
  }

  /**
   * Returns total price description
   * @param quote Quote
   * @returns 'Total' price if quote is in final state, 'Estimated total' otherwise
   * @protected
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
