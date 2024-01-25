/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ErrorModel,
  GlobalMessageType,
  HttpErrorHandler,
  HttpResponseStatus,
  Priority,
} from '@spartacus/core';
import {
  isVoucherError,
  voucherExceededError,
  voucherInvalidError,
} from '../../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class BadVoucherRequestHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.BAD_REQUEST;

  getPriority(): Priority {
    return Priority.NORMAL;
  }

  hasMatch(errorResponse: HttpErrorResponse): boolean {
    return (
      super.hasMatch(errorResponse) &&
      this.getErrors(errorResponse).some(isVoucherError)
    );
  }

  handleError(request: HttpRequest<any>, response: HttpErrorResponse): void {
    this.handleVoucherExceededError(request, response);
    this.handleVoucherInvalidError(request, response);
  }

  protected handleVoucherExceededError(
    _request: HttpRequest<any>,
    response: HttpErrorResponse
  ): void {
    this.getErrors(response)
      .filter((e) => voucherExceededError(e))
      .forEach(() => {
        this.globalMessageService.add(
          { key: 'httpHandlers.voucherExceeded' },
          GlobalMessageType.MSG_TYPE_ERROR
        );
      });
  }

  protected handleVoucherInvalidError(
    _request: HttpRequest<any>,
    response: HttpErrorResponse
  ): void {
    this.getErrors(response)
      .filter((e) => voucherInvalidError(e))
      .forEach(() => {
        this.globalMessageService.add(
          { key: 'httpHandlers.invalidCodeProvided' },
          GlobalMessageType.MSG_TYPE_ERROR
        );
      });
  }

  protected getErrors(response: HttpErrorResponse): ErrorModel[] {
    return (response.error?.errors || []).filter(
      (error: ErrorModel) => error.type !== 'JaloObjectNoLongerValidError'
    );
  }
}
