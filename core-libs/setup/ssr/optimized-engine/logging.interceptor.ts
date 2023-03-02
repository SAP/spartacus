/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { SSR_LOG_BEFORE_TIMEOUT, SSR_REQUEST_LOGGING } from '@spartacus/core';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestLoggingService } from './request-logging.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(
    @Optional()
    @Inject(SSR_REQUEST_LOGGING)
    private logger: RequestLoggingService,
    @Optional()
    @Inject(SSR_LOG_BEFORE_TIMEOUT)
    private logBeforeTimeout: boolean,
    @Inject(RESPONSE) private res: Response
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (_event) => {
          if (_event.type === HttpEventType.Response) {
            if (this.res.headersSent) {
              this.logger?.log(request.url + ' FINISHED AFTER TIMEOUT');
            } else {
              if (this.logBeforeTimeout) {
                this.logger?.log(request.url + ' FINISHED BEFORE TIMEOUT');
              }
            }
          }
        },
        (_error) => {
          this.logger?.log(request.url + ' - FAILED');
        }
      )
    );
  }
}
