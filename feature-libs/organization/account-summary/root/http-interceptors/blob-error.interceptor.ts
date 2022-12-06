/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
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
import { Injectable } from '@angular/core';
import { FileReaderService } from '@spartacus/storefront';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BlobErrorInterceptor implements HttpInterceptor {
  constructor(private fileReaderService: FileReaderService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((errResponse: any) => {
        if (
          errResponse instanceof HttpErrorResponse &&
          errResponse.error instanceof Blob &&
          errResponse.error.type === 'application/json'
        ) {
          return this.fileReaderService
            .loadTextFile(errResponse.error as File)
            .pipe(
              switchMap((errorString: any) => {
                const error = JSON.parse(errorString);
                return throwError(
                  new HttpErrorResponse({
                    ...errResponse,
                    error,
                    url: errResponse.url ?? undefined,
                  })
                );
              })
            );
        } else {
          return throwError(errResponse);
        }
      })
    );
  }
}
