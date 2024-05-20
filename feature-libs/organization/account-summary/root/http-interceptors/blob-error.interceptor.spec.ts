/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FileReaderService } from '@spartacus/storefront';
import { take } from 'rxjs/operators';
import { BlobErrorInterceptor } from './blob-error.interceptor';
import { WindowRef } from '@spartacus/core';

const errors = JSON.stringify({
  errors: [{ type: 'InvalidTokenError' }],
});

const error = new Blob([errors], {
  type: 'application/json',
});

describe('BlobErrorInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let windowRef: WindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FileReaderService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: BlobErrorInterceptor,
          multi: true,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    windowRef = TestBed.inject(WindowRef);
  });

  it(`Should extract json from errors wrapped in blob`, (done) => {
    spyOn(windowRef, 'isBrowser').and.returnValue(true);

    http
      .get('/occ', { responseType: 'blob' as 'json' })
      .pipe(take(1))
      .subscribe({
        error: (err: HttpErrorResponse) => {
          expect(err.status).toEqual(401);
          expect(err.error.errors[0].type).toEqual('InvalidTokenError');
        },
      });

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === '/occ';
    });

    mockReq.flush(error, {
      status: 401,
      statusText: 'Unauthorized',
    });

    expect(windowRef.isBrowser).toHaveBeenCalled();
    done();
  });

  it(`Should extract json from errors wrapped in blob`, (done) => {
    spyOn(windowRef, 'isBrowser').and.returnValue(false);

    http
      .get('/occ', { responseType: 'blob' as 'json' })
      .pipe(take(1))
      .subscribe();

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === '/occ';
    });

    mockReq.flush(error);

    expect(windowRef.isBrowser).not.toHaveBeenCalled();
    done();
  });
});
