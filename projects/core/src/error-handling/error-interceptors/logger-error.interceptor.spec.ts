import { TestBed } from '@angular/core/testing';
import { LoggerService } from '../../logger';
import { ChainedErrorInterceptorFn } from './error-interceptor';
import { LoggerErrorInterceptor } from './logger-error.interceptor';

class MockLogger implements Partial<LoggerService> {
  error = jasmine.createSpy('error');
}

const mockChanFn = jasmine.createSpy('mockChanFn') as ChainedErrorInterceptorFn;

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

  it('should log the error', () => {
    const error = new Error('test error');

    loggerErrorInterceptor.interceptError(error);
    expect(logger.error).toHaveBeenCalledWith(error);
  });

  it('should call the next interceptor', () => {
    const error = new Error('test error');

    loggerErrorInterceptor.interceptError(error, mockChanFn);
    expect(logger.error).toHaveBeenCalledWith(error);
    expect(mockChanFn).toHaveBeenCalledWith(error);
  });
});
