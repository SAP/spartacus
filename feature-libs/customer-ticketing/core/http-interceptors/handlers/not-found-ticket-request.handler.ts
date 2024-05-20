/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
  getLastValueSync,
} from '@spartacus/core';
import { isNotFoundError } from '../../utils/utils';
@Injectable({
  providedIn: 'root',
})
export class NotFoundTicketRequestHandler extends HttpErrorHandler {
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
      this.isCustomerTicketingDetailsRoute() &&
      this.getErrors(errorResponse).some(isNotFoundError)
    );
  }

  handleError(request: HttpRequest<any>, response: HttpErrorResponse): void {
    this.handleTicketNotFoundError(request, response);
  }

  protected isCustomerTicketingDetailsRoute(): boolean {
    return (
      getLastValueSync(this.routingService.getRouterState())?.state
        ?.semanticRoute === 'supportTicketDetails'
    );
  }

  protected handleTicketNotFoundError(
    _request: HttpRequest<any>,
    response: HttpErrorResponse
  ): void {
    this.getErrors(response)
      .filter((e) => isNotFoundError(e))
      .forEach(() => {
        this.routingService.go({ cxRoute: 'supportTickets' });
        this.globalMessageService.add(
          { key: 'customerTicketingDetails.ticketNotFound' },
          GlobalMessageType.MSG_TYPE_ERROR
        );
      });
  }

  protected getErrors(response: HttpErrorResponse): ErrorModel[] {
    return response.error?.errors || [];
  }
}
