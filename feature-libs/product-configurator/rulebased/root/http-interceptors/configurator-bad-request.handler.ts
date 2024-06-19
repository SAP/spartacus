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
export class ConfiguratorBadRequestHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.BAD_REQUEST;

  constructor(protected globalMessageService: GlobalMessageService) {
    super(globalMessageService);
  }

  getPriority(): Priority {
    return Priority.NORMAL;
  }

  hasMatch(errorResponse: HttpErrorResponse): boolean {
    return (
      super.hasMatch(errorResponse) &&
      this.isRelatedToProductConfigurator(errorResponse)
    );
  }

  handleError(_request: HttpRequest<any>, response: HttpErrorResponse): void {
    this.getIllegalStateErrorsRelatedToProductConfigurator(response).forEach(
      ({ message }: ErrorModel) => {
        this.handleIllegalArgumentIssues(message as string);
      }
    );
  }

  protected handleIllegalArgumentIssues(message: string): void {
    if (this.isIllegalStateErrorRelatedToMakeToStock(message)) {
      this.globalMessageService.add(
        {
          key: 'configurator.httpHandlers.makeToStockBaseProductIssue',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }
  }

  protected isNotEmpty(errors: ErrorModel[]): boolean {
    return errors?.length > 0;
  }

  protected isIllegalStateErrorRelatedToMakeToStock(message: string): boolean {
    const discountMask = /base product is defined as 'make-to-stock'/;
    return message.match(discountMask) !== null;
  }

  protected isIllegalStateErrorRelatedToProductConfigurator(message?: string) {
    return message && this.isIllegalStateErrorRelatedToMakeToStock(message);
  }

  protected getIllegalStateErrorsRelatedToProductConfigurator(
    response: HttpErrorResponse
  ): ErrorModel[] {
    return (response?.error?.errors ?? [])
      .filter((error: ErrorModel) => error.type === 'IllegalStateError')
      .filter((error: ErrorModel) =>
        this.isIllegalStateErrorRelatedToProductConfigurator(error.message)
      );
  }

  protected isRelatedToProductConfigurator(
    response: HttpErrorResponse
  ): boolean {
    return this.isNotEmpty(
      this.getIllegalStateErrorsRelatedToProductConfigurator(response)
    );
  }
}
