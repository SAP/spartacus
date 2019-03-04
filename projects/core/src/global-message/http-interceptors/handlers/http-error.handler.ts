import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { GlobalMessageService } from '../../facade/global-message.service';

export abstract class HttpErrorHandler {
  constructor(protected globalMessageService: GlobalMessageService) {}

  /**
   * The http response status number which is handled by this handler.
   * Implementations can set the response status number, i.e. 404, so that
   * the handler can be found by the error interceptor.
   */
  abstract responseStatus: number;

  /**
   * Handles the error response for the respose status that is register for the handler
   * @param { HttpRequest<any> } request : http request
   * @param { HttpErrorResponse } errorResponse : Http error response
   */
  abstract handleError(
    request: HttpRequest<any>,
    errorResponse: HttpErrorResponse
  ): void;
}
