import { TestBed } from '@angular/core/testing';
import { LoggerService } from '../logger.service';
import { LoggerTestingModule } from './logger-testing.module';
import { MockLoggerService } from './mock-logger.service';

describe('MockLoggerService', () => {
  let loggerService: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoggerTestingModule],
    });
    loggerService = TestBed.inject(LoggerService);
  });

  it('should be provided via LoggerTestingModule', () => {
    expect(loggerService).toBeInstanceOf(MockLoggerService);
  });

  const testInput = [
    'test',
    ['some %s', 'test'],
    { test: 'test' },
    ['test %i', 1],
  ];

  ['log', 'warn', 'error', 'info', 'debug'].forEach((method) => {
    testInput.forEach((input) => {
      it(`should capture ${method} without writing to console`, () => {
        const consoleSpy = vi
          .spyOn(console, method as keyof Console)
          .mockImplementation(() => undefined);

        loggerService[method as keyof LoggerService](input);

        expect(
          loggerService[method as keyof LoggerService]
        ).toHaveBeenCalledWith(input);
        expect(consoleSpy).not.toHaveBeenCalled();

        consoleSpy.mockRestore();
      });
    });
  });
});
