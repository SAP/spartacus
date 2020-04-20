import { Injectable } from '@angular/core';
import { GlobalMessageType } from '../../../models/global-message.model';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { HttpErrorHandler } from '../http-error.handler';

@Injectable({
  providedIn: 'root',
})
export class ForbiddenHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.FORBIDDEN;

  handleError() {
    this.globalMessageService.add(
      { key: 'httpHandlers.forbidden' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }
}
