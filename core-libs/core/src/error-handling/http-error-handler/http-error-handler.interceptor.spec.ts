import { vi } from 'vitest';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, firstValueFrom, of, throwError } from 'rxjs';
import { UserIdService } from '../../auth';
import { OccEndpointsService } from '../../occ';
import { WindowRef } from '../../window';
import { HttpErrorHandlerInterceptor } from './http-error-handler.interceptor';
import {
  CmsPageNotFoundOutboundHttpError,
  OutboundHttpError,
} from './outbound-http-error';

@Injectable()
class MockErrorHandler {
  handleError(_error: any): void {}
}

@Injectable()
class MockOccEndpointsService {
  buildUrl = (val: string, options?: { userId?: string }) => {
    if (options?.userId) {
      return `users/${options.userId}/cms/${val}`;
    }
    return val;
  };
}

@Injectable()
class MockUserIdService {
  getUserId = () => of('anonymous');
}

describe('HttpErrorHandlerInterceptor', () => {
  let interceptor: HttpErrorHandlerInterceptor;
  let errorHandler: ErrorHandler;
  let request: HttpRequest<any>;
  let next: HttpHandler;
  let windowRef: WindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpErrorHandlerInterceptor,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: WindowRef, useValue: { isBrowser: () => false } },
        { provide: ErrorHandler, useClass: MockErrorHandler },
      ],
    });

    interceptor = TestBed.inject(HttpErrorHandlerInterceptor);
    errorHandler = TestBed.inject(ErrorHandler);
    windowRef = TestBed.inject(WindowRef);

    request = new HttpRequest('GET', 'test-url');
    next = {
      handle: () => new Observable<HttpEvent<any>>(),
    } as HttpHandler;
  });

  it('should create the interceptor', () => {
    expect(interceptor).toBeTruthy();
  });

  describe('error handling', () => {
    it('should call handleError with OutboundHttpError for any HTTP error except 404 cms page not found', async () => {
      const error: HttpErrorResponse = new HttpErrorResponse({
        status: 500,
        statusText: 'error',
      });
      vi.spyOn(errorHandler, 'handleError');

      next.handle = () => throwError(() => error);

      await expect(firstValueFrom(interceptor.intercept(request, next))).rejects.toEqual(error);
      expect(errorHandler.handleError).toHaveBeenCalledWith(
        expect.any(OutboundHttpError)
      );
    });

    it('should call handleError with CmsPageNotFoundOutboundHttpError when CMS page not found', async () => {
      const error: HttpErrorResponse = new HttpErrorResponse({
        url: 'pages',
        status: 404,
      });
      vi.spyOn(errorHandler, 'handleError');

      next.handle = () => throwError(() => error);

      await expect(firstValueFrom(interceptor.intercept(request, next))).rejects.toEqual(error);
      expect(errorHandler.handleError).toHaveBeenCalledWith(
        expect.any(CmsPageNotFoundOutboundHttpError)
      );
    });

    it('should not call handleError when it is not SSR', async () => {
      vi.spyOn(errorHandler, 'handleError');
      vi.spyOn(windowRef, 'isBrowser').mockReturnValue(true);

      next.handle = () => throwError(() => new HttpErrorResponse({}));

      await expect(firstValueFrom(interceptor.intercept(request, next))).rejects.toBeTruthy();
      expect(errorHandler.handleError).not.toHaveBeenCalled();
    });

    it('should pass through the request when there is no error', async () => {
      const response: HttpEvent<any> = {
        status: 200,
        statusText: 'ok',
      } as HttpEvent<any>;
      next.handle = () =>
        new Observable<HttpEvent<any>>((observer) => observer.next(response));

      const result = await firstValueFrom(interceptor.intercept(request, next));
      expect(result).toBe(response);
    });
  });
});
