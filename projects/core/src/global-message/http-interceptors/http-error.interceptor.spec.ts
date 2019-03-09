import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import createSpy = jasmine.createSpy;
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { HttpErrorInterceptor } from './http-error.interceptor';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import {
  HttpErrorHandler,
  UnknownErrorHandler,
  ForbiddenHandler,
  BadGatewayHandler,
  BadRequestHandler,
  ConflictHandler,
  GatewayTimeoutHandler,
  NotFoundHandler
} from './handlers';
import { HttpResponseStatus } from '../models/response-status.model';

describe('HttpErrorInterceptor', () => {
  let httpMock: HttpTestingController;
  let mockMessageService: any;
  let http: HttpClient;

  beforeEach(() => {
    mockMessageService = {
      add: createSpy(),
      remove: createSpy()
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true
        },
        {
          provide: HttpErrorHandler,
          useClass: HttpErrorHandler,
          multi: true
        },
        BadGatewayHandler,
        BadRequestHandler,
        ConflictHandler,
        ForbiddenHandler,
        GatewayTimeoutHandler,
        NotFoundHandler,
        UnknownErrorHandler,
        {
          provide: HttpErrorHandler,
          useExisting: UnknownErrorHandler,
          multi: true
        },
        {
          provide: HttpErrorHandler,
          useExisting: BadGatewayHandler,
          multi: true
        },
        {
          provide: HttpErrorHandler,
          useExisting: BadRequestHandler,
          multi: true
        },
        {
          provide: HttpErrorHandler,
          useExisting: ConflictHandler,
          multi: true
        },
        {
          provide: HttpErrorHandler,
          useExisting: ForbiddenHandler,
          multi: true
        },
        {
          provide: HttpErrorHandler,
          useExisting: GatewayTimeoutHandler,
          multi: true
        },
        {
          provide: HttpErrorHandler,
          useExisting: NotFoundHandler,
          multi: true
        },
        { provide: GlobalMessageService, useValue: mockMessageService }
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    http = TestBed.get(HttpClient);
  });

  describe('Error Handlers', () => {
    function testHandlers(handlerClass, responseStatus) {
      it('should call handleError on ' + handlerClass.name, function() {
        http
          .get('/123')
          .pipe(catchError((error: any) => throwError(error)))
          .subscribe(_result => {}, error => (this.error = error));
        const mockReq = httpMock.expectOne(req => {
          return req.method === 'GET';
        });

        const handler = TestBed.get(handlerClass);

        spyOn(handler, 'handleError');
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
  });

  describe('GlobalMessageServices', () => {
    it(`should display "An unknown error occured" in global message service`, () => {
      http
        .get('/unknown')
        .pipe(catchError((error: any) => throwError(error)))
        .subscribe(_result => {}, error => (this.error = error));

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET';
      });

      mockReq.flush({}, { status: 123, statusText: 'unknown' });
      expect(mockMessageService.add).toHaveBeenCalledWith({
        type: GlobalMessageType.MSG_TYPE_ERROR,
        text: 'An unknown error occured'
      });
    });
  });
});
