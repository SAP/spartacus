import { Injectable } from '@angular/core';
import { HttpErrorHandler } from './http-error.handler';
import { GlobalMessageType } from '../../models/global-message.model';
import { HttpResponseStatus } from '../../models/response-status.model';

@Injectable({
  providedIn: 'root',
})
export class GatewayTimeoutHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.GATEWAY_TIMEOUT;

  handleError() {
    this.globalMessageService.add(
      'The server did not responded, please try again later.',
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }
}
