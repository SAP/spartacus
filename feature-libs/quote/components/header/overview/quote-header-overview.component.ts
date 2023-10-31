/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject } from '@angular/core';
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
  protected quoteFacade = inject(QuoteFacade);
  protected eventService = inject(EventService);
  protected translationService = inject(TranslationService);
  protected quoteUIConfig = inject(QuoteUIConfig);

  protected static NO_DATA = '-';
  protected static CHARACTERS_LIMIT = 255;
  protected static DEFAULT_CARD_TILE_MAX_CHARS = 100;

  quoteDetails$: Observable<Quote> = this.quoteFacade.getQuoteDetails();
  iconTypes = ICON_TYPE;
  editMode = false;

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
   * Verifies whether the quote is editable and is viewed from a user acting as buyer.
   *
   * @param {Quote} quote - quote
   * @returns {boolean} - if the quote is editable and its state is 'QuoteState.BUYER_DRAFT' or 'QuoteState.BUYER_OFFER', otherwise returns 'false'.
   */
  isQuoteEditableForBuyer(quote: Quote): boolean {
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
      this.translationService.translate('quote.header.overview.information'),
      this.translationService.translate('quote.header.overview.name'),
      this.translationService.translate('quote.header.overview.description'),
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
   * Retrieves the card content that represents the estimated total and expiry date information.
   *
   * @param {Quote} quote - Quote
   * @param {any} expiryDate -  Expiry date
   * @returns {Observable<Card>} - Card content
   */
  getEstimatedTotalAndExpiryDate(
    quote: Quote,
    expiryDate?: string | null
  ): Observable<Card> {
    return combineLatest([
      this.translationService.translate('quote.header.overview.priceAndExpiry'),
      this.translationService.translate(this.getTotalPriceDescription(quote)),
      this.translationService.translate('quote.header.overview.expirationTime'),
    ]).pipe(
      map(([firstTitle, secondTitle, thirdTitle]) => {
        return {
          title: firstTitle,
          paragraphs: [
            {
              title: secondTitle,
              text: [
                this.getTotalPrice(quote) ??
                  QuoteHeaderOverviewComponent.NO_DATA,
              ],
            },
            {
              title: thirdTitle,
              text: [expiryDate ?? QuoteHeaderOverviewComponent.NO_DATA],
            },
          ],
        };
      })
    );
  }

  /**
   * Retrieves the card content that represents the created and last updated dates.
   *
   * @param {string} createdDate - Created date
   * @param {string} lastUpdatedDate - Last updated date
   * @returns {Observable<Card>} - Card content
   */
  getCreatedAndUpdatedDates(
    createdDate?: string | null,
    lastUpdatedDate?: string | null
  ): Observable<Card> {
    return combineLatest([
      this.translationService.translate(
        'quote.header.overview.createdAndUpdated'
      ),
      this.translationService.translate('quote.header.overview.createdDate'),
      this.translationService.translate(
        'quote.header.overview.lastUpdatedDate'
      ),
    ]).pipe(
      map(([firstTitle, secondTitle, thirdTitle]) => {
        return {
          title: firstTitle,
          paragraphs: [
            {
              title: secondTitle,
              text: [createdDate ?? QuoteHeaderOverviewComponent.NO_DATA],
            },
            {
              title: thirdTitle,
              text: [lastUpdatedDate ?? QuoteHeaderOverviewComponent.NO_DATA],
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
      this.quoteUIConfig.quote?.truncateCardTileContentAfterNumChars ??
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
      ? 'quote.header.overview.total'
      : 'quote.header.overview.estimatedTotal';
  }
}
