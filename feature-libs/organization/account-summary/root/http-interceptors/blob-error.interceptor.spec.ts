/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
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

  it(`Should extract json from errors wrapped in blob`, async () => {
    http
      .get('/occ', { responseType: 'blob' as 'json' })
      .pipe(take(1))
      .subscribe(
        () => {},
        (err) => {
          expect(err.status).toEqual(401);
          expect(err.error.errors[0].type).toEqual('InvalidTokenError');
        }
      );

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === '/occ';
    });

    const errors = JSON.stringify({
      errors: [{ type: 'InvalidTokenError' }],
    });
    const error = new Blob([errors], {
      type: 'application/json',
    });

    mockReq.flush(error, {
      status: 401,
      statusText: 'Unauthorized',
    });
  });
});
