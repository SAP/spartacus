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
import { Observable, Observer, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BlobErrorInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((response: any) => {
        if (
          response instanceof HttpErrorResponse &&
          response.error instanceof Blob &&
          response.error.type === 'application/json'
        ) {
          return this.extractJsonFromBlob(response.error).pipe(
            switchMap((error: any) =>
              throwError(
                new HttpErrorResponse({
                  ...response,
                  error,
                  url: response.url ?? undefined,
                })
              )
            )
          );
        }
        return throwError(response);
      })
    );
  }

  /**
   * Take a blob as input and return an Observable containing the extracted json
   */
  protected extractJsonFromBlob(blob: Blob): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const fileReader: FileReader = new FileReader();
      fileReader.readAsText(blob);
      fileReader.onload = () => {
        observer.next(JSON.parse(fileReader.result as string));
        observer.complete();
      };
      fileReader.onerror = (error) => {
        fileReader.abort();
        observer.error(error);
      };
    });
  }
}
