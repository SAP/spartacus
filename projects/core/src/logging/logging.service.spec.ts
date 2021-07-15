import { TestBed } from '@angular/core/testing';

import { LoggingService } from './logging.service';

describe('LoggingService', () => {

  let loggingService: LoggingService;

  beforeEach(() => {
    spyOn(console, 'log');

    TestBed.configureTestingModule({
      imports: [],
      providers: [
      ],
    });

    loggingService = TestBed.get(LoggingService);
  });

  it('should be created', () => {
    expect(loggingService).toBeTruthy();
  });

  it('should only log when not in production', () => {
    loggingService.log('test');
    expect(console.log).toHaveBeenCalled();
  });

  it('should not log when in production', () => {
    spyOn(loggingService, 'isDebug').and.returnValue(false);

    loggingService.log('test');
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should log args', () => {
    loggingService.log('test', 'arg1', 'arg2');
    expect(console.log).toHaveBeenCalledWith('test', 'arg1', 'arg2');
  });
});
