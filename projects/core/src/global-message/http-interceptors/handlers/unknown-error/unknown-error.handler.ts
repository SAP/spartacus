import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Priority } from '../../../../util/applicable';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { HttpErrorHandler } from '../http-error.handler';

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
  hasMatch(_errorResponse: HttpErrorResponse): boolean {
    return true;
  }

  handleError(_request: HttpRequest<any>, errorResponse: HttpErrorResponse) {
    if (isDevMode() || this.isSsr()) {
      console.warn(`An unknown http error occurred\n`, errorResponse.message);
    }
  }

  /**
   * Fallback priority assures that the handler is used as a last resort
   */
  getPriority() {
    return Priority.FALLBACK;
  }
}
