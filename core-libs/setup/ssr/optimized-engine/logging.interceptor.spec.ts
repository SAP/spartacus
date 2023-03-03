/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { SSR_LOG_BEFORE_TIMEOUT, SSR_REQUEST_LOGGING } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { LoggingInterceptor } from './logging.interceptor';

class MockRequestLoggingService {
  log(): void {}
}

const headersSent$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
  true
);
const mockResponse: any = {
  headersSent: headersSent$.value,
};

const logBeforeTimeout$: BehaviorSubject<boolean> =
  new BehaviorSubject<boolean>(true);

describe('LoggingInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let loggingService: MockRequestLoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoggingInterceptor,
          multi: true,
        },
        {
          provide: SSR_REQUEST_LOGGING,
          useClass: MockRequestLoggingService,
        },
        {
          provide: SSR_LOG_BEFORE_TIMEOUT,
          useValue: logBeforeTimeout$.value,
        },
        { provide: RESPONSE, useValue: mockResponse },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    loggingService = TestBed.inject(SSR_REQUEST_LOGGING);
  });

  it(`Should log after ssr timeout`, async () => {
    http.get('/occ').subscribe(() => {
      expect(loggingService.log).toHaveBeenCalledWith(
        '/occ FINISHED AFTER TIMEOUT'
      );
    });

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === '/occ';
    });

    mockReq.flush('somedata');
  });

  it(`Should log before ssr timeout`, async () => {
    headersSent$.next(false);
    http.get('/occ').subscribe(() => {
      expect(loggingService.log).toHaveBeenCalledWith(
        '/occ FINISHED BEFORE TIMEOUT'
      );
    });

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === '/occ';
    });

    mockReq.flush('somedata');
  });

  it(`Should not log before ssr timeout if SSR_LOG_BEFORE_TIMEOUT is false `, async () => {
    headersSent$.next(false);
    logBeforeTimeout$.next(false);

    http.get('/occ').subscribe(() => {
      expect(loggingService.log).not.toHaveBeenCalledWith(
        '/occ FINISHED BEFORE TIMEOUT'
      );
    });

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === '/occ';
    });

    mockReq.flush('somedata');
  });
});
