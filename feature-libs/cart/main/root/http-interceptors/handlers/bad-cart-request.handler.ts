import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ErrorModel,
  GlobalMessageType,
  HttpErrorHandler,
  HttpResponseStatus,
  Priority,
} from '@spartacus/core';
import { isCartNotFoundError } from '../../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class BadCartRequestHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.BAD_REQUEST;

  handleError(request: HttpRequest<any>, response: HttpErrorResponse): void {
    this.handleBadCartRequest(request, response);
  }

  protected handleBadCartRequest(
    _request: HttpRequest<any>,
    response: HttpErrorResponse
  ): void {
    this.getErrors(response)
      .filter((e) => isCartNotFoundError(e))
      .forEach(() => {
        this.globalMessageService.add(
          { key: 'httpHandlers.cartNotFound' },
          GlobalMessageType.MSG_TYPE_ERROR
        );
      });
  }

  protected getErrors(response: HttpErrorResponse): ErrorModel[] {
    return (response.error?.errors || []).filter(
      (error) => error.type !== 'JaloObjectNoLongerValidError'
    );
  }

  getPriority(): Priority {
    return Priority.LOW;
  }
}
