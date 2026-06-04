import { TestBed } from '@angular/core/testing';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let loggerService: LoggerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService],
    });

    loggerService = TestBed.inject(LoggerService);
  });

  it('should be defined', () => {
    expect(loggerService).toBeDefined();
  });

  const testInput = [
    'test',
    ['some %s', 'test'],
    { test: 'test' },
    ['test %i', 1],
  ];

  ['log', 'warn', 'error', 'info', 'debug'].forEach((method) => {
    testInput.forEach((input) => {
      it(`should ${method}`, () => {
        const methodSpy: jasmine.Spy<jasmine.Func> = spyOn(
          console,
          method as keyof Console
        );
        loggerService[method as keyof LoggerService](input);
        expect(methodSpy).toHaveBeenCalledWith(input);
      });
    });
  });
});
