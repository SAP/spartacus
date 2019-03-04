import { Injectable } from '@angular/core';
import { HttpErrorHandler } from './response.handler';
import { GlobalMessageType } from '../../models/global-message.model';
import { HttpResponseStatus } from '../../models/response-status.model';

@Injectable({
  providedIn: 'root'
})
export class BadGatewayHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.BAD_GATEWAY;

  handleError() {
    this.globalMessageService.add({
      type: GlobalMessageType.MSG_TYPE_ERROR,
      text: 'A server error occurred. Please try again later.'
    });
  }
}
