import { Injectable } from '@angular/core';
import { HttpErrorHandler } from './response.handler';
import { GlobalMessageType } from '../../models/global-message.model';
import { HttpResponseStatus } from '../../models/response-status.model';

@Injectable({
  providedIn: 'root'
})
export class NotFoundHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.NOT_FOUND;

  handleError() {
    this.globalMessageService.add({
      type: GlobalMessageType.MSG_TYPE_ERROR,
      text: 'The requested resource could not be found'
    });
  }
}
