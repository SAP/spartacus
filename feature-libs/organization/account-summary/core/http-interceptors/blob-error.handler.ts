/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  GlobalMessageService,
  HttpErrorHandler,
  HttpResponseStatus,
  Priority,
  RoutingService,
} from '@spartacus/core';
import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BlobErrorHandler extends HttpErrorHandler {
  constructor(
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService
  ) {
    super(globalMessageService);
  }

  hasMatch(errResponse: HttpErrorResponse): boolean {
    console.log(
      'error response: ',
      errResponse.error,
      errResponse.error instanceof Blob
    );
    return (
      errResponse.error instanceof Blob &&
      errResponse.error.type === 'application/json'
    );
  }

  handleError(_request: HttpRequest<any>, response: HttpErrorResponse) {
    this.getErrors(response).subscribe((errorResponse) => {
      if (
        errorResponse.status === HttpResponseStatus.UNAUTHORIZED &&
        errorResponse.error?.errors?.[0]?.type === 'InvalidTokenError'
      ) {
        console.log('go to login');
        this.routingService.go({ cxRoute: 'login' });
      }
    });
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

  protected getErrors(
    response: HttpErrorResponse
  ): Observable<HttpErrorResponse> {
    return this.extractJsonFromBlob(response.error).pipe(
      map(
        (error) =>
          new HttpErrorResponse({
            ...response,
            error,
            url: response.url ?? undefined,
          })
      )
    );
  }

  getPriority(): Priority {
    return Priority.NORMAL;
  }
}
