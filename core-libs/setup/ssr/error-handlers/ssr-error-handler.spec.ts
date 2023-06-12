import { ErrorHandler, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LoggerService } from '@spartacus/core';
import { ENABLE_CONTEXTUAL_SERVER_LOGGER } from '../logger';
import { SsrErrorHandler, ssrErrorHandlerFactory } from './ssr-error-handler';

@Injectable()
class TestLogger extends LoggerService {
  error = jest.fn();
}

describe('SsrErrorHandler', () => {
  let errorHandler: SsrErrorHandler;
  let logger: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SsrErrorHandler,
        { provide: LoggerService, useClass: TestLogger },
      ],
    });

    errorHandler = TestBed.inject(SsrErrorHandler);
    logger = TestBed.inject(LoggerService);
  });

  it('should handle error', () => {
    const error = new Error('test');
    const loggerErrorSpy = jest.spyOn(logger, 'error');

    errorHandler.handleError(error);

    expect(loggerErrorSpy).toHaveBeenCalledWith(error);
  });
});

describe('ssrErrorHandlerFactory', () => {
  it('should return SsrErrorHandler', () => {
    // let errorHandler: ErrorHandler;

    TestBed.configureTestingModule({
      providers: [
        { provide: ENABLE_CONTEXTUAL_SERVER_LOGGER, useValue: true },
        { provide: ErrorHandler, useFactory: ssrErrorHandlerFactory },
      ],
    });

    expect(TestBed.inject(ErrorHandler)).toBeInstanceOf(SsrErrorHandler);
  });

  it('should return default ErrorHandler', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ENABLE_CONTEXTUAL_SERVER_LOGGER, useValue: false },
        { provide: ErrorHandler, useFactory: ssrErrorHandlerFactory },
      ],
    });

    expect(TestBed.inject(ErrorHandler)).toBeInstanceOf(ErrorHandler);
  });
});
