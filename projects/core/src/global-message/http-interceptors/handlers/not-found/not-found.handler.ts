import { Injectable } from '@angular/core';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { HttpErrorHandler } from '../http-error.handler';
import { Priority } from '../../../../util/applicable';

@Injectable({
  providedIn: 'root',
})
export class NotFoundHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.NOT_FOUND;

  // empty error handler to avoid we fallabck to the unknown error handler
  handleError(): void {}

  getPriority() {
    return Priority.LOW;
  }
}
