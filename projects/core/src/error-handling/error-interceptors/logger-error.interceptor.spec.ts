import { TestBed } from '@angular/core/testing';
import { LoggerService } from '../../logger';
import { ChainedErrorInterceptorFn } from './error-interceptor';
import { LoggerErrorInterceptor } from './logger-error.interceptor';

class MockLogger implements Partial<LoggerService> {
  error = jasmine.createSpy('error');
}

const mockChainFn = jasmine.createSpy(
  'mockChainFn'
) as ChainedErrorInterceptorFn;

describe('LoggerErrorInterceptor', () => {
  let loggerErrorInterceptor: LoggerErrorInterceptor;
  let logger: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoggerErrorInterceptor,
        { provide: LoggerService, useClass: MockLogger },
      ],
    });

    loggerErrorInterceptor = TestBed.inject(LoggerErrorInterceptor);
    logger = TestBed.inject(LoggerService);
  });

  it('should log the error and call next interceptor', () => {
    const error = new Error('test error');

    loggerErrorInterceptor.intercept(error, mockChainFn);
    expect(logger.error).toHaveBeenCalledWith(error);
    expect(mockChainFn).toHaveBeenCalledWith(error);
  });
});
