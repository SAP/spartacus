import { TestBed } from '@angular/core/testing';
import { CxErrorHandler } from './cx-error-handler';
import { ErrorInterceptorService } from './error-interceptors/error-interceptor.service';
import {
  MULTI_ERROR_HANDLERS,
  MultiErrorHandler,
} from './multi-error-handlers';

class MockErrorHandler implements MultiErrorHandler {
  handleError = jasmine.createSpy('handleError');
}

class MockErrorHandler2 implements MultiErrorHandler {
  handleError = jasmine.createSpy('handleError');
}

describe('CxErrorHandler', () => {
  let cxErrorHandler: CxErrorHandler;
  let errorHandlers: MultiErrorHandler[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CxErrorHandler,
        ErrorInterceptorService,
        {
          provide: MULTI_ERROR_HANDLERS,
          useClass: MockErrorHandler,
          multi: true,
        },
        {
          provide: MULTI_ERROR_HANDLERS,
          useClass: MockErrorHandler2,
          multi: true,
        },
      ],
    });

    cxErrorHandler = TestBed.inject(CxErrorHandler);
    errorHandlers = TestBed.inject(MULTI_ERROR_HANDLERS);
  });

  it('should call all error handlers', () => {
    const error = new Error('test error');

    cxErrorHandler.handleError(error);
    errorHandlers.forEach((handler) => {
      expect(handler.handleError).toHaveBeenCalledWith(error);
    });
  });
});
