/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ErrorModel,
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorHandler,
  HttpResponseStatus,
  Priority,
} from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class QuoteBadRequestHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.BAD_REQUEST;

  constructor(protected globalMessageService: GlobalMessageService) {
    super(globalMessageService);
  }

  hasMatch(errorResponse: HttpErrorResponse): boolean {
    return (
      super.hasMatch(errorResponse) && this.isRelatedToQuotes(errorResponse)
    );
  }

  handleError(_request: HttpRequest<any>, response: HttpErrorResponse): void {
    if (this.isNotEmpty(this.getQuoteThresholdErrors(response))) {
      this.handleQuoteThresholdErrors();
    }

    this.getIllegalArgumentErrorsRelatedToQuote(response).forEach(
      ({ message }: ErrorModel) => {
        this.handleIllegalArgumentIssues(message as string);
      }
    );

    if (this.isNotEmpty(this.getCartValidationErrors(response))) {
      this.handleCartValidationIssues();
    }

    if (this.isNotEmpty(this.getCartQuoteAccessErrors(response))) {
      this.handleCartQuoteAccessErrors();
    }
  }

  getPriority(): Priority {
    return Priority.NORMAL;
  }

  protected isNotEmpty(errors: ErrorModel[]) {
    return errors.length > 0;
  }

  protected isRelatedToQuotes(response: HttpErrorResponse): boolean {
    const isThresHoldError = this.isNotEmpty(
      this.getQuoteThresholdErrors(response)
    );
    const isCartValidationError = this.isNotEmpty(
      this.getCartValidationErrors(response)
    );
    const isQuoteAccessError = this.isNotEmpty(
      this.getCartQuoteAccessErrors(response)
    );
    const isQuoteIllegalArgumentError = this.isNotEmpty(
      this.getIllegalArgumentErrorsRelatedToQuote(response)
    );
    return (
      isThresHoldError ||
      isCartValidationError ||
      isQuoteAccessError ||
      isQuoteIllegalArgumentError
    );
  }

  protected getQuoteThresholdErrors(response: HttpErrorResponse): ErrorModel[] {
    return (response.error?.errors ?? []).filter(
      (error: ErrorModel) => error.type === 'QuoteUnderThresholdError'
    );
  }

  protected getCartValidationErrors(response: HttpErrorResponse): ErrorModel[] {
    return (response.error?.errors ?? []).filter(
      (error: ErrorModel) => error.type === 'CartValidationError'
    );
  }

  protected getCartQuoteAccessErrors(
    response: HttpErrorResponse
  ): ErrorModel[] {
    return (response.error?.errors ?? []).filter(
      (error: ErrorModel) => error.type === 'CartQuoteAccessError'
    );
  }

  protected getIllegalArgumentErrorsRelatedToQuote(
    response: HttpErrorResponse
  ): ErrorModel[] {
    return (response.error?.errors ?? [])
      .filter((error: ErrorModel) => error.type === 'IllegalArgumentError')
      .filter((error: ErrorModel) =>
        this.isIllegalArgumentErrorRelatedToQuote(error.message)
      );
  }

  protected isIllegalArgumentErrorRelatedToQuote(message?: string) {
    return (
      message &&
      (this.isIllegalArgumentErrorRelatedToQuoteDiscount(message) ||
        this.isIllegalArgumentErrorRelatedToQuoteExpiration(message))
    );
  }

  protected isIllegalArgumentErrorRelatedToQuoteDiscount(
    message: string
  ): boolean {
    const discountMask = /Discount type is absolute/;
    return message.match(discountMask) !== null;
  }

  protected isIllegalArgumentErrorRelatedToQuoteExpiration(
    message: string
  ): boolean {
    const expirationMask = /Invalid quote expiration time/;
    return message.match(expirationMask) !== null;
  }

  protected handleQuoteThresholdErrors() {
    this.globalMessageService.add(
      {
        key: 'quote.httpHandlers.threshold.underThresholdError',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }

  protected handleCartValidationIssues() {
    this.globalMessageService.add(
      {
        key: 'quote.httpHandlers.cartValidationIssue',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }

  protected handleCartQuoteAccessErrors() {
    this.globalMessageService.add(
      {
        key: 'quote.httpHandlers.quoteCartIssue',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }

  protected handleIllegalArgumentIssues(message: string) {
    if (this.isIllegalArgumentErrorRelatedToQuoteDiscount(message)) {
      this.globalMessageService.add(
        {
          key: 'quote.httpHandlers.absoluteDiscountIssue',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }

    if (this.isIllegalArgumentErrorRelatedToQuoteExpiration(message)) {
      this.globalMessageService.add(
        {
          key: 'quote.httpHandlers.expirationDateIssue',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }
  }
}
