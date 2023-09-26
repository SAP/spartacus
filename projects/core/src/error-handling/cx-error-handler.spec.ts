import { TestBed } from '@angular/core/testing';
import { CxErrorHandler } from './cx-error-handler';
import {
  ChainedErrorInterceptorFn,
  ERROR_INTERCEPTORS,
  ErrorInterceptor,
} from './error-interceptors/error-interceptor';
import { ErrorInterceptorService } from './error-interceptors/error-interceptor.service';

const mockChainFn = jasmine.createSpy();

class MockErrorInterceptor implements ErrorInterceptor {
  intercept(error: unknown, _next: ChainedErrorInterceptorFn): void {
    mockChainFn(error);
  }
}

describe('CxErrorHandler', () => {
  let cxErrorHandler: CxErrorHandler;
  let errorInterceptorService: ErrorInterceptorService;

  beforeEach(() => {
    mockChainFn.calls.reset();

    TestBed.configureTestingModule({
      providers: [
        CxErrorHandler,
        ErrorInterceptorService,
        {
          provide: ERROR_INTERCEPTORS,
          useClass: MockErrorInterceptor,
          multi: true,
        },
      ],
    });

    cxErrorHandler = TestBed.inject(CxErrorHandler);
    errorInterceptorService = TestBed.inject(ErrorInterceptorService);
  });

  it('should call interceptorsChain', () => {
    const error = new Error('test error');
    const interceptorsChainSpy = spyOnProperty(
      errorInterceptorService,
      'interceptorsChain',
      'get'
    ).and.callThrough();

    cxErrorHandler.handleError(error);
    expect(mockChainFn).toHaveBeenCalledWith(error);
    expect(interceptorsChainSpy).toHaveBeenCalled();
  });
});
