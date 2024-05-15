/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaginationModel } from '@spartacus/core';
import {
  QuoteComment,
  Quote,
  QuoteActionType,
  QuoteDiscount,
  QuoteList,
  QuoteMetadata,
  QuoteStarter,
} from '@spartacus/quote/root';
import { Observable } from 'rxjs';

export abstract class QuoteAdapter {
  /**
   * Fetches a list of quotes.
   *
   * @param userId - Quote user
   * @param pagination - Pagination options
   * @returns Observable emitting a quote list
   */
  abstract getQuotes(
    userId: string,
    pagination: PaginationModel
  ): Observable<QuoteList>;

  /**
   * Creates a quote.
   *
   * @param userId - Quote user
   * @param quoteStarter - Attributes needed to create a quote
   * @returns Observable emitting a quote
   */
  abstract createQuote(
    userId: string,
    quoteStarter: QuoteStarter
  ): Observable<Quote>;

  /**
   * Fetches a quote specified by its ID (aka code).
   *
   * @param userId - Quote user
   * @param quoteCode - Quote code
   * @returns Observable emitting a quote
   */
  abstract getQuote(userId: string, quoteCode: string): Observable<Quote>;

  /**
   * Edits a quote in its main header aspects (name, description and expiry date).
   *
   * @param userId - Quote user
   * @param quoteCode - Quote code, identifies a quote uniquely for a given user role
   * @param quoteMetadata - Attributes that are going to be changed
   * @returns Observable emitting unknown
   */
  abstract editQuote(
    userId: string,
    quoteCode: string,
    quoteMetadata: QuoteMetadata
  ): Observable<unknown>;

  /**
   * Triggers an action on a quote identified by its code.
   *
   * @param userId - Quote user
   * @param quoteCode - Quote code, identifies a quote uniquely for a given user role
   * @param quoteAction - Quote action
   * @returns Observable emitting unknown
   */
  abstract performQuoteAction(
    userId: string,
    quoteCode: string,
    quoteAction: QuoteActionType
  ): Observable<unknown>;

  /**
   * Adds a header comment to a quote.
   *
   * @param userId - Quote user
   * @param quoteCode - Quote code
   * @param quoteComment - Quote comment
   * @returns Observable emitting unknown
   */
  abstract addComment(
    userId: string,
    quoteCode: string,
    quoteComment: QuoteComment
  ): Observable<unknown>;

  /**
   * Adds a discount to a quote. A previous discount will be overwritten.
   *
   * @param userId - Quote user
   * @param quoteCode - Quote code
   * @param discount - Quote discount
   * @returns Observable emitting unknown
   */
  abstract addDiscount(
    userId: string,
    quoteCode: string,
    discount: QuoteDiscount
  ): Observable<unknown>;

  /**
   * Adds an entry comment to a quote.
   *
   * @param userId - Quote user
   * @param quoteCode - Quote code
   * @param entryNumber - Quote entry number
   * @param comment - Quote comment
   * @returns Observable emitting unknown
   */
  abstract addQuoteEntryComment(
    userId: string,
    quoteCode: string,
    entryNumber: string,
    comment: QuoteComment
  ): Observable<unknown>;

  /**
   * Downloads the proposal document associated with a quote.
   *
   * @param userId - Quote user
   * @param quoteCode - Quote code
   * @param attachmentId - Attachment ID
   * @returns Observable emitting a Blob response
   */
  abstract downloadAttachment(
    userId: string,
    quoteCode: string,
    attachmentId: string
  ): Observable<Blob>;
}
