import { TestBed } from '@angular/core/testing';

import { LoggingService } from './logging.service';
import { ServerConfig } from '@spartacus/core';

class MockServerConfig {
  production = false;
}

describe('LoggingService', () => {

  let serverConfig: MockServerConfig;
  let loggingService: LoggingService;

  beforeEach(() => {
    spyOn(console, 'log');

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: ServerConfig, useClass: MockServerConfig },
      ],
    });

    serverConfig = TestBed.get(ServerConfig);
    loggingService = TestBed.get(LoggingService);
  });

  it('should be created', () => {
    expect(loggingService).toBeTruthy();
  });

  it('should only log when not in production', () => {
    serverConfig.production = false;
    loggingService.log('test');
    expect(console.log).toHaveBeenCalled();
  });

  it('should not log when in production', () => {
    serverConfig.production = true;

    loggingService.log('test');
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should log args', () => {
    serverConfig.production = false;
    loggingService.log('test', 'arg1', 'arg2');
    expect(console.log).toHaveBeenCalledWith('test', 'arg1', 'arg2');
  });
});
