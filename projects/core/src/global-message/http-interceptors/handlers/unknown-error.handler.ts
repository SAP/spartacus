import { Injectable } from '@angular/core';
import { HttpResponseStatus } from '../../models/response-status.model';
import { HttpErrorHandler } from './http-error.handler';

@Injectable({
  providedIn: 'root',
})
export class UnknownErrorHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.UNKNOWN;

  handleError() {}
}
