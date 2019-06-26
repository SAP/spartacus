import { Injectable, isDevMode } from '@angular/core';
import { GlobalMessageService } from '../../facade/global-message.service';
import { HttpResponseStatus } from '../../models/response-status.model';
import { HttpErrorHandler } from './http-error.handler';

@Injectable({
  providedIn: 'root',
})
export class UnknownErrorHandler extends HttpErrorHandler {
  constructor(protected globalMessageService: GlobalMessageService) {
    super(globalMessageService);
  }
  responseStatus = HttpResponseStatus.UNKNOWN;

  handleError() {
    if (isDevMode()) {
      console.warn(`Unknown http response error: ${this.responseStatus}`);
    }
  }
}
