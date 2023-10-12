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
  protected adapter = inject(QuoteAdapter);

  public getQuotes(
    userId: string,
    pagination: PaginationModel
  ): Observable<QuoteList> {
    return this.adapter.getQuotes(userId, pagination);
  }

  public createQuote(
    userId: string,
    quoteStarter: QuoteStarter
  ): Observable<Quote> {
    return this.adapter.createQuote(userId, quoteStarter);
  }

  public getQuote(userId: string, quoteCode: string): Observable<Quote> {
    return this.adapter.getQuote(userId, quoteCode);
  }

  public editQuote(
    userId: string,
    quoteCode: string,
    quoteMetadata: QuoteMetadata
  ): Observable<unknown> {
    return this.adapter.editQuote(userId, quoteCode, quoteMetadata);
  }

  public performQuoteAction(
    userId: string,
    quoteCode: string,
    quoteAction: QuoteActionType
  ): Observable<unknown> {
    return this.adapter.performQuoteAction(userId, quoteCode, quoteAction);
  }

  public addComment(
    userId: string,
    quoteCode: string,
    quoteComment: Comment
  ): Observable<unknown> {
    return this.adapter.addComment(userId, quoteCode, quoteComment);
  }

  public addDiscount(
    userId: string,
    quoteCode: string,
    discount: QuoteDiscount
  ): Observable<unknown> {
    return this.adapter.addDiscount(userId, quoteCode, discount);
  }

  public addCartEntryComment(
    userId: string,
    quoteCode: string,
    entryNumber: string,
    comment: Comment
  ): Observable<unknown> {
    return this.adapter.addQuoteEntryComment(
      userId,
      quoteCode,
      entryNumber,
      comment
    );
  }
}
