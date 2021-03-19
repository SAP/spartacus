import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Applicable, Priority } from '../../../util/applicable';
import { GlobalMessageService } from '../../facade/global-message.service';

@Injectable({
  providedIn: 'root',
})
export abstract class HttpErrorHandler implements Applicable {
  constructor(
    protected globalMessageService: GlobalMessageService,
    @Inject(PLATFORM_ID) protected platformId?: Object
  ) {}

  /**
   * The http response status number which is handled by this handler.
   * Implementations can set the response status number, i.e. 404, so that
   * the handler can be found by the error interceptor.
   */
  responseStatus?: number;

  /**
   * Handles the error response for the response status that is register for the handler
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

  /**
   * Returns true when invoked on the server (SSR).
   *
   * Added in 3.2, depends on the injected `platformId`.
   */
  protected isSsr(): boolean {
    if (this.platformId) {
      return !isPlatformBrowser(this.platformId);
    }
    return false;
  }
}
