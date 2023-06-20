/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Config,
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
  constructor(
    protected globalMessageService: GlobalMessageService,
    private config: Config
  ) {
    super(globalMessageService);
  }
  responseStatus = HttpResponseStatus.BAD_REQUEST;

  handleError(_request: HttpRequest<any>, response: HttpErrorResponse): void {
    this.getErrors(response).forEach(({ message }: ErrorModel) => {
      // Handle unknown conflict
      this.handleQuoteThresholdErrors(message as string);
    });
  }

  protected getErrors(response: HttpErrorResponse): ErrorModel[] {
    return (response.error?.errors || []).filter(
      (error: ErrorModel) => error.type === 'QuoteUnderThresholdError'
    );
  }

  protected handleQuoteThresholdErrors(message: string) {
    const unmetTresholdMask = /does not meet the threshold\./;
    const result = message.match(unmetTresholdMask);

    if (result) {
      this.globalMessageService.add(
        {
          key: 'quote.httpHandlers.threshold.underTresholdError',
          params: {
            minValue: this.config.quote?.tresholds?.requestInitiation,
          },
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }
  }

  getPriority(): Priority {
    return Priority.NORMAL;
  }
}
