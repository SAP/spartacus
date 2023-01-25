/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  ErrorModel,
  GlobalMessageType,
  HttpErrorHandler,
  HttpResponseStatus,
  Priority,
  RoutingService,
  GlobalMessageService,
} from '@spartacus/core';
import { isTicketNotFoundError } from '../../utils/utils';
@Injectable({
  providedIn: 'root',
})
export class BadTicketRequestHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.NOT_FOUND;

  constructor(
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService,
    @Inject(PLATFORM_ID) protected platformId?: Object
  ) {
    super(globalMessageService, platformId);
  }

  getPriority(): Priority {
    return Priority.NORMAL;
  }

  hasMatch(errorResponse: HttpErrorResponse): boolean {
    return (
      super.hasMatch(errorResponse) &&
      this.getErrors(errorResponse).some(isTicketNotFoundError)
    );
  }

  handleError(request: HttpRequest<any>, response: HttpErrorResponse): void {
    this.handleTicketNotFoundError(request, response);
  }

  protected handleTicketNotFoundError(
    _request: HttpRequest<any>,
    response: HttpErrorResponse
  ): void {
    this.getErrors(response)
      .filter((e) => isTicketNotFoundError(e))
      .forEach(() => {
        this.routingService.go({ cxRoute: 'supportTickets' });
        this.globalMessageService.add(
          { key: 'httpHandlers.ticketNotFound' },
          GlobalMessageType.MSG_TYPE_ERROR
        );
      });
  }

  protected getErrors(response: HttpErrorResponse): [ErrorModel,RoutingService][] {
    return response.error?.errors.map((e:ErrorModel) => [e, this.routingService] as const) || [];
  }
}
