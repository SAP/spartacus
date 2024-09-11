/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { QUOTE_FEATURE } from '../feature-name';
import {
  QuoteComment,
  Quote,
  QuoteActionType,
  QuoteDiscount,
  QuoteList,
  QuoteMetadata,
  QuotesStateParams,
} from '../model/quote.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: QuoteFacade,
      feature: QUOTE_FEATURE,
      methods: [
        'getQuotesState',
        'getQuoteDetailsQueryState',
        'getQuoteDetails',
        'createQuote',
        'editQuote',
        'performQuoteAction',
        'addQuoteComment',
        'addDiscount',
      ],
    }),
})
export abstract class QuoteFacade {
  /**
   * Returns the query list state.
   *
   * @param params - QueryStateParams - query state parameters
   * @returns Observable emitting a list of quote states
   */
  abstract getQuotesState(
    params: QuotesStateParams
  ): Observable<QueryState<QuoteList | undefined>>;

  /**
   * Creates quote with name and comment.
   *
   * @param quoteMetadata - quote meta data
   * @returns Observable emitting a quote
   */
  abstract createQuote(quoteMetadata: QuoteMetadata): Observable<Quote>;

  /**
   * Edits quote name, description or expiry date.
   *
   * @param quoteCode - quote code
   * @param quoteMetadata - quote meta data
   */
  abstract editQuote(quoteCode: string, quoteMetadata: QuoteMetadata): void;

  /**
   * Adds a comment to a quote. If an entry number is provided,
   * it will be added as item comment for this entry, otherwise as header comment.
   *
   * @param quoteCode - quote code
   * @param quoteComment - quote comment
   * @param entryNumber - entry number
   * @returns Observable emitting unknown
   */
  abstract addQuoteComment(
    quoteCode: string,
    quoteComment: QuoteComment,
    entryNumber?: string
  ): Observable<unknown>;

  /**
   * Performs action on quote.
   *
   * @param quote - quote
   * @param quoteAction - quote action
   * @returns Observable emitting unknown
   */
  abstract performQuoteAction(
    quote: Quote,
    quoteAction: QuoteActionType
  ): Observable<unknown>;

  /**
   * Re-quotes a quote.
   *
   * @param quoteCode - quote code
   * @returns Observable emitting a quote
   */
  abstract requote(quoteCode: string): Observable<Quote>;

  /**
   * Returns the quote details query state.
   *
   * @returns Observable emitting a query state of quote or unknown
   */
  abstract getQuoteDetailsQueryState(): Observable<
    QueryState<Quote | undefined>
  >;

  /**
   * Returns the quote details once it has been fully loaded.
   *
   * @returns Observable emitting a quote
   */
  abstract getQuoteDetails(): Observable<Quote>;

  /**
   * Adds a discount to a quote.
   *
   * @param quoteCode - Unique quote code
   * @param discount - Discount
   */
  abstract addDiscount(quoteCode: string, discount: QuoteDiscount): void;

  /**
   * Downloads the proposal document associated with a quote.
   *
   * @param quoteCode - Unique quote code
   * @param attachmentId - Unique attachment ID
   */
  abstract downloadAttachment(
    quoteCode: string,
    attachmentId: string
  ): Observable<Blob>;
}
