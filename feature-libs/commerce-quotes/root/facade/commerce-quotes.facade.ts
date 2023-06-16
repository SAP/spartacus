/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { COMMERCE_QUOTES_FEATURE } from '../feature-name';
import {
  Comment,
  Quote,
  QuoteActionType,
  QuoteList,
  QuoteMetadata,
  QuotesStateParams,
} from '../model/commerce-quotes.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: QuoteFacade,
      feature: COMMERCE_QUOTES_FEATURE,
      methods: [
        'getQuotesState',
        'getQuoteDetails',
        'createQuote',
        'editQuote',
        'performQuoteAction',
        'addQuoteComment',
      ],
    }),
})
export abstract class QuoteFacade {
  /**
   * Returns the query list state.
   * @param params QueryStateParams
   */
  abstract getQuotesState(
    params: QuotesStateParams
  ): Observable<QueryState<QuoteList | undefined>>;

  /**
   * Create quote with name and comment.
   */
  abstract createQuote(
    quoteMetadata: QuoteMetadata,
    quoteComment: Comment
  ): Observable<Quote>;

  /**
   * Edit quote name, description or expiry date.
   */
  abstract editQuote(
    quoteCode: string,
    quoteMetadata: QuoteMetadata
  ): Observable<unknown>;

  /**
   * Add comment to a quote.
   */
  abstract addQuoteComment(
    quoteCode: string,
    quoteComment: Comment
  ): Observable<unknown>;

  /**
   * Perform action on quote.
   */
  abstract performQuoteAction(
    quoteCode: string,
    quoteAction: QuoteActionType
  ): Observable<unknown>;

  /**
   * Re-quote a quote.
   */
  abstract requote(quoteCode: string): Observable<Quote>;

  /**
   * Returns the quote details.
   */
  abstract getQuoteDetails(): Observable<QueryState<Quote | undefined>>;
}
