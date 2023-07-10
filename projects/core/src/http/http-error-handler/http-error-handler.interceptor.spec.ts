import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { HttpErrorHandlerInterceptor } from './http-error-handler.interceptor';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
class MockErrorHandler {
  handleError(_error: any): void {}
}

describe('HttpErrorHandlerInterceptor', () => {
  let interceptor: HttpErrorHandlerInterceptor;
  let errorHandler: ErrorHandler;
  let request: HttpRequest<any>;
  let next: HttpHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpErrorHandlerInterceptor,
        { provide: ErrorHandler, useClass: MockErrorHandler },
      ],
    });

    interceptor = TestBed.inject(HttpErrorHandlerInterceptor);
    errorHandler = TestBed.inject(ErrorHandler);

    request = new HttpRequest('GET', 'test-url');
    next = {
      handle: () => new Observable<HttpEvent<any>>(),
    } as HttpHandler;
  });

  it('should create the interceptor', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should call handleError on error', () => {
    const error: HttpErrorResponse = new HttpErrorResponse({
      status: 400,
      statusText: 'error',
    });
    spyOn(errorHandler, 'handleError');

    next.handle = () => throwError(error);

    interceptor.intercept(request, next).subscribe({
      error: (err) => {
        expect(err).toEqual(error);
        expect(errorHandler.handleError).toHaveBeenCalledWith(error);
      },
    });
  });

  it('should pass through the request when there is no error', () => {
    const response: HttpEvent<any> = {
      status: 200,
      statusText: 'ok',
    } as HttpEvent<any>;
    next.handle = () =>
      new Observable<HttpEvent<any>>((observer) => observer.next(response));

    interceptor.intercept(request, next).subscribe((result) => {
      expect(result).toBe(response);
    });
  });
});
