import { Injectable, isDevMode } from '@angular/core';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { HttpErrorHandler } from '../http-error.handler';
import { Priority } from '../../../../util/handler.js';

@Injectable({
  providedIn: 'root',
})
export class UnknownErrorHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.UNKNOWN;

  hasMatch(_errorResponse): boolean {
    return true;
  }

  handleError() {
    if (isDevMode()) {
      console.warn(`Unknown http response error: ${this.responseStatus}`);
    }
  }

  getPriority() {
    return Priority.FALLBACK;
  }
}
