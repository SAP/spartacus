import { vi } from 'vitest';
import {
  HttpClient,
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ErrorHandler, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  AuthService,
  ErrorModel,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UnifiedInjector } from '../../lazy-loading/unified-injector';
import { HttpResponseStatus } from '../models/response-status.model';
import {
  BadGatewayHandler,
  BadRequestHandler,
  ConflictHandler,
  ForbiddenHandler,
  GatewayTimeoutHandler,
  HttpErrorHandler,
  NotFoundHandler,
  UnknownErrorHandler,
} from './handlers';
import { HttpErrorInterceptor } from './http-error.interceptor';

@Injectable()
class MockGlobalMessageService {
  add = vi.fn();
  remove = vi.fn();
}

@Injectable()
class MockAuthService {
  logout() {}
}

describe('HttpErrorInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: AuthService, useClass: MockAuthService },
        UnknownErrorHandler,
        BadGatewayHandler,
        BadRequestHandler,
        ConflictHandler,
        ForbiddenHandler,
        GatewayTimeoutHandler,
        NotFoundHandler,
        {
          provide: UnifiedInjector,
          useFactory: (
            unknownHandler: UnknownErrorHandler,
            badGatewayHandler: BadGatewayHandler,
            badRequestHandler: BadRequestHandler,
            conflictHandler: ConflictHandler,
            forbiddenHandler: ForbiddenHandler,
            gatewayTimeoutHandler: GatewayTimeoutHandler,
            notFoundHandler: NotFoundHandler
          ) => ({
            getMulti: (_token: any) =>
              of([
                unknownHandler,
                badGatewayHandler,
                badRequestHandler,
                conflictHandler,
                forbiddenHandler,
                gatewayTimeoutHandler,
                notFoundHandler,
              ]),
          }),
          deps: [
            UnknownErrorHandler,
            BadGatewayHandler,
            BadRequestHandler,
            ConflictHandler,
            ForbiddenHandler,
            GatewayTimeoutHandler,
            NotFoundHandler,
          ],
        },
        {
          provide: HTTP_INTERCEPTORS,
          useFactory: (unifiedInjector: UnifiedInjector) =>
            new HttpErrorInterceptor(unifiedInjector),
          deps: [UnifiedInjector],
          multi: true,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
  });

  describe('Error Handlers', () => {
    function testHandlers(handlerClass, responseStatus) {
      it('should call handleError for ' + handlerClass.name, () => {
        http
          .get('/123')
          .pipe(catchError((error: any) => throwError(() => error)))
          .subscribe({ error: () => {} });

        const mockReq = httpMock.expectOne((req) => req.method === 'GET');
        const handler = TestBed.inject(handlerClass) as ErrorHandler;
        vi.spyOn(handler, 'handleError');
        mockReq.flush({}, { status: responseStatus, statusText: '' });

        expect(handler.handleError).toHaveBeenCalled();
      });
    }

    testHandlers(UnknownErrorHandler, HttpResponseStatus.UNKNOWN);
    testHandlers(BadGatewayHandler, HttpResponseStatus.BAD_GATEWAY);
    testHandlers(BadRequestHandler, HttpResponseStatus.BAD_REQUEST);
    testHandlers(ConflictHandler, HttpResponseStatus.CONFLICT);
    testHandlers(ForbiddenHandler, HttpResponseStatus.FORBIDDEN);
    testHandlers(GatewayTimeoutHandler, HttpResponseStatus.GATEWAY_TIMEOUT);
    testHandlers(NotFoundHandler, HttpResponseStatus.NOT_FOUND);

    describe('Bad Request for ValidationError', () => {
      it('Adds correct translation key when error type is ValidationError', () => {
        const globalMessageService = TestBed.inject(GlobalMessageService);
        const mockErrors = [
          { type: 'ValidationError', subject: 'subject', reason: 'reason' },
        ];
        const mockResponseBody: { errors: ErrorModel[] } = {
          errors: mockErrors,
        };
        const mockResponseOptions = {
          status: HttpResponseStatus.BAD_REQUEST,
          statusText: '',
        };
        const expectedKey = `httpHandlers.validationErrors.${mockErrors[0].reason}.${mockErrors[0].subject}`;

        http
          .get('/validation-error')
          .pipe(catchError((error: any) => throwError(() => error)))
          .subscribe({ error: () => {} });

        httpMock
          .expectOne('/validation-error')
          .flush(mockResponseBody, mockResponseOptions);

        expect(globalMessageService.add).toHaveBeenCalledWith(
          { key: expectedKey },
          GlobalMessageType.MSG_TYPE_ERROR
        );
      });
    });

    describe('Unknown response warning for non production env', () => {
      it(`should display proper warning message in the console`, () => {
        vi.spyOn(console, 'warn');
        http
          .get('/unknown')
          .pipe(catchError((error: any) => throwError(() => error)))
          .subscribe({ error: () => {} });

        const mockReq = httpMock.expectOne((req) => req.method === 'GET');
        mockReq.flush({}, { status: 123, statusText: 'unknown' });
        // eslint-disable-next-line no-console
        expect(console.warn).toHaveBeenCalledWith(
          `An unknown http error occurred\n`,
          'Http failure response for /unknown: 123 unknown'
        );
      });
    });
  });
});
