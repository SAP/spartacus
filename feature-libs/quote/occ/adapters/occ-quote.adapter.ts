/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  QuoteAdapter,
  QUOTE_ACTION_SERIALIZER,
  QUOTE_COMMENT_SERIALIZER,
  QUOTE_DISCOUNT_SERIALIZER,
  QUOTE_LIST_NORMALIZER,
  QUOTE_METADATA_SERIALIZER,
  QUOTE_STARTER_SERIALIZER,
  QUOTE_NORMALIZER,
} from '@spartacus/quote/core';
import {
  Comment,
  OccQuote,
  Quote,
  QuoteActionType,
  QuoteDiscount,
  QuoteList,
  QuoteMetadata,
  QuoteStarter,
} from '@spartacus/quote/root';
import {
  ConverterService,
  normalizeHttpError,
  OccEndpointsService,
  PaginationModel,
} from '@spartacus/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccQuoteAdapter implements QuoteAdapter {
  protected http = inject(HttpClient);
  protected occEndpoints = inject(OccEndpointsService);
  protected converter = inject(ConverterService);

  getQuotes(
    userId: string,
    pagination: PaginationModel
  ): Observable<QuoteList> {
    const params: { [key: string]: string } = {};
    if (pagination.pageSize) {
      params['pageSize'] = pagination.pageSize.toString();
    }
    if (pagination.currentPage) {
      params['currentPage'] = pagination.currentPage.toString();
    }
    if (pagination.sort) {
      params['sort'] = pagination.sort.toString();
    }

    return this.http
      .get<QuoteList>(this.getQuotesEndpoint(userId, params))
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        this.converter.pipeable(QUOTE_LIST_NORMALIZER)
      );
  }

  protected getQuotesEndpoint(
    userId: string,
    params?: PaginationModel
  ): string {
    return this.occEndpoints.buildUrl('getQuotes', {
      urlParams: { userId },
      queryParams: params,
    });
  }

  createQuote(userId: string, quoteStarter: QuoteStarter): Observable<Quote> {
    quoteStarter = this.converter.convert(
      quoteStarter,
      QUOTE_STARTER_SERIALIZER
    );

    return this.http
      .post<OccQuote>(this.getCreateQuoteEndpoint(userId), quoteStarter)
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        this.converter.pipeable(QUOTE_NORMALIZER)
      );
  }

  protected getCreateQuoteEndpoint(userId: string): string {
    return this.occEndpoints.buildUrl('createQuote', {
      urlParams: { userId },
    });
  }

  getQuote(userId: string, quoteCode: string): Observable<Quote> {
    return this.http
      .get<OccQuote>(this.getQuoteEndpoint(userId, quoteCode))
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        this.converter.pipeable(QUOTE_NORMALIZER)
      );
  }

  protected getQuoteEndpoint(userId: string, quoteCode: string): string {
    return this.occEndpoints.buildUrl('getQuote', {
      urlParams: { userId, quoteCode },
    });
  }

  editQuote(
    userId: string,
    quoteCode: string,
    quoteMetadata: QuoteMetadata
  ): Observable<unknown> {
    quoteMetadata = this.converter.convert(
      quoteMetadata,
      QUOTE_METADATA_SERIALIZER
    );

    return this.http
      .patch<Quote>(this.getEditQuoteEndpoint(userId, quoteCode), quoteMetadata)
      .pipe(catchError((error) => throwError(normalizeHttpError(error))));
  }

  protected getEditQuoteEndpoint(userId: string, quoteCode: string): string {
    return this.occEndpoints.buildUrl('editQuote', {
      urlParams: { userId, quoteCode },
    });
  }

  performQuoteAction(
    userId: string,
    quoteCode: string,
    quoteAction: QuoteActionType
  ): Observable<unknown> {
    quoteAction = this.converter.convert(quoteAction, QUOTE_ACTION_SERIALIZER);

    return this.http
      .post<unknown>(this.getPerformQuoteActionEndpoint(userId, quoteCode), {
        action: quoteAction,
      })
      .pipe(catchError((error) => throwError(normalizeHttpError(error))));
  }

  protected getPerformQuoteActionEndpoint(
    userId: string,
    quoteCode: string
  ): string {
    return this.occEndpoints.buildUrl('performQuoteAction', {
      urlParams: { userId, quoteCode },
    });
  }

  addComment(
    userId: string,
    quoteCode: string,
    quoteComment: Comment
  ): Observable<unknown> {
    quoteComment = this.converter.convert(
      quoteComment,
      QUOTE_COMMENT_SERIALIZER
    );

    return this.http
      .post<unknown>(
        this.getAddCommentEndpoint(userId, quoteCode),
        quoteComment
      )
      .pipe(catchError((error) => throwError(normalizeHttpError(error))));
  }

  protected getAddCommentEndpoint(userId: string, quoteCode: string): string {
    return this.occEndpoints.buildUrl('addComment', {
      urlParams: { userId, quoteCode },
    });
  }

  addDiscount(
    userId: string,
    quoteCode: string,
    quoteDiscount: QuoteDiscount
  ): Observable<unknown> {
    quoteDiscount = this.converter.convert(
      quoteDiscount,
      QUOTE_DISCOUNT_SERIALIZER
    );

    return this.http
      .post<unknown>(
        this.getAddDiscountEndpoint(userId, quoteCode),
        quoteDiscount
      )
      .pipe(catchError((error) => throwError(normalizeHttpError(error))));
  }

  protected getAddDiscountEndpoint(userId: string, quoteCode: string): string {
    return this.occEndpoints.buildUrl('addDiscount', {
      urlParams: { userId, quoteCode },
    });
  }

  addCartEntryComment(
    userId: string,
    quoteCode: string,
    entryNumber: string,
    comment: Comment
  ): Observable<unknown> {
    comment = this.converter.convert(comment, QUOTE_COMMENT_SERIALIZER);

    return this.http
      .post<unknown>(
        this.getAddCartEntryCommentEndpoint(userId, quoteCode, entryNumber),
        comment
      )
      .pipe(catchError((error) => throwError(normalizeHttpError(error))));
  }

  protected getAddCartEntryCommentEndpoint(
    userId: string,
    quoteCode: string,
    entryNumber: string
  ): string {
    return this.occEndpoints.buildUrl('addCartEntryComment', {
      urlParams: { userId, quoteCode, entryNumber },
    });
  }
}
