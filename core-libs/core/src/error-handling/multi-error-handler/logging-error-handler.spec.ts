import { TestBed } from '@angular/core/testing';
import { LoggerService } from '../../logger';
import { LoggingErrorHandler } from './logging-error-handler';

class MockLoggerService implements Partial<LoggerService> {
  error = jasmine.createSpy('error');
}

describe('LoggingErrorHandler', () => {
  let errorHandler: LoggingErrorHandler;
  let loggerService: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoggingErrorHandler,
        { provide: LoggerService, useClass: MockLoggerService },
      ],
    });

    loggerService = TestBed.inject(LoggerService);
    errorHandler = TestBed.inject(LoggingErrorHandler);
  });

  it('should log the error using the logger service', () => {
    const error = new Error('Test error');
    errorHandler.handleError(error);
    expect(loggerService.error).toHaveBeenCalledWith(error);
  });
});
