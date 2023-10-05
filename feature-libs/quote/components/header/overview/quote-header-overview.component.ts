/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { EventService, TranslationService } from '@spartacus/core';
import {
  Quote,
  QuoteAction,
  QuoteActionType,
  QuoteFacade,
  QuoteMetadata,
  QuoteState,
} from '@spartacus/quote/root';
import { Card, ICON_TYPE } from '@spartacus/storefront';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuoteUIConfig } from '../../config/quote-ui.config';
import {
  EditCard,
  SaveEvent,
} from '../buyer-edit/quote-header-buyer-edit.component';

@Component({
  selector: 'cx-quote-header-overview',
  templateUrl: './quote-header-overview.component.html',
})
export class QuoteHeaderOverviewComponent {
  private static NO_DATA = '-';
  private static CHARACTERS_LIMIT = 255;
  private static DEFAULT_CARD_TILE_MAX_CHARS = 100;

  quoteDetails$: Observable<Quote> = this.quoteFacade.getQuoteDetails();
  iconTypes = ICON_TYPE;
  editMode = false;

  constructor(
    protected quoteFacade: QuoteFacade,
    protected eventService: EventService,
    protected translationService: TranslationService,
    protected quoteUiConfig: QuoteUIConfig
  ) {}

  protected defineQuoteMetaData(event: SaveEvent): QuoteMetadata {
    let metaData: QuoteMetadata = {};
    if (Object.getOwnPropertyNames(event).length >= 1) {
      const [name, description] = [event.name, event.description];

      metaData = {
        ...metaData,
        ...(event.name && { name }),
        ...{ description },
      };
    }
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
   * Saves the edited card tile.
   *
   * @param {Quote} quote - Quote
   * @param {SaveEvent} event - edit event
   */
  save(quote: Quote, event: SaveEvent) {
    this.editMode = false;
    const metaData: QuoteMetadata = this.defineQuoteMetaData(event);

    if (Object.getOwnPropertyNames(metaData).length >= 1) {
      this.quoteFacade.editQuote(quote.code, metaData);
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
              text: [name ?? QuoteHeaderOverviewComponent.NO_DATA],
            },
            {
              title: descriptionTitle,
              text: [description ?? QuoteHeaderOverviewComponent.NO_DATA],
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
  getEditQuoteInformation(name: string, description: string): EditCard {
    return {
      name: name,
      description: description,
      charactersLimit: QuoteHeaderOverviewComponent.CHARACTERS_LIMIT,
    };
  }

  /**
   * Retrieves the card content that represents the estimated and date information.
   *
   * @param {Quote} quote - Quote
   * @param {any} createdDate - Created date
   * @returns {Observable<Card>} - Card content
   */
  getEstimatedAndDate(
    quote: Quote,
    createdDate?: string | null
  ): Observable<Card> {
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
              text: [totalPrice ?? QuoteHeaderOverviewComponent.NO_DATA],
            },
            {
              title: thirdTitle,
              text: [createdDate ?? QuoteHeaderOverviewComponent.NO_DATA],
            },
          ],
        };
      })
    );
  }

  /**
   * Retrieves the card content that represents the update information.
   *
   * @param {string} lastUpdated - last updated time
   * @param {string} expirationTime - expiration time
   * @returns {Observable<Card>} - Card content
   */
  getUpdate(
    lastUpdated?: string | null,
    expirationTime?: string | null
  ): Observable<Card> {
    return combineLatest([
      this.translationService.translate('quote.details.update'),
      this.translationService.translate('quote.details.lastUpdated'),
      this.translationService.translate('quote.details.expirationTime'),
    ]).pipe(
      map(([firstTitle, secondTitle, thirdTitle]) => {
        return {
          title: firstTitle,
          paragraphs: [
            {
              title: secondTitle,
              text: [lastUpdated ?? QuoteHeaderOverviewComponent.NO_DATA],
            },
            {
              title: thirdTitle,
              text: [expirationTime ?? QuoteHeaderOverviewComponent.NO_DATA],
            },
          ],
        };
      })
    );
  }

  /**
   * Retrieves a characters limit for a card tile.
   * If the card tile contains more characters, they will be truncated.
   *
   * @returns {number} - characters limit for a card tile
   */
  getCharactersLimitForCardTile(): number {
    return (
      this.quoteUiConfig.quote?.truncateCardTileContentAfterNumChars ??
      QuoteHeaderOverviewComponent.DEFAULT_CARD_TILE_MAX_CHARS
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
