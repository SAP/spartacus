import { Injectable } from '@angular/core';
import { HttpErrorHandler } from './response.handler';
import { GlobalMessageType } from '../../models/global-message.model';
import { HttpResponseStatus } from '../../models/response-status.model';

@Injectable({
  providedIn: 'root'
})
export class ForbiddenHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.FORBIDDEN;

  handleError() {
    this.globalMessageService.add({
      type: GlobalMessageType.MSG_TYPE_ERROR,
      text: 'You are not authorized to perform this action.'
    });
  }
}
