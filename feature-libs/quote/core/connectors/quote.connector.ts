/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { PaginationModel } from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  Quote,
  QuoteActionType,
  QuoteDiscount,
  QuoteList,
  QuoteMetadata,
  QuoteStarter,
  Comment,
} from '@spartacus/quote/root';
import { QuoteAdapter } from './quote.adapter';

@Injectable()
export class QuoteConnector {
  protected quoteAdapter = inject(QuoteAdapter);

  public getQuotes(
    userId: string,
    pagination: PaginationModel
  ): Observable<QuoteList> {
    return this.quoteAdapter.getQuotes(userId, pagination);
  }

  public createQuote(
    userId: string,
    quoteStarter: QuoteStarter
  ): Observable<Quote> {
    return this.quoteAdapter.createQuote(userId, quoteStarter);
  }

  public getQuote(userId: string, quoteCode: string): Observable<Quote> {
    return this.quoteAdapter.getQuote(userId, quoteCode);
  }

  public editQuote(
    userId: string,
    quoteCode: string,
    quoteMetadata: QuoteMetadata
  ): Observable<unknown> {
    return this.quoteAdapter.editQuote(userId, quoteCode, quoteMetadata);
  }

  public performQuoteAction(
    userId: string,
    quoteCode: string,
    quoteAction: QuoteActionType
  ): Observable<unknown> {
    return this.quoteAdapter.performQuoteAction(userId, quoteCode, quoteAction);
  }

  public addComment(
    userId: string,
    quoteCode: string,
    quoteComment: Comment
  ): Observable<unknown> {
    return this.quoteAdapter.addComment(userId, quoteCode, quoteComment);
  }

  public addDiscount(
    userId: string,
    quoteCode: string,
    discount: QuoteDiscount
  ): Observable<unknown> {
    return this.quoteAdapter.addDiscount(userId, quoteCode, discount);
  }

  public addQuoteEntryComment(
    userId: string,
    quoteCode: string,
    entryNumber: string,
    comment: Comment
  ): Observable<unknown> {
    return this.quoteAdapter.addQuoteEntryComment(
      userId,
      quoteCode,
      entryNumber,
      comment
    );
  }
}
