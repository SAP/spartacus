/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
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
import { QuoteAdapter } from './quote.adapter';

@Injectable()
export class QuoteConnector {
  protected quoteAdapter = inject(QuoteAdapter);

  /**
   * Fetches a list of quotes according to the pagination provided.
   *
   * @param userId - Quote user
   * @param pagination - Pagination attributes
   * @returns Observable emitting a quote list
   */
  getQuotes(
    userId: string,
    pagination: PaginationModel
  ): Observable<QuoteList> {
    return this.quoteAdapter.getQuotes(userId, pagination);
  }

  /**
   * Creates a quote.
   *
   * @param userId - Quote user
   * @param quoteStarter - Attributes needed to create a quote
   * @returns Observable emitting a quote
   */
  createQuote(userId: string, quoteStarter: QuoteStarter): Observable<Quote> {
    return this.quoteAdapter.createQuote(userId, quoteStarter);
  }

  /**
   * Fetches a quote specified by its ID (aka code).
   *
   * @param userId - Quote user
   * @param quoteCode - Quote code
   * @returns Observable emitting a quote
   */
  getQuote(userId: string, quoteCode: string): Observable<Quote> {
    return this.quoteAdapter.getQuote(userId, quoteCode);
  }

  /**
   * Edits a quote in its main header aspects (name, description and expiry date).
   *
   * @param userId - Quote user
   * @param quoteCode - Quote code, identifies a quote uniquely for a given user role
   * @param quoteMetadata - Attributes that are going to be changed
   * @returns Observable emitting unknown
   */
  editQuote(
    userId: string,
    quoteCode: string,
    quoteMetadata: QuoteMetadata
  ): Observable<unknown> {
    return this.quoteAdapter.editQuote(userId, quoteCode, quoteMetadata);
  }

  /**
   * Triggers an action on a quote identified by its code.
   *
   * @param userId - Quote user
   * @param quoteCode - Quote code, identifies a quote for a given user role
   * @param quoteAction - Quote action
   * @returns Observable emitting unknown
   */
  performQuoteAction(
    userId: string,
    quoteCode: string,
    quoteAction: QuoteActionType
  ): Observable<unknown> {
    return this.quoteAdapter.performQuoteAction(userId, quoteCode, quoteAction);
  }

  /**
   * Adds a header comment to a quote.
   *
   * @param userId - Quote user
   * @param quoteCode - Quote code
   * @param quoteComment - Quote comment
   * @returns Observable emitting unknown
   */
  addComment(
    userId: string,
    quoteCode: string,
    quoteComment: QuoteComment
  ): Observable<unknown> {
    return this.quoteAdapter.addComment(userId, quoteCode, quoteComment);
  }

  /**
   * Adds a discount to a quote. A previous discount will be overwritten.
   *
   * @param userId - Quote user
   * @param quoteCode - Quote code
   * @param discount - Quote discount
   * @returns Observable emitting unknown
   */
  addDiscount(
    userId: string,
    quoteCode: string,
    discount: QuoteDiscount
  ): Observable<unknown> {
    return this.quoteAdapter.addDiscount(userId, quoteCode, discount);
  }

  /**
   * Adds an entry comment to a quote.
   *
   * @param userId - Quote user
   * @param quoteCode - Quote code
   * @param entryNumber - Quote entry number
   * @param comment - Quote comment
   * @returns Observable emitting unknown
   */
  addQuoteEntryComment(
    userId: string,
    quoteCode: string,
    entryNumber: string,
    comment: QuoteComment
  ): Observable<unknown> {
    return this.quoteAdapter.addQuoteEntryComment(
      userId,
      quoteCode,
      entryNumber,
      comment
    );
  }

  /**
   * Downloads the proposal document associated with a quote.
   *
   * @param userId - Quote user
   * @param quoteCode - Quote code
   * @param attachmentId - Attachment ID
   * @returns Observable emitting a Blob response
   */
  downloadAttachment(
    userId: string,
    quoteCode: string,
    attachmentId: string
  ): Observable<Blob> {
    return this.quoteAdapter.downloadAttachment(
      userId,
      quoteCode,
      attachmentId
    );
  }
}
