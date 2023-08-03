/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorHandler,
  ErrorModel,
  HttpResponseStatus,
  Priority,
} from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class QuoteBadRequestHandler extends HttpErrorHandler {
  constructor(protected globalMessageService: GlobalMessageService) {
    super(globalMessageService);
  }
  responseStatus = HttpResponseStatus.BAD_REQUEST;

  handleError(_request: HttpRequest<any>, response: HttpErrorResponse): void {
    this.getQuoteThresholdErrors(response).forEach(
      ({ message }: ErrorModel) => {
        this.handleQuoteThresholdErrors(message as string);
      }
    );

    this.getCartValidationErrors(response).forEach(
      (_errorModel: ErrorModel) => {
        //this.handleCartValidationIssues(errorModel.errorCode);
        this.handleCartValidationIssues();
      }
    );
  }

  protected getQuoteThresholdErrors(response: HttpErrorResponse): ErrorModel[] {
    return (response.error?.errors??[]).filter(
      (error: ErrorModel) => error.type === 'QuoteUnderThresholdError'
    );
  }

  protected getCartValidationErrors(response: HttpErrorResponse): ErrorModel[] {
    return (response.error?.errors??[]).filter(
      (error: ErrorModel) => error.type === 'CartValidationError'
    );
  }

  protected handleQuoteThresholdErrors(message: string) {
    const unmetTresholdMask = /does not meet the threshold\./;
    const result = message.match(unmetTresholdMask);

    if (result) {
      this.globalMessageService.add(
        {
          key: 'quote.httpHandlers.threshold.underThresholdError',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }
  }

  protected handleCartValidationIssues() {
    //TODO Better show generic message
    //if ('configurationError' === errorCode) {
    this.globalMessageService.add(
      {
        key: 'quote.httpHandlers.configuratorIssues2',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
    //}
  }

  getPriority(): Priority {
    return Priority.NORMAL;
  }
}
