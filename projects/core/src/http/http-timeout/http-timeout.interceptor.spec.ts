import {
  HttpClient,
  HttpContext,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { OccConfig } from '../../occ/config/occ-config';
import { WindowRef } from '../../window/window-ref';
import { HTTP_TIMEOUT_CONFIG } from './http-timeout.config';
import { HttpTimeoutInterceptor } from './http-timeout.interceptor';

const testUrl = '/test';
const BROWSER_TIMEOUT = 1_000;
const SERVER_TIMEOUT = 2_000;

@Injectable({ providedIn: 'root' })
class TestDelayInterceptor implements HttpInterceptor {
  delay = 0;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.delay === 0) {
      return next.handle(request);
    }
    return next.handle(request).pipe(delay(this.delay));
  }
}

fdescribe('HttpTimeoutInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let windowRef: WindowRef;
  let config: OccConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useExisting: HttpTimeoutInterceptor,
          multi: true,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useExisting: TestDelayInterceptor,
          multi: true,
        },
        {
          provide: OccConfig,
          useValue: {
            backend: {
              timeout: {
                browser: BROWSER_TIMEOUT,
                server: SERVER_TIMEOUT,
              },
            },
          },
        },
        { provide: WindowRef, useValue: { isBrowser: () => {} } },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    windowRef = TestBed.inject(WindowRef);
    config = TestBed.inject(OccConfig);
  });

  afterEach(fakeAsync(() => {
    httpMock.verify();
    flush();
  }));

  describe('in platform browser', () => {
    beforeEach(() => {
      spyOn(windowRef, 'isBrowser').and.returnValue(true);
    });

    it('should use the global timeout config for browser', fakeAsync(() => {
      let error;
      httpClient.get(testUrl).subscribe({ error: (e) => (error = e) });
      const request = httpMock.expectOne(testUrl);

      request.event({ type: HttpEventType.Sent });

      tick(BROWSER_TIMEOUT - 1);
      expect(request.cancelled).toBe(false);
      expect(error).toBe(undefined);

      tick(1);
      expect(request.cancelled).toBe(true);
      expect(error).not.toBe(undefined);
    }));

    it('should use the local browser timeout config passed via HttpContext token HTTP_TIMEOUT_CONFIG', fakeAsync(() => {
      const context = new HttpContext().set(HTTP_TIMEOUT_CONFIG, {
        browser: 5_000,
        server: 6_000,
      });

      let error;
      httpClient
        .get(testUrl, { context })
        .subscribe({ error: (e) => (error = e) });

      const request = httpMock.expectOne(testUrl);
      request.event({ type: HttpEventType.Sent });

      tick(4_999);
      expect(request.cancelled).toBe(false);
      expect(error).toBe(undefined);

      tick(1);
      expect(error).not.toBe(undefined);
      expect(request.cancelled).toBe(true);
    }));
  });

  describe('in platform server', () => {
    beforeEach(() => {
      spyOn(windowRef, 'isBrowser').and.returnValue(false);
    });

    // SPIKE TODO: repeat the following 2 tests for server:
    // it('should NOT timeout, when request succeeded in expected time', fakeAsync(() => {
    //   // SPIKE TODO
    // }));

    it('should not timeout, when no timeout config is configured at all', fakeAsync(() => {
      config.backend = { timeout: undefined };
      let error;
      httpClient.get(testUrl).subscribe({ error: (e) => (error = e) });

      const request = httpMock.expectOne(testUrl);
      request.event({ type: HttpEventType.Sent });

      tick(10_000);
      expect(request.cancelled).toBe(false);
      expect(error).toBe(undefined);

      request.flush('ok');
    }));

    it('should use the global timeout config for server', fakeAsync(() => {
      let error;
      httpClient.get(testUrl).subscribe({ error: (e) => (error = e) });

      const request = httpMock.expectOne(testUrl);
      request.event({ type: HttpEventType.Sent });

      tick(SERVER_TIMEOUT - 1);
      expect(request.cancelled).toBe(false);
      expect(error).toBe(undefined);

      tick(1);
      expect(request.cancelled).toBe(true);
      expect(error).not.toBe(undefined);
    }));

    it('should use the local server timeout config passed via HttpContext token HTTP_TIMEOUT_CONFIG', fakeAsync(() => {
      const context = new HttpContext().set(HTTP_TIMEOUT_CONFIG, {
        browser: 5_000,
        server: 6_000,
      });

      let error;
      httpClient
        .get(testUrl, { context })
        .subscribe({ error: (e) => (error = e) });

      const request = httpMock.expectOne(testUrl);
      request.event({ type: HttpEventType.Sent });

      tick(5_999);
      expect(request.cancelled).toBe(false);
      expect(error).toBe(undefined);

      tick(1);
      expect(error).not.toBe(undefined);
      expect(request.cancelled).toBe(true);
    }));
  });

  it('should count time for timeout only after the request was sent (but not time spent in other interceptors in the chain) ', fakeAsync(() => {
    TestBed.inject(TestDelayInterceptor).delay = 10_000;
    spyOn(windowRef, 'isBrowser').and.returnValue(true);

    let error;
    httpClient.get(testUrl).subscribe({ error: (e) => (error = e) });

    const request = httpMock.expectOne(testUrl);
    tick(10_000);
    expect(request.cancelled).toBe(false);
    expect(error).toBe(undefined);
    request.event({ type: HttpEventType.Sent });

    tick(999);
    expect(request.cancelled).toBe(false);
    expect(error).toBe(undefined);

    tick(1);
    expect(request.cancelled).toBe(true);
    expect(error).not.toBe(undefined);
  }));
});

it('in case of timeout, it should throw an error of type HttpErrorResponse with http code 504 (Gateway Timeout)', () => {
  // SPIKE TODO
});
