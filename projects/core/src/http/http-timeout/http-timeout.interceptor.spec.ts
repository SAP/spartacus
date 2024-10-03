import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpContext,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LoggerService } from '../../logger';
import { OccConfig } from '../../occ/config/occ-config';
import { WindowRef } from '../../window/window-ref';
import { HTTP_TIMEOUT_CONFIG } from './http-timeout.config';
import { HttpTimeoutInterceptor } from './http-timeout.interceptor';

const testUrl = '/test';

const BROWSER_TIMEOUT = 1_000;
const SERVER_TIMEOUT = 2_000;
const CUSTOM_BROWSER_TIMEOUT = 5_000;
const CUSTOM_SERVER_TIMEOUT = 6_000;

const VERY_LONG_TIME = 100_000;

describe('HttpTimeoutInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let windowRef: WindowRef;
  let config: OccConfig;
  let logger: LoggerService;

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
    logger = TestBed.inject(LoggerService);

    spyOn(logger, 'warn');
  });

  afterEach(fakeAsync(() => {
    httpMock.verify();
    flush();
  }));

  describe('in platform browser', () => {
    beforeEach(() => {
      spyOn(windowRef, 'isBrowser').and.returnValue(true);
    });

    it('should NOT timeout, when request succeeded in expected time', fakeAsync(() => {
      let response;
      let error;
      httpClient.get(testUrl).subscribe({
        error: (e) => (error = e),
        next: (r) => (response = r),
      });

      const request = httpMock.expectOne(testUrl);
      request.event({ type: HttpEventType.Sent });

      tick(BROWSER_TIMEOUT - 1);
      request.event(new HttpResponse({ body: 'ok' }));

      expect(error).toBe(undefined);
      expect(response).toBe('ok');
    }));

    it('should NOT timeout, when no timeout config is configured', fakeAsync(() => {
      config.backend = { timeout: undefined };

      let response;
      let error;
      httpClient.get(testUrl).subscribe({
        error: (e) => (error = e),
        next: (r) => (response = r),
      });

      const request = httpMock.expectOne(testUrl);
      request.event({ type: HttpEventType.Sent });

      tick(VERY_LONG_TIME);
      expect(request.cancelled).toBe(false);
      expect(error).toBe(undefined);

      request.event(new HttpResponse({ body: 'ok' }));
      expect(response).toBe('ok');
    }));

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
        browser: CUSTOM_BROWSER_TIMEOUT,
        server: CUSTOM_SERVER_TIMEOUT,
      });

      let error;
      httpClient
        .get(testUrl, { context })
        .subscribe({ error: (e) => (error = e) });

      const request = httpMock.expectOne(testUrl);
      request.event({ type: HttpEventType.Sent });

      tick(CUSTOM_BROWSER_TIMEOUT - 1);
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

    it('should NOT timeout, when request succeeded in expected time', fakeAsync(() => {
      let response;
      let error;
      httpClient.get(testUrl).subscribe({
        error: (e) => (error = e),
        next: (r) => (response = r),
      });

      const request = httpMock.expectOne(testUrl);
      request.event({ type: HttpEventType.Sent });

      tick(SERVER_TIMEOUT - 1);
      request.event(new HttpResponse({ body: 'ok' }));

      expect(error).toBe(undefined);
      expect(response).toBe('ok');
    }));

    it('should not timeout, when no timeout config is configured', fakeAsync(() => {
      config.backend = { timeout: undefined };

      let response;
      let error;
      httpClient.get(testUrl).subscribe({
        error: (e) => (error = e),
        next: (r) => (response = r),
      });

      const request = httpMock.expectOne(testUrl);
      request.event({ type: HttpEventType.Sent });

      tick(VERY_LONG_TIME);
      expect(request.cancelled).toBe(false);
      expect(error).toBe(undefined);

      request.event(new HttpResponse({ body: 'ok' }));
      expect(response).toBe('ok');
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
        browser: CUSTOM_BROWSER_TIMEOUT,
        server: CUSTOM_SERVER_TIMEOUT,
      });

      let error;
      httpClient
        .get(testUrl, { context })
        .subscribe({ error: (e) => (error = e) });

      const request = httpMock.expectOne(testUrl);
      request.event({ type: HttpEventType.Sent });

      tick(CUSTOM_SERVER_TIMEOUT - 1);
      expect(request.cancelled).toBe(false);
      expect(error).toBe(undefined);

      tick(1);
      expect(error).not.toBe(undefined);
      expect(request.cancelled).toBe(true);
    }));
  });

  it('in case of timeout, it should throw HttpErrorResponse with url and Error object', fakeAsync(() => {
    spyOn(windowRef, 'isBrowser').and.returnValue(false);

    let error: any;
    httpClient.get(testUrl).subscribe({ error: (e) => (error = e) });

    const request = httpMock.expectOne(testUrl);
    request.event({ type: HttpEventType.Sent });

    tick(VERY_LONG_TIME);

    expect(error.url).toEqual(testUrl);
    expect(error instanceof HttpErrorResponse).toBe(true);
    expect(error.error instanceof Error).toBe(true);
    expect(error.error.message).toEqual(
      `Request to URL '${testUrl}' exceeded expected time of ${SERVER_TIMEOUT}ms and was aborted.`
    );
  }));

  it('in case of timeout, it should logger.warn', fakeAsync(() => {
    spyOn(windowRef, 'isBrowser').and.returnValue(false);

    httpClient.get(testUrl).subscribe({ error: () => {} });

    const request = httpMock.expectOne(testUrl);
    request.event({ type: HttpEventType.Sent });

    tick(VERY_LONG_TIME);

    expect(logger.warn).toHaveBeenCalledWith(
      `Request to URL '${testUrl}' exceeded expected time of ${SERVER_TIMEOUT}ms and was aborted.`
    );
  }));
});

describe('HttpTimeoutInterceptor used alongside other slow interceptors', () => {
  @Injectable({ providedIn: 'root' })
  class DelayInterceptor implements HttpInterceptor {
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

  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let windowRef: WindowRef;

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
          useExisting: DelayInterceptor,
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
  });

  afterEach(fakeAsync(() => {
    httpMock.verify();
    flush();
  }));

  it('should count time for timeout only after the request was sent (but not time spent in other interceptors in the chain) ', fakeAsync(() => {
    TestBed.inject(DelayInterceptor).delay = VERY_LONG_TIME;
    spyOn(windowRef, 'isBrowser').and.returnValue(false);

    let error;
    httpClient.get(testUrl).subscribe({ error: (e) => (error = e) });

    // very long time passes, but the request is not sent yet
    const request = httpMock.expectOne(testUrl);
    tick(VERY_LONG_TIME);

    expect(request.cancelled).toBe(false);
    expect(error).toBe(undefined);

    request.event({ type: HttpEventType.Sent });

    tick(SERVER_TIMEOUT - 1);
    expect(request.cancelled).toBe(false);
    expect(error).toBe(undefined);

    tick(1);
    expect(request.cancelled).toBe(true);
    expect(error).not.toBe(undefined);
  }));
});
