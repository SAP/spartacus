import { Injectable } from '@angular/core';
import { HttpErrorHandler } from './response.handler';
import { GlobalMessageType } from '../../models/global-message.model';
import { HttpResponseStatus } from '../../models/response-status.model';

@Injectable({
  providedIn: 'root'
})
export class UnknownErrorHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.UNKNOWN;

  handleError() {
    this.globalMessageService.add({
      type: GlobalMessageType.MSG_TYPE_ERROR,
      text: 'An unknown error occured'
    });
  }
}
