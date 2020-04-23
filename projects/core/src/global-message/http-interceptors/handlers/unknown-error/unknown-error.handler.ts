import { Injectable, isDevMode } from '@angular/core';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { HttpErrorHandler } from '../http-error.handler';
import { Priority } from '../../../../util/applicable';

/**
 * Unknown Error Handler works as an fallback, to handle errors that were
 * not handled by any other error handlers
 */
@Injectable({
  providedIn: 'root',
})
export class UnknownErrorHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.UNKNOWN;

  /**
   * hasMatch always returns true, to mach all errors
   */
  hasMatch(_errorResponse): boolean {
    return true;
  }

  handleError() {
    if (isDevMode()) {
      console.warn(`Unknown http response error: ${this.responseStatus}`);
    }
  }

  /**
   * Fallback priority assures that the handler is used as a last resort
   */
  getPriority() {
    return Priority.FALLBACK;
  }
}
