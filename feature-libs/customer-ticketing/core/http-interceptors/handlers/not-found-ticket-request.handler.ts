/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
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
  protected globalMessageService: GlobalMessageService;
  protected routingService = inject(RoutingService);
  protected platformId?: Object;

  responseStatus = HttpResponseStatus.NOT_FOUND;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const globalMessageService = inject(GlobalMessageService);
    const platformId = inject<Object>(PLATFORM_ID);

    super(globalMessageService, platformId);
  
    this.globalMessageService = globalMessageService;
    this.platformId = platformId;
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
