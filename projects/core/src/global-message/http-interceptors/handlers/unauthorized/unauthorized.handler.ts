import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { GlobalMessageService } from '../../../facade/global-message.service';
import { GlobalMessageType } from '../../../models/global-message.model';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { HttpErrorHandler } from './../http-error.handler';
import { Priority } from '../../../../util/applicable';

/**
 * Handles Oauth client errors when a 401 is returned. This is the case for failing
 * authenticaton requests to OCC.
 */
@Injectable({
  providedIn: 'root',
})
export class UnauthorizedErrorHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.UNAUTHORIZED;

  constructor(protected globalMessageService: GlobalMessageService) {
    super(globalMessageService);
  }

  handleError(_request: HttpRequest<any>, response: HttpErrorResponse): void {
    if (isDevMode()) {
      console.warn(
        `There's a problem with the "Oauth client" configuration. You must configure a matching Oauth client in the backend and Spartacus.`
      );
    }

    if (response.error?.error === 'invalid_client') {
      this.globalMessageService.add(
        response.error?.error_description || {
          key: 'httpHandlers.unauthorized.invalid_client',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    } else {
      this.globalMessageService.add(
        { key: 'httpHandlers.unauthorized.common' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }
  }

  getPriority() {
    return Priority.LOW;
  }
}
