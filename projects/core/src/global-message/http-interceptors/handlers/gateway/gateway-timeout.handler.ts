/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Priority } from '../../../../util/applicable';
import { GlobalMessageType } from '../../../models/global-message.model';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { HttpErrorHandler } from '../http-error.handler';

@Injectable({
  providedIn: 'root',
})
export class GatewayTimeoutHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.GATEWAY_TIMEOUT;

  handleError() {
    this.globalMessageService.add(
      { key: 'httpHandlers.gatewayTimeout' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }

  getPriority(): Priority {
    return Priority.LOW;
  }
}
