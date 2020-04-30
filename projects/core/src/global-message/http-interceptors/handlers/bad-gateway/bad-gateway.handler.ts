import { Injectable } from '@angular/core';
import { GlobalMessageType } from '../../../models/global-message.model';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { HttpErrorHandler } from '../http-error.handler';
import { Priority } from '../../../../util/applicable';

@Injectable({
  providedIn: 'root',
})
export class BadGatewayHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.BAD_GATEWAY;

  handleError() {
    this.globalMessageService.add(
      { key: 'httpHandlers.badGateway' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }

  getPriority(): Priority {
    return Priority.LOW;
  }
}
