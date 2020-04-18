import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { GlobalMessageService } from '../../facade/global-message.service';
import { Injectable } from '@angular/core';
import { Handler, Priority } from '../../../util/handler';

@Injectable({
  providedIn: 'root',
})
export abstract class HttpErrorHandler implements Handler {
  constructor(protected globalMessageService: GlobalMessageService) {}

  /**
   * The http response status number which is handled by this handler.
   * Implementations can set the response status number, i.e. 404, so that
   * the handler can be found by the error interceptor.
   */
  responseStatus?: number;

  /**
   * Handles the error response for the respose status that is register for the handler
   * @param { HttpRequest<any> } request : http request
   * @param { HttpErrorResponse } errorResponse : Http error response
   */
  abstract handleError(
    request: HttpRequest<any>,
    errorResponse: HttpErrorResponse
  ): void;

/**
 * Error handlers are matched by the error `responseStatus` (i.e. 404). On top of the matching status 
 * a priority can be added to distinguish multiple handles for the same response status. 
 */
  hasMatch(errorResponse: HttpErrorResponse): boolean {
    return errorResponse.status === this.responseStatus;
  }

  abstract getPriority?(): Priority;
}
