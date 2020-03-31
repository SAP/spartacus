import { Injectable } from '@angular/core';
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
}
