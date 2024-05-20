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

@Injectable({
  providedIn: 'root',
})
export class RequestedDeliveryDateBadRequestHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.BAD_REQUEST;

  hasMatch(errorResponse: HttpErrorResponse): boolean {
    return (
      super.hasMatch(errorResponse) && this.getErrors(errorResponse)?.length > 0
    );
  }

  handleError(request: HttpRequest<any>, response: HttpErrorResponse) {
    if (request && this.getErrors(response)?.length) {
      this.globalMessageService.add(
        { key: 'requestedDeliveryDate.errorMessage' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }
  }

  protected getErrors(response: HttpErrorResponse): ErrorModel[] {
    return (response.error?.errors).filter(
      (error: any) =>
        error?.type === 'ValidationError' &&
        error?.message === 'checkout.multi.requestedretrievaldatevalid.error'
    );
  }

  getPriority(): Priority {
    return Priority.NORMAL;
  }
}
