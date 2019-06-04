import { Injectable } from '@angular/core';
import { GlobalMessageService } from '../../facade/global-message.service';
import { ServerConfig } from '../../../config/server-config/server-config';
import { HttpResponseStatus } from '../../models/response-status.model';
import { HttpErrorHandler } from './http-error.handler';

@Injectable({
  providedIn: 'root',
})
export class UnknownErrorHandler extends HttpErrorHandler {
  constructor(
    private config: ServerConfig,
    protected globalMessageService: GlobalMessageService
  ) {
    super(globalMessageService);
  }
  responseStatus = HttpResponseStatus.UNKNOWN;

  handleError() {
    if (!this.config.production) {
      console.warn(`Unknown http response error: ${this.responseStatus}`);
    }
  }
}
