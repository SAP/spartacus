/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HttpClient,
  HTTP_INTERCEPTORS,
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

describe('BlobErrorInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;

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
  });

  it(`Should extract JSON from errors wrapped in blob`, (done: DoneFn) => {
    http
      .get('/occ', { responseType: 'blob' as 'json' })
      .pipe(take(1))
      .subscribe({
        error: (err: HttpErrorResponse) => {
          expect(err.status).toEqual(401);
          expect(err.error.errors[0].type).toEqual('InvalidTokenError');
          done();
        },
      });

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === '/occ';
    });

    const errors = { errors: [{ type: 'InvalidTokenError' }] };
    const errorBlob = new Blob([JSON.stringify(errors)], {
      type: 'application/json',
    });

    mockReq.flush(errorBlob, {
      status: 401,
      statusText: 'Unauthorized',
    });
  });
});
