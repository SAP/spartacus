import { Injectable } from '@angular/core';
import { HttpErrorHandler } from './response.handler';
import { GlobalMessageType } from '../../models/global-message.model';
import { HttpResponseStatus } from '../../models/response-status.model';

@Injectable({
  providedIn: 'root'
})
export class GatewayTimeoutHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.GATEWAY_TIMEOUT;

  handleError() {
    this.globalMessageService.add({
      type: GlobalMessageType.MSG_TYPE_ERROR,
      text: 'The server did not responded, please try again later.'
    });
  }
}
