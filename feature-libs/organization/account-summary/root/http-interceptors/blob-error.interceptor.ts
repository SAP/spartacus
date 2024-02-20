/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { FileReaderService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BlobErrorInterceptor implements HttpInterceptor {
  protected readonly fileReaderService = inject(FileReaderService);
  protected readonly windowRef = inject(WindowRef);

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((errResponse: any) => {
        if (
          this.windowRef.isBrowser() &&
          errResponse instanceof HttpErrorResponse &&
          errResponse.error instanceof Blob &&
          errResponse.error.type === 'application/json'
        ) {
          return this.fileReaderService
            .loadTextFile(errResponse.error as File)
            .pipe(
              switchMap((errorString: any) => {
                const error = JSON.parse(errorString);
                throw new HttpErrorResponse({
                  ...errResponse,
                  error,
                  url: errResponse.url ?? undefined,
                });
              })
            );
        } else {
          throw errResponse;
        }
      })
    );
  }
}
